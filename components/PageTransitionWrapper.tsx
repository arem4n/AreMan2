
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import PageTransitionPreloader from './PageTransitionPreloader';

export function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        previousPathname.current = pathname;
        setIsTransitioning(false);
      }, 800); // Animation duration increased to 800ms

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <>
      <PageTransitionPreloader isVisible={isTransitioning} />
      {children}
    </>
  );
}
