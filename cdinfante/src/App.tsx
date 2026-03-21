import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Menu, X, Globe, Moon, Sun,
  ChevronRight, MapPin, Phone,
  Footprints, Mountain, ArrowUpRight,
  Trophy, Activity, Target, LucideIcon,
  Facebook, Instagram
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
    <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
      I
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-lg leading-tight tracking-tight text-brand-navy dark:text-white">CD INFANTE</span>
      <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">Dom Henrique</span>
    </div>
  </div>
);

// Navigation Item
const NavItem = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-sm font-semibold text-brand-navy/70 hover:text-brand-red dark:text-slate-300 dark:hover:text-brand-red transition-colors py-2 px-1 tracking-wide"
  >
    {children}
  </a>
);

// Bento Card Component
const BentoCard = ({
  title,
  icon: Icon,
  imageUrl,
  className,
  delay = 0
}: {
  title: string;
  icon: LucideIcon;
  imageUrl?: string;
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
        "group relative overflow-hidden rounded-3xl p-8 bg-white dark:bg-brand-navy/20 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[260px]",
        className
      )}
    >
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 dark:opacity-30 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-brand-navy dark:via-brand-navy/60 dark:to-transparent" />
        </div>
      )}

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="w-12 h-12 bg-brand-red/5 dark:bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red mb-4 group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-sm">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-2 tracking-tight">{title}</h3>
          <div className="flex items-center text-brand-red font-bold text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {t('sports.learn_more')} <ChevronRight size={16} className="ml-1" />
          </div>
        </div>
      </div>
      {!imageUrl && (
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-red/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700" />
      )}
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
    <div className="min-h-screen bg-slate-50 dark:bg-brand-navy transition-colors duration-500 selection:bg-brand-red/20 selection:text-brand-navy">
      {/* Navbar */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/90 dark:bg-brand-navy/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 py-3 shadow-sm"
          : "bg-transparent border-transparent py-6"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavItem key={link.name} href={link.href}>{link.name}</NavItem>
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
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white dark:bg-brand-navy pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-bold text-brand-navy dark:text-white"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-slate-100 dark:bg-white/10 my-4" />
              <button
                onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                className="flex items-center justify-center gap-3 text-brand-navy/70 dark:text-slate-400 font-bold text-lg"
              >
                <Globe size={24} /> {i18n.language === 'pt' ? 'English' : 'Português'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=2070&auto=format&fit=crop"
              alt="Background Athletics"
              className="w-full h-full object-cover opacity-20 dark:opacity-10 grayscale brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50 dark:via-brand-navy/50 dark:to-brand-navy z-10" />
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-red/5 blur-[120px] rounded-full" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-brand-navy/10 blur-[120px] rounded-full" />
          </div>

          <div className="relative z-20 text-center px-6 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block py-1.5 px-4 rounded-full bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-brand-red/20 shadow-sm">
                Funchal, Madeira
              </span>
              <h1 className="text-6xl md:text-8xl font-black text-brand-navy dark:text-white mb-8 tracking-tighter leading-[0.95]">
                Clube Desportivo <br className="hidden md:block" />
                <span className="text-brand-red">Infante</span> Dom Henrique
              </h1>
              <p className="text-xl md:text-2xl text-brand-navy/70 dark:text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="group px-10 py-5 bg-brand-red hover:bg-brand-red/90 text-white rounded-full font-bold transition-all shadow-xl shadow-brand-red/20 hover:scale-105 active:scale-95 flex items-center gap-2">
                  {t('hero.cta')}
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-10 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white rounded-full font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm"
                >
                  {t('nav.about')}
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="w-7 h-12 border-2 border-brand-navy/20 dark:border-white/20 rounded-full flex justify-center p-1.5 backdrop-blur-sm">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-brand-red rounded-full"
              />
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6 bg-white dark:bg-brand-navy">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-6xl font-black text-brand-navy dark:text-white mb-10 tracking-tight leading-tight">
                  {t('about.title')}
                </h2>
                <div className="space-y-6 text-lg text-brand-navy/70 dark:text-slate-300 leading-relaxed mb-12 font-medium">
                  <p>{t('about.content')}</p>
                  <p>{t('about.subtitle')}</p>
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <div className="text-4xl font-black text-brand-red mb-2">40+</div>
                    <div className="text-xs font-bold text-brand-navy/40 dark:text-slate-400 uppercase tracking-widest">{t('about.years_label')}</div>
                  </div>
                  <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <div className="text-4xl font-black text-brand-red mb-2">500+</div>
                    <div className="text-xs font-bold text-brand-navy/40 dark:text-slate-400 uppercase tracking-widest">{t('about.members_label')}</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group"
              >
                <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                <img
                  src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=2070&auto=format&fit=crop"
                  alt="Athletics"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute bottom-8 left-8 right-8 z-20 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-80 mb-2">Since 1980</p>
                  <p className="text-xl font-bold">Promoting Excellence in Madeira Sports</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sports Section */}
        <section id="sports" className="py-32 px-6 bg-slate-50 dark:bg-black/40">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <span className="text-brand-red font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{t('nav.sports')}</span>
                <h2 className="text-4xl md:text-6xl font-black text-brand-navy dark:text-white mb-6 tracking-tight">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BentoCard
                title={t('sports.road_running')}
                icon={Activity}
                imageUrl="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop"
                className="md:col-span-2"
                delay={0.1}
              />
              <BentoCard
                title={t('sports.trail_running')}
                icon={Mountain}
                imageUrl="https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?q=80&w=2070&auto=format&fit=crop"
                delay={0.2}
              />
              <BentoCard
                title={t('sports.vertical_km')}
                icon={Target}
                imageUrl="https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2070&auto=format&fit=crop"
                delay={0.3}
              />
              <BentoCard
                title={t('sports.skyrunning')}
                icon={ArrowUpRight}
                imageUrl="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
                className="md:col-span-2"
                delay={0.4}
              />
              <BentoCard
                title={t('sports.track_field')}
                icon={Footprints}
                imageUrl="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop"
                delay={0.5}
              />
              <BentoCard
                title={t('sports.handball')}
                icon={Trophy}
                imageUrl="https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?q=80&w=2069&auto=format&fit=crop"
                className="md:col-span-3"
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 bg-white dark:bg-brand-navy">
          <div className="max-w-7xl mx-auto">
            <div className="bg-brand-navy dark:bg-black/40 rounded-[4rem] p-10 md:p-24 overflow-hidden relative shadow-3xl border border-white/5">
              <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-brand-red/10 blur-[120px] rounded-full" />
              <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-white/5 blur-[120px] rounded-full" />

              <div className="grid lg:grid-cols-2 gap-24 relative z-10">
                <div>
                  <h2 className="text-5xl font-black text-white mb-10 tracking-tight">{t('contact.title')}</h2>

                  <div className="space-y-10 mb-16">
                    <div className="flex gap-8 items-start group">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-red shrink-0 group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-300 border border-white/10">
                        <MapPin size={28} />
                      </div>
                      <div>
                        <div className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-[0.2em]">{t('contact.address_label')}</div>
                        <div className="text-white text-xl font-bold leading-relaxed">{t('contact.address')}</div>
                      </div>
                    </div>

                    <div className="flex gap-8 items-start group">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-red shrink-0 group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-300 border border-white/10">
                        <Phone size={28} />
                      </div>
                      <div>
                        <div className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-[0.2em]">{t('contact.phone_label')}</div>
                        <div className="text-white text-xl font-bold">+351 291 783 775</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-1.5 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-sm shadow-inner group overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.556209804895!2d-16.9238383!3d32.6713437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605ff8586c0e53%3A0xc66513476839352e!2sCol%C3%A9gio%20Infante%20D.%20Henrique!5e0!3m2!1spt!2spt!4v1710758500000!5m2!1spt!2spt"
                      width="100%"
                      height="300"
                      style={{ border: 0, borderRadius: '2rem' }}
                      allowFullScreen
                      loading="lazy"
                      className="dark:invert dark:grayscale dark:contrast-125 dark:brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100"
                    />
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-10 md:p-14 border border-white/10 shadow-2xl">
                  <form className="space-y-8">
                    <div className="grid grid-cols-1 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{t('contact.form.name')}</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{t('contact.form.email')}</label>
                        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{t('contact.form.message')}</label>
                      <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all" />
                    </div>
                    <button className="w-full py-5 bg-brand-red hover:bg-brand-red/90 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-brand-red/30 active:scale-[0.98] uppercase tracking-widest">
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
      <footer className="py-24 border-t border-slate-200 dark:border-white/5 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <Logo />

          <div className="flex gap-6 mt-10">
            <a href="https://www.facebook.com/CDInfante" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-brand-navy dark:text-white hover:bg-brand-red hover:text-white transition-all shadow-sm">
              <Facebook size={20} />
            </a>
            <a href="https://www.instagram.com/cdinfante_atletismo/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-brand-navy dark:text-white hover:bg-brand-red hover:text-white transition-all shadow-sm">
              <Instagram size={20} />
            </a>
          </div>

          <div className="flex gap-8 mt-12 mb-12">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-bold text-brand-navy/50 dark:text-slate-500 hover:text-brand-red transition-colors uppercase tracking-widest">
                {link.name}
              </a>
            ))}
          </div>
          <div className="w-20 h-1 bg-brand-red/20 rounded-full mb-12" />
          <p className="text-brand-navy/40 dark:text-slate-500 text-xs font-bold uppercase tracking-[0.3em] text-center">
            © {new Date().getFullYear()} Clube Desportivo Infante Dom Henrique <br className="md:hidden" />
            <span className="hidden md:inline mx-2">•</span> {t('footer.rights')}
          </p>
        </div>
      </footer>
    </div>
  );
}
