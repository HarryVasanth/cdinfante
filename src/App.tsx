import { domAnimation, LazyMotion } from 'framer-motion'
import { lazy, Suspense, useEffect, useState } from 'react'
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
import { PageLoader } from './components/ui/PageLoader'
import { ReloadPrompt } from './components/ui/ReloadPrompt'
import { Spotlight } from './components/ui/Spotlight'
import { useLanguage } from './hooks/useLanguage'
import { useTheme } from './hooks/useTheme'

// Lazy loaded pages
const SportDetails = lazy(() => import('./pages/SportDetails'))
const Docs = lazy(() => import('./pages/Docs'))
const CalendarEvents = lazy(() => import('./pages/CalendarEvents'))

/**
 * Main App Component.
 * Sets up routing, global providers, and core layout.
 *
 * @author Harry Vasanth (harryvasanth.com)
 * @copyright (c) 2026
 */
export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <Router>
        <MainContent />
      </Router>
    </LazyMotion>
  )
}

function MainContent() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useTheme()
  const { toggleLanguage } = useLanguage()

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
