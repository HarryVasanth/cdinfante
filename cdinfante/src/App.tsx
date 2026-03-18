import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Menu, X, Globe, Moon, Sun,
  ChevronRight, MapPin, Phone,
  Footprints, Mountain, ArrowUpRight,
  Trophy, Activity, Target, LucideIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Logo Component
const Logo = () => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
      I
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-lg leading-tight tracking-tight text-slate-900 dark:text-white">CD INFANTE</span>
      <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">Dom Henrique</span>
    </div>
  </div>
);

// Navigation Item
const NavItem = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-sm font-medium text-slate-600 hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400 transition-colors py-2 px-1"
  >
    {children}
  </a>
);

// Bento Card Component
const BentoCard = ({
  title,
  icon: Icon,
  className,
  delay = 0
}: {
  title: string;
  icon: LucideIcon;
  className?: string;
  delay?: number;
}) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group relative overflow-hidden rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="w-12 h-12 bg-red-50 dark:bg-red-950/30 rounded-2xl flex items-center justify-center text-red-600 mb-4 group-hover:scale-110 transition-transform">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
          <div className="flex items-center text-red-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            {t('sports.learn_more')} <ChevronRight size={16} />
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
    </motion.div>
  );
};

export default function App() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt');
  };

  const navLinks = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.sports'), href: '#sports' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300 selection:bg-red-200 selection:text-red-900">
      {/* Navbar */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200 dark:border-slate-800 py-3"
          : "bg-transparent border-transparent py-6"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavItem key={link.name} href={link.href}>{link.name}</NavItem>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-400"
              aria-label="Toggle language"
            >
              <Globe size={20} />
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-400"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-slate-600 dark:text-slate-400"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-400"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-slate-950 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold text-slate-900 dark:text-white"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                className="mt-4 flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 font-medium"
              >
                <Globe size={20} /> {i18n.language === 'pt' ? 'English' : 'Português'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-slate-50 dark:from-black/50 dark:to-[#0a0a0a] z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-red-600/5 blur-[120px] rounded-full" />
          </div>

          <div className="relative z-20 text-center px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
                Funchal, Madeira
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-red-600/20 hover:scale-105 active:scale-95">
                  {t('hero.cta')}
                </button>
                <button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  {t('nav.about')}
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-700 rounded-full flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-red-600 rounded-full"
              />
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                  {t('about.title')}
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  {t('about.content')}
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-3xl font-bold text-red-600 mb-1">40+</div>
                    <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{t('about.years_label')}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-600 mb-1">500+</div>
                    <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{t('about.members_label')}</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-red-600/10 z-10" />
                <img
                  src="https://images.unsplash.com/photo-1461896756981-93e1850d2916?q=80&w=2070&auto=format&fit=crop"
                  alt="Athletics"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sports Section */}
        <section id="sports" className="py-24 px-6 bg-white dark:bg-slate-950/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                {t('sports.title')}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                {t('sports.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BentoCard title={t('sports.road_running')} icon={Activity} className="md:col-span-2 md:row-span-1" delay={0.1} />
              <BentoCard title={t('sports.trail_running')} icon={Mountain} delay={0.2} />
              <BentoCard title={t('sports.vertical_km')} icon={Target} delay={0.3} />
              <BentoCard title={t('sports.skyrunning')} icon={ArrowUpRight} className="md:col-span-2" delay={0.4} />
              <BentoCard title={t('sports.track_field')} icon={Footprints} delay={0.5} />
              <BentoCard title={t('sports.handball')} icon={Trophy} className="md:col-span-3" delay={0.6} />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-slate-900 dark:bg-red-950/20 rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/10 blur-[100px] rounded-full translate-x-1/2" />

              <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-8">{t('contact.title')}</h2>

                  <div className="space-y-8 mb-12">
                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-red-500 shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-widest">{t('contact.address_label')}</div>
                        <div className="text-white text-lg font-medium">{t('contact.address')}</div>
                      </div>
                    </div>

                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-red-500 shrink-0">
                        <Phone size={24} />
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-widest">{t('contact.phone_label')}</div>
                        <div className="text-white text-lg font-medium">+351 291 783 775</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.556209804895!2d-16.9238383!3d32.6713437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605ff8586c0e53%3A0xc66513476839352e!2sCol%C3%A9gio%20Infante%20D.%20Henrique!5e0!3m2!1spt!2spt!4v1710758500000!5m2!1spt!2spt"
                      width="100%"
                      height="250"
                      style={{ border: 0, borderRadius: '1rem' }}
                      allowFullScreen
                      loading="lazy"
                      className="dark:invert dark:grayscale dark:brightness-90"
                    />
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">{t('contact.form.name')}</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">{t('contact.form.email')}</label>
                        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">{t('contact.form.message')}</label>
                      <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" />
                    </div>
                    <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-red-600/20 active:scale-[0.98]">
                      {t('contact.form.send')}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <Logo />
          <p className="mt-8 text-slate-500 dark:text-slate-400 text-sm">
            © {new Date().getFullYear()} Clube Desportivo Infante Dom Henrique. {t('footer.rights')}
          </p>
        </div>
      </footer>
    </div>
  );
}
