/**
 * Clube Desportivo Infante Dom Henrique - Official Website
 *
 * Features:
 * - Multilingual support (PT/EN) using i18next
 * - Responsive design with Tailwind CSS
 * - Interactive UI with Framer Motion (Spotlight, Bento Cards)
 * - Dark/Light theme toggle
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  // Navigation & UI Icons
  Menu,
  X,
  Globe,
  Moon,
  Sun,
  ChevronRight,
  MapPin,
  Phone,

  // Sports & Brand Icons
  Footprints,
  Mountain,
  ArrowUpRight,
  Activity,
  Target,
  ShieldCheck,
  CircleDot,
  LayoutGrid,

  // Social Icons
  Facebook,
  Instagram,

  // Types
  type LucideIcon,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import SportDetails from './pages/SportDetails';

/**
 * Utility for Tailwind class merging
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Interactive Spotlight Component
 * Provides a mouse-tracking radial gradient glow.
 * Uses Framer Motion springs for fluid, high-performance movement.
 */
const Spotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const background = useMotionTemplate`radial-gradient(600px at ${smoothX}px ${smoothY}px, rgba(182, 23, 30, 0.08), transparent 80%)`;

  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]); // Static values from useMotionValue are stable

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50"
      style={{ background }}
      animate={{ opacity }}
      transition={{ duration: 0.3 }}
    />
  );
};

/**
 * Modern Branding Logo
 */
const Logo = () => {
  const { t } = useTranslation();
  return (
    <Link to="/" className="flex items-center gap-3 group cursor-pointer">
      <div className="relative">
        <div className="absolute inset-0 bg-brand-red/20 blur-xl rounded-full group-hover:bg-brand-red/40 transition-colors duration-500" />
        <img
          src="/icons/cdi_logo_transparent.png"
          alt="CDI-M Logo"
          className="relative w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold text-xl leading-none tracking-tighter text-brand-navy dark:text-white transition-colors">
          {t('hero.club_name')}
        </span>
        <span className="text-[10px] font-bold text-brand-red uppercase tracking-[0.2em] mt-0.5">
          {t('hero.club_suffix')}
        </span>
      </div>
    </Link>
  );
};

