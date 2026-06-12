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
