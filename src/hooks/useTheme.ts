import { useEffect, useState } from 'react'

/**
 * Hook for managing the application theme (light/dark mode).
 * Persists the theme preference in localStorage and applies the 'dark' class to the document root.
 *
 * @author Harry Vasanth (harryvasanth.com)
 * @copyright (c) 2026
 */
export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        return savedTheme === 'dark'
      }
      return document.documentElement.classList.contains('dark')
    }
    return false
  })

  useEffect(() => {
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {
      // Ignore gracefully
    }

    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return [isDark, setIsDark] as const
}
