import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-32 px-6 bg-transparent relative">
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
              src="images/main/cover.avif"
              alt="About CDI-M"
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
  );
};
