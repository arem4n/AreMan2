# Tests — AreMan2

Suite de regresión con [Vitest](https://vitest.dev/) + React Testing Library.
Antes de esto el proyecto no tenía ningún test (`npx tsc --noEmit` era la única
verificación, ver CLAUDE.md).

## Uso

```bash
npm test          # corre toda la suite una vez
npm run test:watch # modo watch
```

## Qué cubre

- **`data-integrity.test.ts`** — forma de `portfolioProjects` (campos
  requeridos, slugs únicos y con formato válido, imágenes con src/alt) y el
  riesgo que el propio `CLAUDE.md` señala explícitamente: `/portafolio` tiene
  dos rutas de renderizado independientes (`LogoCodex.tsx` para el tab viewer
  y `app/[locale]/portafolio/[slug]/page.tsx` para la página completa) que
  **ambas** necesitan un `case` por proyecto. Si se agrega un proyecto nuevo y
  se olvida uno de los dos switches, no explota (hay un `default` con
  `GenericCaseStudy`) — este test lo detecta igual.
- **`i18n-messages.test.ts`** — `es.json` y `en.json` tienen exactamente el
  mismo set de claves, sin strings vacíos, y los placeholders ICU (`{variable}`)
  coinciden entre ambos idiomas para cada clave (si no coinciden, next-intl
  tira un runtime error al interpolar).
- **`useMenu.test.tsx`** — el hook del menú mobile: `modal-open` en `<html>` e
  `inert`/`aria-hidden` en `<main>` se togglean correctamente al abrir/cerrar,
  y se limpian al desmontar con el menú abierto.
- **`loading-context.test.tsx`** — `customNavigate()`, el corazón de "Never
  use `<Link>` or `router.push` directly" (CLAUDE.md): hash-scroll en home,
  guardar+navegar cuando el hash apunta a otra página, scroll sin navegar en
  la misma página, y navegación real con `prefetch`+`push`+loading state.
  Se mockea `@/navigation` (wrapper de next-intl) para no depender del router
  real.
- **`api-contact.test.ts`** / **`api-newsletter.test.ts`** — las rutas de API
  que envían a Resend: honeypot anti-bot, no-op gracioso sin
  `RESEND_API_KEY`, validación de email requerido, escapado de HTML en el
  mensaje (XSS), "contacto ya existe" tratado como éxito vs. otros errores de
  Resend como 500, y que un fallo en el email de notificación no aborte la
  creación del contacto. Se mockea el módulo `resend` completo.

## Bug real encontrado y corregido

Mientras se testeaba `customNavigate()`: si el link es un hash (`#seccion`)
estando ya en `/` pero el elemento con ese ID **no existe** en el DOM (ancla
con typo, o contenido condicional aún no montado), el código no hacía
`return` y caía al flujo de navegación completa más abajo, terminando en
`router.push('#seccion')` — una URL sin path, sin sentido. Se agregó el
`return` faltante en `components/LoadingContext.tsx`.

## Notas

- Los tests de rutas de API (`api-*.test.ts`) fuerzan `// @vitest-environment
  node` al inicio del archivo (el resto de la suite usa `jsdom` por defecto,
  configurado en `vitest.config.ts`) porque manipulan `Request`/`Response`
  del lado servidor.
- Al mockear una clase que se instancia con `new` (como `Resend`), usar
  `vi.fn().mockImplementation(function () {...})` con `function`, **no**
  arrow function — una arrow function no puede invocarse con `new`.
- Evitar `[...iterable]` (spread) sobre `Set`/`RegExpStringIterator` en los
  tests: el `tsconfig.json` del proyecto no tiene `downlevelIteration` ni
  target ES2015+, así que `tsc --noEmit` (el chequeo que ya usa el equipo)
  lo marca como error aunque Vitest lo ejecute sin problema. Usar
  `Array.from(iterable)` en su lugar.
