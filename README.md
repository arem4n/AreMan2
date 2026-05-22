# AREM4N — Sitio personal

Sitio de branding personal y portafolio. Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion.

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Homepage — Hero, Services, Portfolio, FAQ, Contacto |
| `/portafolio` | Portafolio LogoCodex (client component) |
| `/portafolio/[slug]` | Case study individual |
| `/origen` | Narrativa larga sobre el origen de la marca |

## Comandos

```bash
npm run dev        # Dev server en puerto 3000
npm run build      # Build de producción
npm run start      # Correr build de producción
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript check
```

## Variables de entorno

```
RESEND_API_KEY        # Envío de emails (formulario de contacto)
RESEND_AUDIENCE_ID    # Opcional: audiencia Resend
CONTACT_EMAIL         # Destino de emails (default: sergio.areman@gmail.com)
```
