/**
 * Clube Desportivo Infante Dom Henrique - Official Website
 *
 * Features:
 * - Multilingual support (PT-PT/EN-GB) using i18next
 * - Responsive design with Tailwind CSS
 * - Interactive UI with Framer Motion (Spotlight, Bento Cards)
 * - Dark/Light theme toggle with persistence
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

  // Scroll to top or anchor on route change
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

  /**
   * Manages Dark Mode class on the document element and persists preference
   */
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  /**
   * Toggles between Portuguese and English and persists preference
   */
  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('pt') ? 'en-GB' : 'pt-PT';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('i18nextLng', nextLang);
    document.documentElement.lang = nextLang;
  };

  /**
   * Sync document language on initial mount
   */
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
