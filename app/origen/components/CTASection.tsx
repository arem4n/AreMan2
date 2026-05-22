'use client';

import { motion } from 'framer-motion';

export function CTASection({ navigateTo, rm }: { navigateTo: (hash: string) => void; rm: boolean | null }) {
  return (
    <motion.div
      initial={rm ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16 md:py-24 text-center"
    >
      <p className="font-display text-fluid-section font-bold uppercase text-deep-900 mb-10">
        Ya sabés quién soy.<br />¿Hablamos de tu empresa?
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => navigateTo('/portafolio')}
          className="inline-flex items-center justify-center bg-symbolic-600 hover:bg-symbolic-700 text-white font-semibold py-4 px-8 rounded-full transition duration-200 ease-out shadow-lg hover:shadow-xl hover:scale-[1.03] border border-symbolic-500 cursor-pointer focus:outline-none active:scale-95"
          style={{ minHeight: '44px' }}
        >
          Ver el trabajo
        </button>
        <button
          onClick={() => navigateTo('/#contacto')}
          className="inline-flex items-center justify-center bg-transparent hover:bg-deep-100 text-deep-700 hover:text-deep-900 font-semibold py-4 px-8 rounded-full transition duration-200 ease-out border border-deep-300 hover:border-deep-400 cursor-pointer focus:outline-none active:scale-95"
          style={{ minHeight: '44px' }}
        >
          Escribir directamente
        </button>
      </div>
    </motion.div>
  );
}
