# Walkthrough Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generar un video 1080×1920 (9:16, 75s) que muestra el sitio AREM4N como si alguien lo estuviera navegando en mobile, con scroll animado, tap indicators y labels por sección.

**Architecture:** Playwright captura 8 screenshots del sitio (viewport 390×844) y los guarda en `video/public/screens/`. Un proyecto Remotion independiente en `video/` los ensambla en una composición de 2250 frames: cada escena hace un pan vertical de la imagen simulando scroll y muestra un `TapIndicator` en puntos de interés.

**Tech Stack:** Remotion 4, React 18, @remotion/google-fonts, @playwright/test (ya instalado), tsx (para ejecutar el script de captura)

---

## File Map

| Archivo | Responsabilidad |
|---|---|
| `video/package.json` | Proyecto Remotion independiente |
| `video/tsconfig.json` | Config TypeScript para Remotion |
| `video/remotion.config.ts` | Ajustes de render (formato, overwrite) |
| `video/src/index.ts` | Entry point — llama a `registerRoot` |
| `video/src/Root.tsx` | Registra la composición con sus specs (1080×1920, 30fps, 2250f) |
| `video/src/scenes.ts` | Array de datos de las 8 escenas: imagen, duración, scroll, taps |
| `video/src/WalkthroughRoot.tsx` | Composición principal — encadena `<Sequence>` por escena |
| `video/src/ScrollScene.tsx` | Pan vertical sobre screenshot + TapIndicator + SectionLabel |
| `video/src/SectionLabel.tsx` | Overlay de título: fade-in 10f, hold 15f, fade-out 10f |
| `video/src/TapIndicator.tsx` | Círculo SVG con ring pulse que aparece en tap points |
| `scripts/capture-screens.ts` | Playwright: navega al dev server, captura las 8 secciones |

---

## Task 1: Scaffold del proyecto Remotion en `video/`

**Files:**
- Create: `video/package.json`
- Create: `video/tsconfig.json`
- Create: `video/remotion.config.ts`
- Create: `video/src/index.ts`
- Create: `video/public/screens/.gitkeep`
- Modify: `.gitignore`

- [ ] **Step 1: Crear `video/package.json`**

```json
{
  "name": "arem4n-walkthrough-video",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "remotion studio",
    "render": "remotion render WalkthroughComposition ../output/walkthrough.mp4"
  },
  "dependencies": {
    "@remotion/cli": "^4.0.0",
    "@remotion/google-fonts": "^4.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "remotion": "^4.0.0"
  },
  "devDependencies": {
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Crear `video/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src", "remotion.config.ts"]
}
```

- [ ] **Step 3: Crear `video/remotion.config.ts`**

```ts
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
```

- [ ] **Step 4: Crear `video/src/index.ts`**

```ts
import { registerRoot } from "remotion";
import { Root } from "./Root";

registerRoot(Root);
```

- [ ] **Step 5: Crear directorio de screens**

```bash
mkdir -p video/public/screens
touch video/public/screens/.gitkeep
```

- [ ] **Step 6: Añadir entradas al `.gitignore` raíz**

Abrir `.gitignore` y añadir al final:

```
# Remotion video project
video/node_modules/
output/
.superpowers/
```

- [ ] **Step 7: Instalar dependencias en `video/`**

```bash
cd video && npm install
```

Resultado esperado: `added N packages` sin errores.

- [ ] **Step 8: Commit**

```bash
git add video/ .gitignore
git commit -m "chore: scaffold Remotion project in video/"
```

---

## Task 2: Scene config (`video/src/scenes.ts`)

**Files:**
- Create: `video/src/scenes.ts`

- [ ] **Step 1: Crear `video/src/scenes.ts`**

```ts
export const FPS = 30;
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const TOTAL_FRAMES = 2250; // 75s × 30fps

export type TapPoint = {
  x: number; // px en coordenadas del video (0-1080)
  y: number; // px en coordenadas del video (0-1920)
  frame: number; // frame relativo al inicio de la escena
};

export type Scene = {
  slug: string;
  label: string;
  imageSrc: string; // relativo a video/public/ — se pasa a staticFile()
  durationInFrames: number;
  scrollAmount: number; // px a desplazar hacia arriba (en espacio 1080px). Ajustar tras preview.
  tapPoints: TapPoint[];
};

