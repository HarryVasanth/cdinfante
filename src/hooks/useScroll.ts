// src/hooks/useScroll.ts
import { useState, useEffect, useCallback } from 'react';

/**
 * A custom hook to track if the window has been scrolled past a certain threshold.
 * @param threshold - The scroll amount in pixels before returning true (default: 20)
 * @returns boolean - True if scrolled past the threshold, false otherwise.
 */
export function useScroll(threshold: number = 20) {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check the initial scroll position just in case the user
    // refreshes the page while already scrolled down
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return scrolled;
}