/**
 * Navigation Link Component
 *
 * @param href - Target anchor or URL
 * @param children - Link text or element
 * @param onClick - Optional click handler for mobile menu closing
 */
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
        to={`/${href}`}
        onClick={() => {
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

/**
 * Bento Grid Card Component
 *
 * Implements premium Glassmorphism with dynamic edge-lighting and hover effects.
 *
 * @param title - Sports discipline name
 * @param icon - Lucide icon component
 * @param imageUrl - Background image URL
 * @param className - Optional additional Tailwind classes
 * @param delay - Animation delay for staggered reveal
 */
const BentoCard = ({
  title,
  icon: Icon,
  imageUrl,
  className,
  delay = 0,
  slug,
}: {
  title: string;
  icon: LucideIcon;
  imageUrl?: string;
  className?: string;
  delay?: number;
  slug: string;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      onMouseMove={handleMouseMove}
      onClick={() => navigate(`/sports/${slug}`)}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative overflow-hidden rounded-[2.5rem] p-8 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border border-white/20 dark:border-white/[0.08] shadow-lg hover:shadow-2xl transition-all duration-700 min-h-[260px] flex flex-col justify-between cursor-pointer',
        'before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-br before:from-white/40 before:to-transparent before:rounded-[2.5rem] before:-z-10 dark:before:from-white/10 dark:before:to-transparent',
        className,
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(182, 23, 30, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 dark:opacity-30 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-brand-navy dark:via-brand-navy/60 dark:to-transparent" />
        </div>
      )}

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="w-12 h-12 bg-brand-red/10 dark:bg-brand-red/20 rounded-2xl flex items-center justify-center text-brand-red mb-4 group-hover:bg-brand-red group-hover:text-white transition-all duration-500 shadow-sm">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-brand-navy dark:text-white mb-2 tracking-tight transition-colors">
            {title}
          </h3>
          <div className="flex items-center text-brand-red font-bold text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            {t('sports.learn_more')} <ChevronRight size={16} className="ml-1" />
          </div>
        </div>
      </div>
      {!imageUrl && (
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-red/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000" />
      )}
    </motion.div>
  );
};

export default function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const { t, i18n } = useTranslation();
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /**
   * Updates scroll state to trigger navbar transitions
   */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /**
   * Manages Dark Mode class on the document element
   */
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  /**
   * Toggles between Portuguese and English
   */
  const toggleLanguage = () => {
    const nextLang = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(nextLang);
    document.documentElement.lang = nextLang;
  };

  const navLinks = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.sports'), href: '#sports' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-[#020202] transition-colors duration-700 selection:bg-brand-red/20 selection:text-brand-navy overflow-x-hidden">
      <Spotlight />

      {/* Navbar */}
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
              ? 'bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 py-3 px-8 rounded-full shadow-2xl'
              : 'bg-transparent border-transparent py-8 px-0',
          )}
        >
          <div className="flex items-center justify-between">
            <Logo />

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <NavItem key={link.name} href={link.href}>
                  {link.name}
                </NavItem>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all text-brand-navy dark:text-slate-300"
                aria-label="Toggle language"
              >
                <Globe size={20} />
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all text-brand-navy dark:text-slate-300"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 text-brand-navy dark:text-slate-300"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-brand-navy dark:text-slate-300"
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
                  to={`/${link.href}`}
                  onClick={() => setIsMenuOpen(false)}
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
                className="flex items-center justify-center gap-3 text-brand-navy/70 dark:text-slate-400 font-bold text-lg"
              >
                <Globe size={24} />{' '}
                {i18n.language === 'pt' ? 'English' : 'Português'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/sports/:sportId" element={<SportDetails />} />
        <Route
          path="/"
          element={
            <main>
              <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/517385675_1243952650855070_7174172134004013214_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_ohc=Ht6miKefkLcQ7kNvwEF0PHR&_nc_oc=Adr-mJpcwFDsTfNJCMJkQ_3s4ITOvIuZ45iM85T5SyfFNlKAiEdmj2aZsOQaQZYU1n_vDUXwd0_t8U-db6nC64fK&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=edt5Fx1uqte6cp5ylp1Edg&_nc_ss=7a32e&oh=00_Afz0P2BPVRVnrvkC6-DOFQzos0iGlj_nTKsmQjgiuhIZ9w&oe=69C4DC6F"
                    alt="Background Athletics"
                    className="w-full h-full object-cover opacity-20 dark:opacity-5 grayscale brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FBFBFD]/50 to-[#FBFBFD] dark:via-black/50 dark:to-black z-10" />
                  <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-brand-red/10 blur-[120px] rounded-full animate-pulse" />
                  <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-brand-navy/10 dark:bg-brand-red/5 blur-[120px] rounded-full animate-pulse" />
                </div>

                <div className="relative z-20 text-center px-6 max-w-5xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-brand-red/20 shadow-sm">
                      {t('hero.location')}
                    </span>
                    <h1 className="text-5xl sm:text-7xl lg:text-[9rem] font-[900] text-brand-navy dark:text-white mb-6 tracking-[-0.05em] leading-[0.85] break-words">
                      {t('hero.club_name')} <br className="hidden md:block" />
                      <span className="text-brand-red">Infante</span> Dom
                      Henrique
                    </h1>
                    <p className="text-xl md:text-2xl text-brand-navy/70 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto font-medium tracking-tight">
                      {t('hero.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                      <button
                        onClick={() =>
                          document
                            .getElementById('contact')
                            ?.scrollIntoView({ behavior: 'smooth' })
                        }
                        className="group px-10 py-5 bg-brand-red hover:bg-brand-red/90 text-white rounded-full font-bold transition-all shadow-2xl shadow-brand-red/40 hover:scale-105 active:scale-95 flex items-center gap-2"
                      >
                        {t('hero.cta')}

                        <ChevronRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                      <button
                        onClick={() =>
                          document
                            .getElementById('about')
                            ?.scrollIntoView({ behavior: 'smooth' })
                        }
                        className="px-10 py-5 bg-white dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white rounded-full font-bold hover:bg-slate-50 dark:hover:bg-white/10 backdrop-blur-md transition-all shadow-sm"
                      >
                        {t('nav.about')}
                      </button>
                    </div>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {!scrolled && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.8 }}
                      className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
                    >
                      <div className="w-6 h-10 border-2 border-brand-navy/20 dark:border-white/20 rounded-full flex justify-center p-1 backdrop-blur-sm shadow-sm">
                        <motion.div
                          animate={{ y: [0, 16, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="w-1.5 h-1.5 bg-brand-red rounded-full"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>

              {/* About Section */}
              <section
                id="about"
                className="py-32 px-6 bg-transparent relative"
              >
                <div className="max-w-7xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-20 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                      <h2 className="text-5xl md:text-7xl font-black text-brand-navy dark:text-white mb-10 tracking-tight leading-tight">
                        {t('about.title')}
                      </h2>
                      <div className="space-y-6 text-xl text-brand-navy/70 dark:text-slate-400 leading-relaxed mb-12 font-medium">
                        <p>{t('about.content')}</p>
                        <p>{t('about.subtitle')}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                        <div className="p-10 rounded-[2.5rem] bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border border-white/20 dark:border-white/[0.08] shadow-lg transition-transform hover:scale-[1.02] duration-500">
                          <div className="text-6xl font-black text-brand-red mb-2 tracking-tighter">
                            {t('about.years_count')}
                          </div>
                          <div className="text-sm font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest">
                            {t('about.years_label')}
                          </div>
                        </div>
                        <div className="p-10 rounded-[2.5rem] bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border border-white/20 dark:border-white/[0.08] shadow-lg transition-transform hover:scale-[1.02] duration-500">
                          <div className="text-5xl sm:text-6xl font-black text-brand-red mb-2 tracking-tighter">
                            {t('about.members_count')}
                          </div>
                          <div className="text-sm font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest">
                            {t('about.members_label')}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group"
                    >
                      <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-1000 z-10" />
                      <img
                        src="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/517385675_1243952650855070_7174172134004013214_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_ohc=Ht6miKefkLcQ7kNvwEF0PHR&_nc_oc=Adr-mJpcwFDsTfNJCMJkQ_3s4ITOvIuZ45iM85T5SyfFNlKAiEdmj2aZsOQaQZYU1n_vDUXwd0_t8U-db6nC64fK&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=uyA9mJLxqDtrvhZk4E0cfw&_nc_ss=7a32e&oh=00_AfwpMTgEPcn8fBedGAmiyY_XldF31tFKXL5ass-KCBEEnA&oe=69C4DC6F"
                        alt="Athletics"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute bottom-8 left-8 right-8 z-20 p-8 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 text-white shadow-2xl">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-80 mb-2">
                          {t('about.since')}
                        </p>
                        <p className="text-2xl font-black tracking-tight">
                          {t('about.promotion')}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Sports Section */}
              <section id="sports" className="py-32 px-6 bg-transparent">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                      <span className="text-brand-red font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                        {t('nav.sports')}
                      </span>
                      <h2 className="text-5xl md:text-7xl font-[900] text-brand-navy dark:text-white mb-6 tracking-tight">
                        {t('sports.title')}
                      </h2>
                      <p className="text-xl text-brand-navy/60 dark:text-slate-400 font-medium">
                        {t('sports.subtitle')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-12 h-1 bg-brand-red rounded-full" />
                      <div className="w-4 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                      <div className="w-4 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <BentoCard
                      title={t('sports.road_running')}
                      icon={Activity}
                      imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/517777586_1243954357521566_3621410186097974538_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=13d280&_nc_ohc=7L6w1coJ96YQ7kNvwEVHyWx&_nc_oc=AdpLoS71-Vx8kqInZgPDev31MSmBoYc2dh8N8VoM8HqSVyBvw0fC5JylXh7PPwwcks-XLm1gMpcXnm8fGaRnoClB&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=cWPYyWSwyhmO3Ve4bMqgYQ&_nc_ss=7a32e&oh=00_Afy1I0TSntTMDdVoQiPSWyhQ9pZ7A8ciNgJlU7EDlRg-zA&oe=69C4E17A"
                      delay={0.1}
                      className="md:col-span-2"
                      slug="road-running"
                    />
                    <BentoCard
                      title={t('sports.trail_running')}
                      icon={Mountain}
                      imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/485159335_1155820153001654_1938730724457588876_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_ohc=P9_FnaLitFYQ7kNvwHlu41B&_nc_oc=Adp-Er0ZvuwVBzAKaUT8SIYj0GijxH4NGg5lvb-PrjLdQAFcl8GyHP_pqs1no78d3VO-rjyS00J1IIhSOvovVX0-&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=r-2Tt8FZ2wCTXM4X683ULQ&_nc_ss=7a32e&oh=00_Afy_1RuLvHsLcfKshGp3uGF1rpE3u7Hgqv-vgOI0mnhPdw&oe=69C4E3AB"
                      delay={0.2}
                      slug="trail-running"
                    />
                    <BentoCard
                      title={t('sports.vertical_km')}
                      icon={Target}
                      imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/515670604_1236248098292192_510837140913093732_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=ERYxzvi401kQ7kNvwGM_2Bl&_nc_oc=AdojSDSmT6NYyVgo_s7wFYvNATj8inBwQ9JaG_EOZqkCLJHqC2hHd-lf4wq3JkK-ZGewXC9sKYSZPzgnP6yngewW&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=iyiP7QsuMzM3ifvmo4yZgQ&_nc_ss=7a32e&oh=00_Afx_zjTLETNt-7_8Ui8AqiDZ8hsne0aT-QdSH03WL-wDqQ&oe=69C4D20B"
                      delay={0.3}
                      slug="vertical-km"
                    />
                    <BentoCard
                      title={t('sports.skyrunning')}
                      icon={ArrowUpRight}
                      imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/510277858_1230731038843898_1160586756874725884_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_ohc=osLbrT2WYiQQ7kNvwGdugV_&_nc_oc=AdrR4Zgu6Z39yazK8fn90AgCbDaZm_j4fkd8oka_NecDB_Y-bABfo2rAT35oWTDIMLmW1c618Wngv4XdwivATKC6&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=OYE2Y_lhBM1JepwoxX7hoQ&_nc_ss=7a32e&oh=00_AfxFExCt3JewNI48lUiueF16z4MUPIXkPoiD-XxENXhZQw&oe=69C4D9E1"
                      delay={0.4}
                      slug="skyrunning"
                    />
                    <BentoCard
                      title={t('sports.track_field')}
                      icon={Footprints}
                      imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/649290213_1439487161301617_5655099727395803523_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_ohc=eACygkDOTs0Q7kNvwFWjhMo&_nc_oc=AdpT-TJG4dcm2IM5vq-NpYvDKoCBm-gXn-7DDzfe2CIRw_WJbHASTBj4S648xGZ1HP4h1-ABiyHdfF8eRcsNsHWE&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=JgKuhD5JM0_XABj8ZLNKCw&_nc_ss=7a32e&oh=00_Afz823wvgXEumZTikjsntonhAW-KDC78Y91yMHuPHOlOsw&oe=69C4D5EC"
                      delay={0.5}
                      slug="track-field"
                    />
                    <BentoCard
                      title={t('sports.handball')}
                      icon={CircleDot}
                      imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/518312337_1247530197163982_3412159863800210848_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=P0ZNf1iZLmsQ7kNvwEH3V3h&_nc_oc=Adrg-UbPIRXcVfohDjcg4RXVq3yZ1ROBlS-2GtIrtCgBwzbfyLNua36NaWGgf87cgKTQBWrqMVHBOCTrC1gCsz61&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=pNOZlqjyp9xfOdE8ibhIsQ&_nc_ss=7a32e&oh=00_AfwZIPqzhGQFtoaCdMBXEZQxDUnOnDtT2oghbaFYa9ZavQ&oe=69C4D3D0"
                      delay={0.6}
                      slug="handball"
                    />
                    <BentoCard
                      title={t('sports.judo')}
                      icon={ShieldCheck}
                      imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/555491580_1308130501103951_8891449616780622006_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_ohc=xpgmdzP878QQ7kNvwGqRCtl&_nc_oc=AdpZXSWk7KiCW8K_3r5nPpQIUwNVXwZIEA8mZ6KAyQV79FxhlN2w0wYfUaRJw7J8JbV9zi6pPdFlJ6jpppzd3hzM&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=RlJQhi2lOGz7RGJbsYe7qg&_nc_ss=7a32e&oh=00_Afw8Nv5rABDDlnu75o-3dZasO6hSls7UNaRKrSBQbVSfxQ&oe=69C4E034"
                      delay={0.7}
                      slug="judo"
                    />
                    <BentoCard
                      title={t('sports.others')}
                      icon={LayoutGrid}
                      imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/470481023_1117604636823206_4513685651347012395_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=2Y8o9Z-729QQ7kNvwGeW9vY&_nc_oc=AdoK8T0J4y6Q-n5hX_G9kK9vG7G9V-X-v-R6zJ_I-Z9X-7Y8t-I-X-I-X-I-X-I-X&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=A_X_I_X_I_X_I_X_I_X_I_X&_nc_ss=7a32e&oh=00_AY_I_X_I_X_I_X_I_X_I_X&oe=69C4D5EC"
                      delay={0.8}
                      className="md:col-span-2"
                      slug="others"
                    />
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="py-32 px-6 bg-transparent">
                <div className="max-w-7xl mx-auto">
                  <div className="bg-brand-navy dark:bg-white/[0.02] backdrop-blur-3xl rounded-[4rem] p-10 md:p-24 overflow-hidden relative shadow-3xl border border-white/10 transition-colors duration-700">
                    <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-brand-red/20 blur-[120px] rounded-full" />
                    <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-brand-navy/20 blur-[120px] rounded-full" />

                    <div className="grid lg:grid-cols-2 gap-24 relative z-10">
                      <div>
                        <h2 className="text-6xl font-black text-white mb-10 tracking-tight">
                          {t('contact.title')}
                        </h2>

                        <div className="space-y-10 mb-16">
                          <div className="flex gap-8 items-start group">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-red shrink-0 group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-500 border border-white/10">
                              <MapPin size={28} />
                            </div>
                            <div>
                              <div className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-[0.2em]">
                                {t('contact.address_label')}
                              </div>
                              <div className="text-white text-xl font-bold leading-relaxed whitespace-pre-line">
                                {t('contact.address')}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-8 items-start group">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-red shrink-0 group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-500 border border-white/10">
                              <Phone size={28} />
                            </div>
                            <div>
                              <div className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-[0.2em]">
                                {t('contact.phone_label')}
                              </div>
                              <div className="text-white text-xl font-bold">
                                {t('contact.phone_value')}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="p-1.5 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-sm shadow-inner group overflow-hidden cursor-pointer"
                          onClick={() =>
                            window.open(
                              'https://maps.app.goo.gl/3cU7eBi1goi7NWax7',
                              '_blank',
                            )
                          }
                        >
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3358.4057142371284!2d-16.9032822!3d32.675255299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc6061ab187bf7d1%3A0xc3243053e116fb0b!2sClube%20Desportivo%20Infante%20Dom%20Henrique!5e0!3m2!1sen!2spt!4v1774133527004!5m2!1sen!2spt"
                            width="100%"
                            height="300"
                            style={{
                              border: 0,
                              borderRadius: '2rem',
                              pointerEvents: 'none',
                            }}
                            allowFullScreen
                            loading="lazy"
                              title="Google Maps"
                            className="dark:invert dark:grayscale dark:contrast-125 dark:brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100"
                          />
                        </div>
                      </div>

                      <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-10 md:p-14 border border-white/10 shadow-2xl ring-1 ring-white/10">
                        <form
                          className="space-y-8"
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <div className="grid grid-cols-1 gap-8">
                            <div className="space-y-3">
                              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                                {t('contact.form.name')}
                              </label>
                              <input
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all duration-300"
                              />
                            </div>
                            <div className="space-y-3">
                              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                                {t('contact.form.email')}
                              </label>
                              <input
                                type="email"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all duration-300"
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                              {t('contact.form.message')}
                            </label>
                            <textarea
                              rows={5}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all duration-300"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full py-5 bg-brand-red hover:bg-brand-red/90 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-brand-red/30 active:scale-[0.98] uppercase tracking-widest cursor-pointer focus-visible:ring-4 focus-visible:ring-brand-red/40"
                          >
                            {t('contact.form.send')}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          }
        />
      </Routes>

      {/* Footer */}
      <footer className="py-24 border-t border-slate-200/50 dark:border-white/5 bg-[#FBFBFD] dark:bg-black transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <Logo />

          <div className="flex gap-6 mt-10">
            <a
              href="https://www.facebook.com/CDInfante"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-brand-navy dark:text-white hover:bg-brand-red hover:text-white transition-all shadow-sm"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/cdinfante_atletismo/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-brand-navy dark:text-white hover:bg-brand-red hover:text-white transition-all shadow-sm"
            >
              <Instagram size={20} />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-12 mb-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={`/${link.href}`}
                className="text-sm font-bold text-brand-navy/50 dark:text-slate-500 hover:text-brand-red transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="w-20 h-1 bg-brand-red/20 rounded-full mb-12" />
          <p className="text-brand-navy/40 dark:text-slate-500 text-xs font-bold uppercase tracking-[0.3em] text-center leading-relaxed">
            © {new Date().getFullYear()} Clube Desportivo Infante Dom Henrique{' '}
            <br className="md:hidden" />
            <span className="hidden md:inline mx-2">•</span>{' '}
            {t('footer.rights')}
          </p>
        </div>
      </footer>
    </div>
  );
}
