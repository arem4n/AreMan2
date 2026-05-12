import { useState, useEffect } from 'react';

export function useMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  useEffect(() => {
    document.documentElement.classList.toggle('modal-open', isMenuOpen);
    document.body.classList.toggle('modal-open', isMenuOpen);
    return () => {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    };
  }, [isMenuOpen]);

  return { isMenuOpen, toggleMenu };
}
