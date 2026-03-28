import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export const Hero = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="images/main/cover.avif"
          alt="CDI-M Cover"
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
            <span className="text-brand-red">Infante</span> Dom Henrique
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
              className="group px-10 py-5 bg-brand-red hover:bg-brand-red/90 text-white rounded-full font-bold transition-all shadow-2xl shadow-brand-red/40 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
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
              className="px-10 py-5 bg-white dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white rounded-full font-bold hover:bg-slate-50 dark:hover:bg-white/10 backdrop-blur-md transition-all shadow-sm cursor-pointer"
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
  );
};
