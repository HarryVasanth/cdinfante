import { AnimatePresence, m } from 'framer-motion'
import { Globe, Menu, Moon, Sun, X } from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useScroll } from '../../hooks/useScroll'
import { cn } from '../../lib/utils'
import { Logo } from '../ui/Logo'

interface NavbarProps {
  isDark: boolean
  setIsDark: (dark: boolean) => void
  toggleLanguage: () => void
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
}

export const Navbar = ({
  isDark,
  setIsDark,
  toggleLanguage,
  isMenuOpen,
  setIsMenuOpen,
}: NavbarProps) => {
  const { t, i18n } = useTranslation()
  const scrolled = useScroll(20)

  // Prevent body scroll when menu is open to improve mobile performance
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navLinks = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.sports'), href: '#sports' },
    { name: t('nav.calendar'), href: 'calendar' },
    { name: t('nav.contact'), href: '#contact' },
  ]

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    // First, close the menu
    setIsMenuOpen(false)

    // Handle scroll logic for hash links on the home page
    if (window.location.pathname === '/' && href.startsWith('#')) {
      e.preventDefault()
      const id = href.replace('#', '')
      const element = id ? document.getElementById(id) : null

      // Immediately scroll without the setTimeout to prevent lag
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      window.history.pushState(null, '', href === '#' ? '/' : `/${href}`)
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 pointer-events-none">
        <m.div
          animate={{
            y: scrolled ? 24 : 0,
            scale: scrolled ? 0.98 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            // 1. Move 'border' and 'rounded-full' here so they are ALWAYS present
            'max-w-7xl mx-auto pointer-events-auto transition-all duration-500 border rounded-full',
            scrolled
              ? // 2. Just change the border color when scrolled
                'bg-white/80 dark:bg-black/70 backdrop-blur-lg border-white/30 dark:border-white/10 py-3 px-8 shadow-xl'
              : // 3. Make the border transparent when at the top
                'bg-transparent border-transparent py-8 px-0 shadow-none',
          )}
        >
          <div className="flex items-center justify-between">
            <Logo />

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-10">
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link
                    // Fixed: Preserve the hash so cross-page routing works (e.g. from /docs to /#about)
                    to={
                      link.href.startsWith('#')
                        ? `/${link.href}`
                        : `/${link.href}`
                    }
                    onClick={e => handleLinkClick(e, link.href)}
                    className="text-sm font-semibold text-brand-navy/70 hover:text-brand-red dark:text-slate-300 dark:hover:text-brand-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all text-brand-navy dark:text-slate-300 cursor-pointer hidden md:flex"
                aria-label="Toggle language"
              >
                <Globe size={20} />
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all text-brand-navy dark:text-slate-300 cursor-pointer"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 md:hidden text-brand-navy dark:text-slate-300 cursor-pointer"
                aria-label="Menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </m.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            // Added overscroll-none to prevent rubber-banding the background
            className="fixed inset-0 z-[100] bg-white dark:bg-black flex flex-col md:hidden overflow-y-auto overscroll-none"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6">
              <div onClick={() => setIsMenuOpen(false)}>
                <Logo />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 text-brand-navy dark:text-slate-300 cursor-pointer"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-brand-navy dark:text-slate-300 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors"
                  aria-label="Close Menu"
                >
                  <X size={28} />
                </button>
              </div>
            </div>

            {/* Drawer Links */}
            <div className="flex flex-col gap-8 text-center px-6 py-12 flex-1 justify-center">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={
                    link.href.startsWith('#')
                      ? `/${link.href}`
                      : `/${link.href}`
                  }
                  onClick={e => handleLinkClick(e, link.href)}
                  className="text-4xl font-black text-brand-navy dark:text-white hover:text-brand-red transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-slate-100 dark:bg-white/10 my-4 mx-12" />
              <button
                onClick={() => {
                  toggleLanguage()
                  setIsMenuOpen(false)
                }}
                className="flex items-center justify-center gap-3 text-brand-navy/70 dark:text-slate-400 hover:text-brand-red dark:hover:text-brand-red font-bold text-lg cursor-pointer transition-colors"
              >
                <Globe size={24} />{' '}
                {i18n.language.startsWith('pt') ? 'English' : 'Português'}
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
