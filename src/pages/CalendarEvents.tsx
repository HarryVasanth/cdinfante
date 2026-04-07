import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  FileText,
  Download,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { cn } from '../lib/utils';

const sportsDocuments = [
  {
    id: 'road-running',
    name: 'Road Running / Corrida de Estrada',
    docs: [
      {
        title: 'Calendário Regional de Estrada 2026',
        size: '1.2 MB',
        url: '#',
      },
      { title: 'Regulamento Madeira a Correr', size: '2.5 MB', url: '#' },
    ],
  },
  {
    id: 'trail-running',
    name: 'Trail Running',
    docs: [
      { title: 'Calendário Regional Trail 2026', size: '1.8 MB', url: '#' },
      { title: 'Regulamento Trail Nacional', size: '3.1 MB', url: '#' },
    ],
  },
  {
    id: 'track-field',
    name: 'Track & Field / Atletismo de Pista',
    docs: [{ title: 'Calendário Pista 2026', size: '0.9 MB', url: '#' }],
  },
  {
    id: 'handball',
    name: 'Handball / Andebol',
    docs: [
      {
        title: 'Calendário Associação Andebol Madeira',
        size: '1.5 MB',
        url: '#',
      },
    ],
  },
];

export default function CalendarEvents() {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<string | null>('road-running');

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-16 bg-brand-red/10 dark:bg-brand-red/20 rounded-2xl flex items-center justify-center text-brand-red mx-auto mb-6 shadow-sm">
              <CalendarIcon size={32} />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-brand-navy dark:text-white mb-6 tracking-tight">
              {t('calendar.title')}
            </h1>
            <p className="text-xl text-brand-navy/60 dark:text-slate-400 max-w-2xl mx-auto">
              {t('calendar.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Google Calendar Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-8 border border-white/30 dark:border-white/[0.1] shadow-2xl mb-20"
        >
          {/* Note: The 'dark:invert dark:hue-rotate-180 dark:opacity-90' classes magically adapt the Google Calendar to dark mode! */}
          <div className="w-full aspect-square md:aspect-[16/9] rounded-2xl overflow-hidden bg-white shadow-inner">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=4003e3c4c371fd3f0790289e87ec2b282e36e5bf41bc34f3e4bb6358edc5a99b%40group.calendar.google.com&ctz=Atlantic%2FMadeira"
              style={{ border: 0 }}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              className="dark:invert dark:hue-rotate-180 dark:opacity-90 transition-all duration-700"
              title="CDInfante - Calendário"
            ></iframe>
          </div>
        </motion.div>

        {/* Accordion for PDFs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-brand-navy dark:text-white mb-3">
              {t('calendar.documents_title')}
            </h2>
            <p className="text-brand-navy/60 dark:text-slate-400">
              {t('calendar.documents_subtitle')}
            </p>
          </div>

          <div className="grid gap-4">
            {sportsDocuments.map((sport) => (
              <div
                key={sport.id}
                className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() =>
                    setExpandedId(expandedId === sport.id ? null : sport.id)
                  }
                  className="w-full p-6 flex items-center justify-between bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <span className="text-lg font-bold text-brand-navy dark:text-white">
                    {sport.name}
                  </span>
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-brand-navy dark:text-white transition-transform duration-300',
                      expandedId === sport.id ? 'rotate-180' : '',
                    )}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === sport.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="p-6 pt-0 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
                        <div className="grid gap-3 mt-4">
                          {sport.docs.map((doc, index) => (
                            <a
                              key={index}
                              href={doc.url}
                              className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-brand-red dark:hover:border-brand-red hover:shadow-md transition-all group"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center">
                                  <FileText size={20} />
                                </div>
                                <div>
                                  <p className="font-semibold text-brand-navy dark:text-white group-hover:text-brand-red transition-colors">
                                    {doc.title}
                                  </p>
                                  <p className="text-xs text-slate-500 font-mono mt-1">
                                    PDF • {doc.size}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-brand-navy dark:text-white opacity-50 group-hover:opacity-100 group-hover:text-brand-red transition-all">
                                <span className="text-sm font-bold hidden sm:block">
                                  {t('calendar.download_pdf')}
                                </span>
                                <Download size={18} />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
