/**
 * Clube Desportivo Infante Dom Henrique - Official Website
 * Built with React, Tailwind CSS, and Framer Motion.
 *
 * Main features:
 * - Bilingual support (pt-PT / en-GB) via i18next
 * - Persistent Dark/Light mode based on system preference and user choice
 * - Modular architecture for clean maintenance
 *
 * @author Harry Vasanth (harryvasanth.com)
 */

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SportDetails from './pages/SportDetails';
import { Spotlight } from './components/ui/Spotlight';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Sports } from './components/sections/Sports';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

export default function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const { i18n } = useTranslation();
  const location = useLocation();

  // Keep navigation smooth by scrolling to top or specific sections on route changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class and save preference to localStorage so it persists on refresh
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Switch between PT and EN while keeping the HTML lang attribute in sync
  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('pt') ? 'en-GB' : 'pt-PT';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('i18nextLng', nextLang);
    document.documentElement.lang = nextLang;
  };

  // Ensure the document language matches i18n state on boot
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-[#020202] transition-colors duration-700 selection:bg-brand-red/20 selection:text-brand-navy overflow-x-hidden font-plus-jakarta">
      <Spotlight />

      <Navbar
        isDark={isDark}
        setIsDark={setIsDark}
        toggleLanguage={toggleLanguage}
      />

      <Routes>
        <Route path="/sports/:sportId" element={<SportDetails />} />
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

      <Footer />
    </div>
  );
}
