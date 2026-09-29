# Protección anti-bot (Cloudflare Turnstile) — Design Spec
**Date:** 2026-09-29
**Status:** Approved

## Overview

`/api/contact` recibe envíos de spam casi todos los días. La causa raíz: el
endpoint acepta cualquier `POST` con JSON, sin verificar que provenga del
formulario real. El honeypot existente (`app/api/contact/route.ts`) solo
detiene bots que renderizan el HTML del formulario y llenan campos ocultos a
ciegas — un script que le pega directo a la API con `fetch`/`curl` nunca
manda el campo `honeypot`, así que pasa el chequeo `if (honeypot)` como si
fuera humano. No hay rate limiting ni validación de origen. `/api/newsletter`
tiene el mismo problema, sin honeypot siquiera.

Solución: Cloudflare Turnstile (captcha invisible, gratis, sin límite de
requests) en ambos formularios. El bot necesita un token que solo Cloudflare
puede emitir tras resolver su challenge — un script que solo hace requests
HTTP no puede fabricarlo.

## Decisiones clave

| Decisión | Valor |
|---|---|
| Servicio | Cloudflare Turnstile |
| Modo del widget | `managed` (visible pero discreto, se auto-resuelve para la mayoría de usuarios reales) |
| Librería cliente | `@marsidev/react-turnstile` |
| Alcance | `/api/contact` **y** `/api/newsletter` (mismo problema, mismo fix) |
| Honeypot existente | Se mantiene en `/api/contact` como capa extra |
| Fallback sin `TURNSTILE_SECRET_KEY` | No verifica (mismo patrón dev-fallback que `RESEND_API_KEY`) |
| Fallo de red hacia Cloudflare | Fail-closed: se trata como verificación fallida |

## Arquitectura

```
lib/verifyTurnstile.ts          # nuevo — llama a siteverify de Cloudflare
components/Contact.tsx          # agrega <Turnstile> + turnstileToken en el POST
components/Newsletter.tsx       # agrega <Turnstile> + turnstileToken en el POST
app/api/contact/route.ts        # valida token antes de tocar Resend
app/api/newsletter/route.ts     # valida token antes de tocar Resend
```

### `lib/verifyTurnstile.ts`

```ts
export async function verifyTurnstile(token: string | undefined, ip?: string): Promise<boolean>
```

- Si `process.env.TURNSTILE_SECRET_KEY` no está seteado → retorna `true`
  inmediatamente (modo dev/test, sin llamar a Cloudflare).
- Si `token` es falsy → retorna `false` (no hay token, no hay verificación).
- Si está seteado: hace `POST` a
  `https://challenges.cloudflare.com/turnstile/v0/siteverify` con
  `secret`, `response: token` y `remoteip: ip` (si viene). Retorna el
  booleano `success` de la respuesta.
- Si el `fetch` lanza (red caída, timeout, etc.) → captura el error y
  retorna `false` (fail-closed).

Compartido entre las dos rutas para no duplicar la lógica.

### Rutas API

En ambas rutas, justo después de parsear el body (y antes del chequeo de
honeypot en `/api/contact`, y antes de cualquier llamada a Resend en las
dos):

```ts
const clientIp = request.headers.get('x-forwarded-for') ?? undefined;
const isHuman = await verifyTurnstile(turnstileToken, clientIp);
if (!isHuman) {
  return NextResponse.json({ error: 'Verificación anti-bot fallida' }, { status: 400 });
}
```

El resto de la lógica existente de cada ruta no cambia.

### Componentes cliente

- Ambos formularios importan `Turnstile` de `@marsidev/react-turnstile` y lo
  renderizan con `siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}`.
- `onSuccess={(token) => ...}` guarda el token en el estado del formulario.
- `onExpire`/`onError` limpian el token del estado, para forzar una nueva
  verificación antes de reintentar el submit.
- El botón de submit se deshabilita si no hay token (mismo patrón que ya
  usan `formState.submitting` / los campos `required`).
- El token viaja en el body del `POST` como `turnstileToken`.

### Manejo de errores

- Token inválido o ausente → la API responde 400; el cliente muestra el
  mensaje de error existente (reusa `errorConnection` o agrega
  `captchaError` en los mensajes i18n) y resetea el widget para que el
  usuario pueda reintentar.
- El widget no carga (ad-blocker, red bloqueada) → el botón queda
  deshabilitado; se agrega un mensaje `captchaError` (es/en) indicando que
  puede ser un bloqueador de anuncios, para que el usuario no se quede sin
  explicación.

### Variables de entorno

Nuevas, documentadas en `CLAUDE.md`:

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY   # pública, se manda al cliente
TURNSTILE_SECRET_KEY             # secreta, solo servidor
```

Si faltan (dev/test), el comportamiento es "no verificar" — igual que ya
pasa hoy con `RESEND_API_KEY` faltante.

## Testing

- `tests/api-contact.test.ts` y `tests/api-newsletter.test.ts`: se mockea
  `verifyTurnstile` (o el `fetch` global hacia el dominio de Cloudflare).
  Casos nuevos:
  - Sin `TURNSTILE_SECRET_KEY`: no verifica, sigue el flujo normal
    (comportamiento ya cubierto implícitamente, se agrega caso explícito).
  - Token inválido/ausente con `TURNSTILE_SECRET_KEY` seteado: responde 400,
    no llama a Resend.
  - `fetch` a Cloudflare falla: responde 400 (fail-closed), no llama a
    Resend.
- No se agregan tests de componente para el widget en sí (es un iframe de
  terceros, no aporta valor testearlo en jsdom); si es fácil de verificar
  con el setup de RTL existente, se agrega un smoke test de que el botón
  de submit queda deshabilitado sin token.

## Fuera de alcance

- Rate limiting por IP (Turnstile ya cierra el vector de abuso principal;
  se puede agregar después si aparece un patrón nuevo de abuso).
- Cambios al diseño visual del formulario más allá de insertar el widget.
