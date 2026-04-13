// @author HarryVasanth (https://github.com/harryvasanth)

import { domAnimation, LazyMotion } from 'framer-motion'
import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom'
import { Footer } from './components/layout/footer'
import { Navbar } from './components/layout/navbar'
import { About } from './components/sections/about'
import { Contact } from './components/sections/contact'
import { Hero } from './components/sections/hero'
import { Sports } from './components/sections/sports'
import { ReloadPrompt } from './components/ui/reload-prompt'
import { Spotlight } from './components/ui/spotlight'

const SportDetails = lazy(() => import('./pages/sport-details'))
const Docs = lazy(() => import('./pages/docs'))
const CalendarEvents = lazy(() => import('./pages/calendar-events'))

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <Router>
        <MainContent />
      </Router>
    </LazyMotion>
  )
}

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#FBFBFD] dark:bg-[#020202]">
    <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
  </div>
)

function MainContent() {
  const { i18n } = useTranslation()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => {
      if (location.hash) {
        const id = location.hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }, [location.pathname, location.hash])

  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return false
  })

  useEffect(() => {
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {}

    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleLanguage = useCallback(() => {
    const nextLang = i18n.language.startsWith('pt') ? 'en-GB' : 'pt-PT'
    i18n.changeLanguage(nextLang)
    document.documentElement.lang = nextLang
  }, [i18n])

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-[#020202] transition-colors duration-700 selection:bg-brand-red/20 selection:text-brand-navy overflow-x-hidden font-plus-jakarta">
      {!isMenuOpen && <Spotlight />}
      <ReloadPrompt />

      <Navbar
        isDark={isDark}
        setIsDark={setIsDark}
        toggleLanguage={toggleLanguage}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/docs" element={<Docs />} />
          <Route path="/sports/:sportId" element={<SportDetails />} />
          <Route path="/calendar" element={<CalendarEvents />} />
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <About />
                <Sports />
                <Contact />
              </main>
            }
          />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  )
}
