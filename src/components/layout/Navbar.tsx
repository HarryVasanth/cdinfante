import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Logo } from '../ui/Logo';

const NavItem = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const isHash = href.startsWith('#');
  const isAbsolute = href.startsWith('http');

  if (isAbsolute) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold text-brand-navy/70 hover:text-brand-red dark:text-slate-300 dark:hover:text-brand-red transition-all py-2 px-1 tracking-wide focus-visible:outline-2 focus-visible:outline-brand-red focus-visible:outline-offset-4 rounded-sm"
      >
        {children}
      </a>
    );
  }

  if (isHash) {
    return (
      <Link
        to={href === '#' ? '/' : `/${href}`}
        onClick={(e) => {
          // If we are already on the home page, just scroll
          if (window.location.pathname === '/') {
            e.preventDefault();
            const id = href.replace('#', '');
            const element = id ? document.getElementById(id) : null;
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            } else if (!id) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            // Update hash without triggering reload
            window.history.pushState(null, '', href === '#' ? '/' : `/${href}`);
          }
          if (onClick) onClick();
        }}
        className="text-sm font-semibold text-brand-navy/70 hover:text-brand-red dark:text-slate-300 dark:hover:text-brand-red transition-all py-2 px-1 tracking-wide focus-visible:outline-2 focus-visible:outline-brand-red focus-visible:outline-offset-4 rounded-sm"
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      to={href}
      onClick={onClick}
      className="text-sm font-semibold text-brand-navy/70 hover:text-brand-red dark:text-slate-300 dark:hover:text-brand-red transition-all py-2 px-1 tracking-wide focus-visible:outline-2 focus-visible:outline-brand-red focus-visible:outline-offset-4 rounded-sm"
    >
      {children}
    </Link>
  );
};

interface NavbarProps {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  toggleLanguage: () => void;
}

export const Navbar = ({ isDark, setIsDark, toggleLanguage }: NavbarProps) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navLinks = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.sports'), href: '#sports' },
    { name: t('nav.calendar'), href: 'calendar' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6',
          scrolled ? 'mt-6' : 'mt-0',
        )}
      >
        <div
          className={cn(
            'max-w-7xl mx-auto transition-all duration-500',
            scrolled
              ? 'bg-white/70 dark:bg-black/60 backdrop-blur-2xl border border-white/30 dark:border-white/10 py-3 px-8 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-transparent border-transparent py-8 px-0',
          )}
        >
          <div className="flex items-center justify-between">
            <Logo />

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavItem href={link.href}>{link.name}</NavItem>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all text-brand-navy dark:text-slate-300 cursor-pointer"
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
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 text-brand-navy dark:text-slate-300 cursor-pointer"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-brand-navy dark:text-slate-300 cursor-pointer"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white dark:bg-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href === '#' ? '/' : `/${link.href}`}
                  onClick={(e) => {
                    if (window.location.pathname === '/') {
                      const id = link.href.replace('#', '');
                      const element = id ? document.getElementById(id) : null;
                      if (element || !id) {
                        e.preventDefault();
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                        window.history.pushState(
                          null,
                          '',
                          link.href === '#' ? '/' : `/${link.href}`,
                        );
                      }
                    }
                    setIsMenuOpen(false);
                  }}
                  className="text-3xl font-black text-brand-navy dark:text-white"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-slate-100 dark:bg-white/10 my-4" />
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-3 text-brand-navy/70 dark:text-slate-400 font-bold text-lg cursor-pointer"
              >
                <Globe size={24} />{' '}
                {i18n.language.startsWith('pt') ? 'English' : 'Português'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
