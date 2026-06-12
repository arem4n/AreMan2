# Walkthrough Video — Design Spec
**Date:** 2026-06-12
**Status:** Approved

## Overview

Video de presentación del sitio AREM4N (~75 segundos) estilo "alguien navegando en vivo": scroll suave, cursor animado que interactúa con elementos, títulos de sección. Generado con Remotion a partir de screenshots capturadas con Playwright.

## Decisiones clave

| Decisión | Valor |
|---|---|
| Estilo | Scroll + cursor animado |
| Duración | ~75 segundos (2250 frames @ 30fps) |
| Resolución | 1920 × 1080 (16:9) |
| Enfoque | Screenshots → Remotion (Approach A) |
| Codec | H.264 → MP4 |

## Páginas / secciones incluidas

1. **Hero** — homepage, 10s
2. **Services** — homepage, 10s
3. **Portfolio grid** — homepage, 10s
4. **Process** — homepage, 8s
5. **Contact / CTA** — homepage, 7s
6. **/portafolio** — LogoCodeX viewer, 10s
7. **/origen** — timeline interactivo, 10s
8. **Case study individual** — un proyecto abierto, 10s

## Arquitectura

```
scripts/capture-screens.ts   # Playwright: captura screenshots de cada sección
video/
  public/screens/            # 8 x PNG full-page (1920px wide)
  src/
    WalkthroughRoot.tsx      # Composición principal — encadena Sequences
    ScrollScene.tsx          # Pan vertical sobre screenshot + cursor
    Cursor.tsx               # SVG cursor animado con spring()
    SectionLabel.tsx         # Overlay de título por sección
  remotion.config.ts
  package.json
output/
  walkthrough.mp4            # Video final renderizado
```

## Componentes Remotion

### `WalkthroughRoot.tsx`
Composición principal. Define specs del video (1920×1080, 30fps, 2250 frames). Usa `<Sequence from={offset} durationInFrames={n}>` para encadenar cada `ScrollScene`. Calcula offsets acumulativos desde el array de scenes.

### `ScrollScene.tsx`
Props: `imageSrc: string`, `durationInFrames: number`, `label: string`, `cursorPath: CursorPoint[]`

Comportamiento:
- Primeros ~15 frames: `SectionLabel` fade-in
- Frames 15→end: `interpolate()` anima `translateY` de la imagen (pan de arriba hacia abajo simulando scroll)
- `Cursor` se mueve entre los `cursorPath` points con `spring()`

### `Cursor.tsx`
SVG puntero. Props: `points: {x,y,frame}[]`, `currentFrame: number`. Interpola posición con `spring()` entre cada punto. Escala ligera al "hacer click" (pulse effect).

### `SectionLabel.tsx`
Props: `label: string`, `durationInFrames: number`. Fade-in primeros 10 frames, hold 15 frames, fade-out siguientes 10 frames — todo relativo al inicio de la escena. Posición: esquina inferior izquierda, tipografía Barlow Condensed, color `#db2777`.

## Script de captura (Playwright)

`scripts/capture-screens.ts`:
1. Apunta al dev server en `http://localhost:3000` (requiere `npm run dev` corriendo)
2. Para homepage: navega a `/`, espera hidratación, scroll a cada sección, `page.screenshot({ fullPage: false, clip: viewport })`
3. Para otras páginas: navega, espera, screenshot completo
4. Guarda en `video/public/screens/<slug>.png`

Secciones capturadas con sus selectores de scroll:
- `hero` → scroll a `#inicio` (o top)
- `services` → scroll a `#servicios`
- `portfolio` → scroll a `#portafolio`
- `process` → scroll a `#proceso`
- `contact` → scroll a `#contacto`
- `portafolio-page` → navega a `/portafolio`
- `origen-page` → navega a `/origen`
- `case-study` → navega a `/portafolio/<slug>` del primer proyecto en `constants.ts → portfolioProjects[0]`

## Storyboard detallado

| Escena | Frames | Segundos | Cursor action |
|---|---|---|---|
| Hero | 0–300 | 0–10s | Hover CTA → scroll down |
| Services | 300–600 | 10–20s | Hover paquetes |
| Portfolio grid | 600–900 | 20–30s | Hover proyecto destacado |
| Process | 900–1140 | 30–38s | Scroll por pasos |
| Contact | 1140–1350 | 38–45s | Hover form → hover botón |
| /portafolio | 1350–1650 | 45–55s | Click tab diferente |
| /origen | 1650–1950 | 55–65s | Scroll timeline |
| Case study | 1950–2250 | 65–75s | Zoom-in → fade out |

## Estructura de directorios

La carpeta `video/` vive en la raíz del repo como proyecto Remotion independiente con su propio `package.json`. No interfiere con el build de Next.js.

## Dependencias ya instaladas

- `remotion`, `@remotion/player` — ya en root `package.json`
- `@playwright/test` — ya en devDependencies

Dependencias adicionales necesarias en `video/package.json`:
- `remotion`, `@remotion/cli`, `@remotion/transitions`

## Fuera de scope

- Audio / música de fondo
- Subtítulos o narración
- Versión vertical (9:16) para Reels
- Animaciones en vivo del sitio (Framer Motion no se captura en screenshots)
