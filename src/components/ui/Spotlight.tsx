import React, { useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion';

/**
 * Premium mouse-tracking spotlight effect.
 * Uses Framer Motion springs to provide fluid, lag-free movement.
 *
 * @author Harry Vasanth (harryvasanth.com)
 */
export const Spotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const background = useMotionTemplate`
    radial-gradient(
      800px circle at ${smoothX}px ${smoothY}px,
      rgba(182, 23, 30, 0.08) 0%,
      rgba(0, 30, 64, 0.03) 40%,
      transparent 80%
    )
  `;

  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50"
      style={{ background }}
      animate={{ opacity }}
      transition={{ duration: 0.3 }}
    />
  );
};
