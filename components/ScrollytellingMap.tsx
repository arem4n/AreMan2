'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ScrollytellingMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track del progreso de scroll en el contenedor (va de 0 a 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- MAPA 1: CHILE ---
  const chileScale = useTransform(scrollYProgress, [0, 0.35], [1, 5]);
  const chileOpacity = useTransform(scrollYProgress, [0.25, 0.35], [1, 0]);

  // --- MAPA 2: LOS LAGOS ---
  const lagosScale = useTransform(scrollYProgress, [0.35, 0.7], [0.8, 4]);
  const lagosOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.6, 0.7], [0, 1, 1, 0]);

  // --- MAPA 3: PUERTO MONTT ---
  const ptoMonttScale = useTransform(scrollYProgress, [0.7, 1], [0.8, 1.1]);
  const ptoMonttOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);

  return (
    // Contenedor que dicta la longitud del scroll (400vh)
    <section ref={containerRef} className="relative h-[400vh] w-full bg-transparent">

      {/* Marco fijo a la pantalla (sticky) */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Capa 1: Chile */}
        <motion.div
          style={{
            scale: chileScale,
            opacity: chileOpacity,
            transformOrigin: "50% 75%" // Ajusta el zoom hacia la zona sur
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src="https://i.postimg.cc/vmqwxwrJ/Chile.png"
            alt="Mapa de Chile"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Capa 2: Región de Los Lagos */}
        <motion.div
          style={{
            scale: lagosScale,
            opacity: lagosOpacity,
            transformOrigin: "45% 40%" // Ajusta el zoom hacia Puerto Montt
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src="https://i.postimg.cc/xdxVNVGD/Los_lagos.png"
            alt="Mapa de Los Lagos"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Capa 3: Puerto Montt */}
        <motion.div
          style={{
            scale: ptoMonttScale,
            opacity: ptoMonttOpacity,
            transformOrigin: "center center"
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src="https://i.postimg.cc/0NW1K1YB/Puerto_Montt.png"
            alt="Mapa de Puerto Montt"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}
