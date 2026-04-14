import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Hook for managing the application language.
 * Provides a function to toggle between Portuguese and English and keeps the `html` lang attribute in sync.
 *
 * @author Harry Vasanth (harryvasanth.com)
 * @copyright (c) 2026
 */
export const useLanguage = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = useCallback(() => {
    const nextLang = i18n.language.startsWith('pt') ? 'en-GB' : 'pt-PT'
    i18n.changeLanguage(nextLang)
    document.documentElement.lang = nextLang
  }, [i18n])

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return { i18n, toggleLanguage }
}
