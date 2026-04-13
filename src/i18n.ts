// @author CD Infante Team (CDI) / Harry Vasanth
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import enGB from './locales/en-gb.json'
import ptPT from './locales/pt-pt.json'

const resources = {
  'en-GB': {
    translation: enGB,
  },
  'pt-PT': {
    translation: ptPT,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-PT',
    supportedLngs: ['pt-PT', 'en-GB'],
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
