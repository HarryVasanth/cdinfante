// @author HarryVasanth (https://github.com/harryvasanth)
import { useEffect, useState } from 'react'

/**
 * A custom hook to track if the window has been scrolled past a certain threshold.
 * Uses requestAnimationFrame for highly optimized performance.
 * * @param threshold - The scroll amount in pixels before returning true (default: 20)
 * @returns boolean - True if scrolled past the threshold, false otherwise.
 */
export function useScroll(threshold = 20) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > threshold)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
