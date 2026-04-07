import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Moon, Sun } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Logo } from '../ui/Logo';
import { useScroll } from '../../hooks/useScroll';

interface NavbarProps {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  toggleLanguage: () => void;
}

export const Navbar = ({ isDark, setIsDark, toggleLanguage }: NavbarProps) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrolled = useScroll(20);

  // Prevent body scroll when menu is open to improve performance
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.sports'), href: '#sports' },
    { name: t('nav.calendar'), href: 'calendar' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    // Add slight delay to allow drawer to start closing before scrolling
    setTimeout(() => {
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (href.startsWith('#')) {
        const id = href.replace('#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

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
            'max-w-7xl mx-auto pointer-events-auto transition-all duration-500',
            scrolled
              ? 'bg-white/80 dark:bg-black/70 backdrop-blur-lg border border-white/30 dark:border-white/10 py-3 px-8 rounded-full shadow-xl'
              : 'bg-transparent py-8 px-0',
          )}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <ul className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href.startsWith('#') ? '/' : `/${link.href}`}
                    onClick={() => handleLinkClick(link.href)}
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
                className="p-2 md:flex hidden text-brand-navy dark:text-slate-300"
              >
                <Globe size={20} />
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 text-brand-navy dark:text-slate-300"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 md:hidden text-brand-navy dark:text-slate-300"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </m.div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} // GPU friendly transition
            className="fixed inset-0 z-[100] bg-white dark:bg-black flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between p-6">
              <Logo />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-brand-navy dark:text-slate-300"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-8 text-center px-6 py-12 flex-1 justify-center">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-4xl font-black text-brand-navy dark:text-white active:text-brand-red transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-3 font-bold text-lg mt-4"
              >
                <Globe size={24} />{' '}
                {i18n.language.startsWith('pt') ? 'English' : 'Português'}
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
