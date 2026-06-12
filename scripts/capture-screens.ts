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