export const SCENES: Scene[] = [
  {
    slug: "hero",
    label: "Hero",
    imageSrc: "screens/hero.png",
    durationInFrames: 300,
    scrollAmount: 400,
    tapPoints: [{ x: 540, y: 1500, frame: 80 }],
  },
  {
    slug: "services",
    label: "Services",
    imageSrc: "screens/services.png",
    durationInFrames: 300,
    scrollAmount: 500,
    tapPoints: [
      { x: 540, y: 700, frame: 60 },
      { x: 540, y: 1300, frame: 180 },
    ],
  },
  {
    slug: "portfolio",
    label: "Portfolio",
    imageSrc: "screens/portfolio.png",
    durationInFrames: 300,
    scrollAmount: 600,
    tapPoints: [{ x: 270, y: 800, frame: 90 }],
  },
  {
    slug: "process",
    label: "Process",
    imageSrc: "screens/process.png",
    durationInFrames: 240,
    scrollAmount: 400,
    tapPoints: [{ x: 540, y: 960, frame: 60 }],
  },
  {
    slug: "contact",
    label: "Contact",
    imageSrc: "screens/contact.png",
    durationInFrames: 210,
    scrollAmount: 300,
    tapPoints: [
      { x: 540, y: 800, frame: 60 },
      { x: 540, y: 1600, frame: 150 },
    ],
  },
  {
    slug: "portafolio-page",
    label: "/portafolio",
    imageSrc: "screens/portafolio-page.png",
    durationInFrames: 300,
    scrollAmount: 500,
    tapPoints: [{ x: 300, y: 600, frame: 90 }],
  },
  {
    slug: "origen-page",
    label: "/origen",
    imageSrc: "screens/origen-page.png",
    durationInFrames: 300,
    scrollAmount: 700,
    tapPoints: [{ x: 540, y: 960, frame: 90 }],
  },
  {
    slug: "case-study",
    label: "Case Study",
    imageSrc: "screens/case-study.png",
    durationInFrames: 300,
    scrollAmount: 600,
    tapPoints: [{ x: 540, y: 700, frame: 60 }],
  },
];

// Verificación en compile-time: total de frames debe ser TOTAL_FRAMES
const _check: number =
  SCENES.reduce((acc, s) => acc + s.durationInFrames, 0);
// Si este número no es 2250, ajustar durationInFrames en las escenas.
export const COMPUTED_TOTAL_FRAMES = _check;
```

- [ ] **Step 2: Verificar que los frames suman 2250**

```bash
node -e "
const s=[300,300,300,240,210,300,300,300];
console.log('Total frames:', s.reduce((a,b)=>a+b,0));
"
```

Resultado esperado: `Total frames: 2250`

- [ ] **Step 3: Commit**

```bash
git add video/src/scenes.ts
git commit -m "feat(video): add scene configuration for 8-scene walkthrough"
```

---

## Task 3: `SectionLabel` component

**Files:**
- Create: `video/src/SectionLabel.tsx`

- [ ] **Step 1: Crear `video/src/SectionLabel.tsx`**

```tsx
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props = { label: string };

export const SectionLabel: React.FC<Props> = ({ label }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 10, 25, 35], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 48,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity,
        }}
      >
        <div
          style={{
            width: 5,
            height: 40,
            background: "#db2777",
            borderRadius: 3,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 52,
            fontWeight: 700,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            textShadow: "0 2px 20px rgba(0,0,0,0.7)",
            lineHeight: 1,
          }}
        >
          {label}
        </span>
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add video/src/SectionLabel.tsx
git commit -m "feat(video): add SectionLabel component with fade in/out"
```

---

## Task 4: `TapIndicator` component

**Files:**
- Create: `video/src/TapIndicator.tsx`

- [ ] **Step 1: Crear `video/src/TapIndicator.tsx`**

```tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TapPoint } from "./scenes";

type Props = { points: TapPoint[] };

export const TapIndicator: React.FC<Props> = ({ points }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      {points.map((point, i) => {
        const localFrame = frame - point.frame;

        // Fuera de ventana de animación (45 frames = 1.5s)
        if (localFrame < 0 || localFrame > 45) return null;

        const dotScale = spring({
          frame: localFrame,
          fps,
          config: { damping: 14, stiffness: 220, mass: 0.8 },
          from: 0,
          to: 1,
        });

        const ringScale = spring({
          frame: localFrame,
          fps,
          config: { damping: 8, stiffness: 70, mass: 1 },
          from: 0.3,
          to: 2.2,
        });

        const opacity = interpolate(localFrame, [0, 6, 32, 45], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: point.x,
              top: point.y,
              transform: "translate(-50%, -50%)",
              opacity,
              pointerEvents: "none",
            }}
          >
            {/* Ring exterior */}
            <div
              style={{
                position: "absolute",
                width: 56,
                height: 56,
                left: -28,
                top: -28,
                borderRadius: "50%",
                border: "2.5px solid rgba(219,39,119,0.55)",
                transform: `scale(${ringScale})`,
              }}
            />
            {/* Dot central */}
            <div
              style={{
                position: "absolute",
                width: 26,
                height: 26,
                left: -13,
                top: -13,
                borderRadius: "50%",
                background: "#db2777",
                transform: `scale(${dotScale})`,
                boxShadow: "0 0 24px rgba(219,39,119,0.75)",
              }}
            />
          </div>
        );
      })}
    </>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add video/src/TapIndicator.tsx
