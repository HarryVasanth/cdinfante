// src/App.tsx

import { LazyMotion, domAnimation } from 'framer-motion'
import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Sports } from './components/sections/Sports'
import { ReloadPrompt } from './components/ui/ReloadPrompt'
import { Spotlight } from './components/ui/Spotlight'

// Lazy loaded pages
const SportDetails = lazy(() => import('./pages/SportDetails'))
const Docs = lazy(() => import('./pages/Docs'))
const CalendarEvents = lazy(() => import('./pages/CalendarEvents'))

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

  // OPTIMIZATION: Non-blocking scroll behavior using requestAnimationFrame
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        if (location.hash) {
          const id = location.hash.replace('#', '')
          const element = document.getElementById(id)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        } else {
          window.scrollTo(0, 0)
        }
      } else if (!location.hash) {
        window.scrollTo(0, 0)
      }
    }

    // Defer scroll until after the new route paints to avoid visual blocking
    requestAnimationFrame(handleScroll)
  }, [location.pathname, location.hash])

  // OPTIMIZATION: Safe theme initialization with try/catch
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('theme')
        if (saved) return saved === 'dark'
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      } catch {
        // Prevent crash if localStorage is blocked (e.g., Strict Incognito mode)
        console.warn(
          'localStorage is restricted, falling back to system theme.',
        )
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
    }
    return false
  })

  // OPTIMIZATION: Safe theme saving
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

  // OPTIMIZATION: Wrap in useCallback so Navbar doesn't re-render unnecessarily
  const toggleLanguage = useCallback(() => {
    const nextLang = i18n.language.startsWith('pt') ? 'en-GB' : 'pt-PT'
    i18n.changeLanguage(nextLang)

    try {
      localStorage.setItem('i18nextLng', nextLang)
    } catch {
      // Ignore gracefully
    }

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
