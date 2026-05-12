"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const MagneticButton = ({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasHover, setHasHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  // Smooth springs for magnetic feel
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!hasHover || !ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();

    // Calculate distance from center of button
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate movement limit (how far it can be pulled)
    const pullDistanceX = clientX - centerX;
    const pullDistanceY = clientY - centerY;

    // Factor to limit pull effect
    x.set(pullDistanceX * 0.4);
    y.set(pullDistanceY * 0.4);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!hasHover) return;
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: springX,
        y: springY,
      }}
      className={`relative inline-flex items-center justify-center px-10 py-5 overflow-hidden font-bold rounded-full transition-shadow duration-300 ${className}`}
    >
      <span className="relative z-10 transition-transform duration-300 ease-out transform group-hover:scale-105">
        {children}
      </span>
      {/* Background that might expand or shift slightly on hover if needed, else handled by className */}
    </motion.button>
  );
};
