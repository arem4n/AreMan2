import { useState, useEffect } from 'react';

export function useMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  useEffect(() => {
    document.documentElement.classList.toggle('modal-open', isMenuOpen);

    const main = document.querySelector('main');
    if (main) {
      if (isMenuOpen) {
        main.setAttribute('inert', '');
        main.setAttribute('aria-hidden', 'true');
      } else {
        main.removeAttribute('inert');
        main.removeAttribute('aria-hidden');
      }
    }

    return () => {
      document.documentElement.classList.remove('modal-open');
      const mainEl = document.querySelector('main');
      if (mainEl) {
        mainEl.removeAttribute('inert');
        mainEl.removeAttribute('aria-hidden');
      }
    };
  }, [isMenuOpen]);

  return { isMenuOpen, toggleMenu };
}