git commit -m "feat(video): add TapIndicator with spring ring pulse"
```

---

## Task 5: `ScrollScene` component

**Files:**
- Create: `video/src/ScrollScene.tsx`

- [ ] **Step 1: Crear `video/src/ScrollScene.tsx`**

```tsx
import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SectionLabel } from "./SectionLabel";
import { TapIndicator } from "./TapIndicator";
import { TapPoint } from "./scenes";

type Props = {
  imageSrc: string;
  label: string;
  durationInFrames: number;
  scrollAmount: number;
  tapPoints: TapPoint[];
};

export const ScrollScene: React.FC<Props> = ({
  imageSrc,
  label,
  durationInFrames,
  scrollAmount,
  tapPoints,
}) => {
  const frame = useCurrentFrame();

  // Inicia el scroll después del label fade-in (frame 15)
  // Usa easeInOut implícito de interpolate
  const translateY = interpolate(
    frame,
    [15, durationInFrames - 10],
    [0, -scrollAmount],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill style={{ background: "#0f172a", overflow: "hidden" }}>
      {/* Imagen scrollable */}
      <div
        style={{
          width: "100%",
          transform: `translateY(${translateY}px)`,
          willChange: "transform",
        }}
      >
        <Img
          src={staticFile(imageSrc)}
          style={{ width: "100%", display: "block" }}
        />
      </div>

      {/* Overlays */}
      <TapIndicator points={tapPoints} />
      <SectionLabel label={label} />
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add video/src/ScrollScene.tsx
git commit -m "feat(video): add ScrollScene with pan animation and overlays"
```

---

## Task 6: `WalkthroughRoot` y `Root` (composición principal)

**Files:**
- Create: `video/src/WalkthroughRoot.tsx`
- Create: `video/src/Root.tsx`

- [ ] **Step 1: Crear `video/src/WalkthroughRoot.tsx`**

```tsx
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SCENES } from "./scenes";
import { ScrollScene } from "./ScrollScene";

export const WalkthroughRoot: React.FC = () => {
  let offset = 0;

  return (
    <AbsoluteFill>
      {SCENES.map((scene) => {
        const from = offset;
        offset += scene.durationInFrames;

        return (
          <Sequence
            key={scene.slug}
            from={from}
            durationInFrames={scene.durationInFrames}
            name={scene.label}
          >
            <ScrollScene
              imageSrc={scene.imageSrc}
              label={scene.label}
              durationInFrames={scene.durationInFrames}
              scrollAmount={scene.scrollAmount}
              tapPoints={scene.tapPoints}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Crear `video/src/Root.tsx`**

```tsx
import React from "react";
import { Composition } from "remotion";
import { WalkthroughRoot } from "./WalkthroughRoot";
import {
  FPS,
  TOTAL_FRAMES,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "./scenes";

export const Root: React.FC = () => (
  <Composition
    id="WalkthroughComposition"
    component={WalkthroughRoot}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={VIDEO_WIDTH}
    height={VIDEO_HEIGHT}
  />
);
```

- [ ] **Step 3: Cargar la fuente Barlow Condensed**

Añadir al inicio de `video/src/Root.tsx`, antes del export:

```tsx
import { loadFont } from "@remotion/google-fonts/BarlowCondensed";

const { waitUntilDone } = loadFont("normal", { weights: ["700"] });
export { waitUntilDone }; // Remotion usa este export para esperar la fuente
```

El archivo completo de `video/src/Root.tsx` queda:

```tsx
import React from "react";
import { Composition } from "remotion";
import { loadFont } from "@remotion/google-fonts/BarlowCondensed";
import { WalkthroughRoot } from "./WalkthroughRoot";
import { FPS, TOTAL_FRAMES, VIDEO_HEIGHT, VIDEO_WIDTH } from "./scenes";

loadFont("normal", { weights: ["700"] });

export const Root: React.FC = () => (
  <Composition
    id="WalkthroughComposition"
    component={WalkthroughRoot}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={VIDEO_WIDTH}
    height={VIDEO_HEIGHT}
  />
);
```

- [ ] **Step 4: Verificar que TypeScript compila sin errores**

```bash
cd video && npx tsc --noEmit
```

Resultado esperado: sin output (sin errores).

- [ ] **Step 5: Commit**

```bash
git add video/src/WalkthroughRoot.tsx video/src/Root.tsx
git commit -m "feat(video): add WalkthroughRoot composition and Root registration"
```

---

## Task 7: Script de captura Playwright (`scripts/capture-screens.ts`)

**Files:**
- Create: `scripts/capture-screens.ts`
- Modify: `package.json` (añadir script y devDependency `tsx`)

- [ ] **Step 1: Instalar `tsx` como devDependency en el root**

```bash
npm install --save-dev tsx
```

Resultado esperado: `added 1 package` o similar.

- [ ] **Step 2: Añadir script en `package.json` raíz**

En la sección `"scripts"` del `package.json` raíz, añadir:

```json
"capture": "tsx scripts/capture-screens.ts"
```

- [ ] **Step 3: Crear `scripts/capture-screens.ts`**

```ts
import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";

const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = path.resolve(__dirname, "../video/public/screens");
const VIEWPORT = { width: 390, height: 844 };
const WAIT_AFTER_SCROLL = 700; // ms para que las animaciones de scroll terminen

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2, // Retina — más nitidez en las screenshots
  });
  const page = await context.newPage();

  /** Navega a una URL y espera que el preloader desaparezca */
  async function goto(url: string) {
    await page.goto(url, { waitUntil: "networkidle" });
    // Esperar a que el preloader oculte (si existe)
    await page
      .waitForSelector("#preloader", { state: "hidden", timeout: 8000 })
      .catch(() => {}); // no todos los paths tienen preloader
    await page.waitForTimeout(800);
  }

  /** Scroll a un selector y hace screenshot del viewport */
  async function captureSection(slug: string, selector: string) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(WAIT_AFTER_SCROLL);
    const outPath = path.join(OUTPUT_DIR, `${slug}.png`);
    await page.screenshot({ path: outPath });
    console.log(`✓ ${slug} → ${outPath}`);
  }

  // ── Homepage sections ──────────────────────────────────
  await goto(`${BASE_URL}/`);
  await captureSection("hero", "#inicio");
  await captureSection("services", "#servicios");
  await captureSection("portfolio", "#portafolio");
  await captureSection("process", "#proceso");
  await captureSection("contact", "#contacto");

  // ── /portafolio page ───────────────────────────────────
  await goto(`${BASE_URL}/portafolio`);
  const portPath = path.join(OUTPUT_DIR, "portafolio-page.png");
  await page.screenshot({ path: portPath });
  console.log(`✓ portafolio-page → ${portPath}`);

  // ── /origen page ───────────────────────────────────────
  await goto(`${BASE_URL}/origen`);
  const origenPath = path.join(OUTPUT_DIR, "origen-page.png");
  await page.screenshot({ path: origenPath });
  console.log(`✓ origen-page → ${origenPath}`);

  // ── Case study: primer proyecto ────────────────────────
  await goto(`${BASE_URL}/portafolio/areman-escudo-heraldico`);
  const casePath = path.join(OUTPUT_DIR, "case-study.png");
  await page.screenshot({ path: casePath });
  console.log(`✓ case-study → ${casePath}`);

  await browser.close();

  // Verificar que los 8 archivos existen
  const expected = [
    "hero.png", "services.png", "portfolio.png", "process.png",
    "contact.png", "portafolio-page.png", "origen-page.png", "case-study.png",
  ];
  const missing = expected.filter(
    (f) => !fs.existsSync(path.join(OUTPUT_DIR, f))
  );
  if (missing.length > 0) {
    console.error("❌ Missing files:", missing);
    process.exit(1);
  }
  console.log(`\n✅ All 8 screens saved to ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 4: Commit**

```bash
git add scripts/capture-screens.ts package.json package-lock.json
git commit -m "feat(video): add Playwright screen capture script"
```

---

## Task 8: Capturar screenshots

**Prerequisite:** El dev server debe estar corriendo.

- [ ] **Step 1: Arrancar el dev server en una terminal separada**

```bash
npm run dev
```

Esperar hasta ver `Ready in Xms` o `Local: http://localhost:3000`.

- [ ] **Step 2: Ejecutar el script de captura**

En otra terminal:

```bash
npm run capture
```

Resultado esperado:
```
✓ hero → .../video/public/screens/hero.png
✓ services → .../video/public/screens/services.png
✓ portfolio → .../video/public/screens/portfolio.png
✓ process → .../video/public/screens/process.png
✓ contact → .../video/public/screens/contact.png
✓ portafolio-page → .../video/public/screens/portafolio-page.png
✓ origen-page → .../video/public/screens/origen-page.png
✓ case-study → .../video/public/screens/case-study.png

✅ All 8 screens saved to ...
```

Si alguna captura falla porque el selector no existe, revisar el ID correcto en el HTML del componente y actualizar el script.

- [ ] **Step 3: Verificar visualmente las imágenes**

```bash
ls -lh video/public/screens/
```

Las 8 imágenes deben existir y tener un tamaño razonable (>50KB cada una).

- [ ] **Step 4: Commit de las screenshots**

```bash
git add video/public/screens/
git commit -m "chore(video): add captured screenshots for Remotion composition"
```

---

## Task 9: Preview en Remotion Studio y ajuste de scroll

**Files:**
- Modify: `video/src/scenes.ts` (ajustar `scrollAmount` y `tapPoints` según lo que se vea)

- [ ] **Step 1: Arrancar Remotion Studio**

```bash
cd video && npm run dev
```

Abrir `http://localhost:3003` (o el puerto que indique el output).

- [ ] **Step 2: Revisar cada escena**

En el panel izquierdo, navegar por las escenas (Hero, Services, etc.). Para cada una:

- ¿El pan vertical llega a mostrar el contenido importante? Si el scroll se queda corto o se pasa, ajustar `scrollAmount` en `video/src/scenes.ts`.
- ¿El TapIndicator aparece sobre un elemento visible? Si no, ajustar las coordenadas `x, y` del `tapPoints`.
- ¿El label se lee bien? Si choca con el contenido de la imagen, ajustar `bottom` en `SectionLabel.tsx`.

- [ ] **Step 3: Aplicar ajustes en `video/src/scenes.ts`**

Ejemplo de ajuste (el valor real depende de lo que se vea en Studio):

```ts
// Si el hero necesita más scroll para mostrar el tagline completo:
{ slug: "hero", scrollAmount: 600, /* resto igual */ }
```

- [ ] **Step 4: Verificar que el video fluye bien de principio a fin**

Usar el slider del Studio para ir del frame 0 al 2250 y confirmar que:
- Las transiciones entre escenas no tienen cortes abruptos
- Los labels aparecen en todos los segmentos
- No hay pantallas negras intermedias

- [ ] **Step 5: Commit de ajustes**

```bash
git add video/src/scenes.ts
git commit -m "chore(video): tune scroll amounts and tap positions after preview"
```

---

## Task 10: Render del video final

**Files:**
- Create (auto-generado): `output/walkthrough.mp4`

- [ ] **Step 1: Crear directorio output**

```bash
mkdir -p output
```

- [ ] **Step 2: Renderizar**

```bash
cd video && npm run render
```

El comando completo que ejecuta es:
```bash
remotion render WalkthroughComposition ../output/walkthrough.mp4
```

Resultado esperado:
```
Rendering WalkthroughComposition...
2250/2250 frames rendered
Output: ../output/walkthrough.mp4
```

El render toma 3-10 minutos dependiendo del hardware.

- [ ] **Step 3: Verificar el archivo de salida**

```bash
ls -lh output/walkthrough.mp4
```

Debe existir y pesar varios MB. Reproducirlo con cualquier reproductor para confirmar que dura ~75s, se ve en portrait (1080×1920) y todas las escenas se ven correctamente.

- [ ] **Step 4: Commit final**

```bash
git add output/.gitkeep 2>/dev/null; true
git commit -m "feat(video): complete walkthrough video render pipeline"
```

(El `.mp4` no se commitea — está en `.gitignore`.)

---

## Troubleshooting

| Problema | Solución |
|---|---|
| `#preloader` timeout en captura | Aumentar timeout a 15000ms en `waitForSelector` |
| Selector `#inicio` no encontrado | Confirmar que el componente `Hero.tsx` tiene `id="inicio"` y la página cargó sin errores |
| Fuente Barlow no carga en render | Asegurarse de llamar `loadFont()` al nivel de módulo en `Root.tsx`, no dentro de un componente |
| Pan muestra área negra al final | Reducir `scrollAmount` de esa escena — el valor supera la altura disponible de la imagen |
| `remotion render` falla en TypeScript | Ejecutar `cd video && npx tsc --noEmit` para ver el error exacto |
| Screenshots con DPR 2 — imágenes muy grandes | Cambiar `deviceScaleFactor: 1` en el context de Playwright si las imágenes pesan demasiado |
