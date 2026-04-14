import { AnimatePresence, m } from 'framer-motion'
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ExternalLink,
  Link as LinkIcon,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils'

// ------------------------------------------------------------------
// GOOGLE CALENDAR CONFIGURATION
// ------------------------------------------------------------------
const GOOGLE_CALENDARS = [
  {
    // 💙❤️ CDInfante - Calendário ❤️💙
    id: '4003e3c4c371fd3f0790289e87ec2b282e36e5bf41bc34f3e4bb6358edc5a99b@group.calendar.google.com',
    color: '%23d50000',
  },
  {
    // Atletismo da Madeira - Calendário
    id: 'cv0bgl3r64ghto82nlv4eh76mg0shlnp@import.calendar.google.com',
    color: '%234285f4',
  },
]

const buildCalendarUrl = () => {
  const baseUrl =
    'https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Atlantic%2FMadeira&showPrint=0'

  const srcParams = GOOGLE_CALENDARS.map(
    cal => `&src=${encodeURIComponent(cal.id)}`,
  ).join('')
  const colorParams = GOOGLE_CALENDARS.map(cal => `&color=${cal.color}`).join(
    '',
  )

  return `${baseUrl}${srcParams}${colorParams}`
}

const GOOGLE_CALENDAR_URL = buildCalendarUrl()

const sportsDocuments = [
  {
    id: 'aaram',
    nameKey: 'calendar.aaram_title',
    docs: [
      {
        titleKey: 'calendar.cal_aaram',
        url: 'https://atletismodamadeira.pt/competicao/calendario-pdf/',
      },
      {
        titleKey: 'calendar.cal_madeira_correr',
        url: 'https://atletismodamadeira.pt/competicao/calendario-pdf/',
      },
      {
        titleKey: 'calendar.cal_trail',
        url: 'https://atletismodamadeira.pt/competicao/calendario-pdf/',
      },
    ],
  },
  {
    id: 'fpa',
    nameKey: 'calendar.fpa_title',
    docs: [
      {
        titleKey: 'calendar.cal_nacional',
        url: 'https://fpatletismo.pt/resultados-2/',
      },
    ],
  },
]

/**
 * Calendar and Events Page.
 * Features an embedded Google Calendar and links to official regional/national athletic calendars.
 *
 * @author Harry Vasanth (harryvasanth.com)
 * @copyright (c) 2026
 */
export default function CalendarEvents() {
  const { t } = useTranslation()
  const [expandedId, setExpandedId] = useState<string | null>('aaram')

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <m.div
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
            <p className="text-xl text-brand-navy/60 dark:text-slate-400 max-w-2xl mx-auto mb-8">
              {t('calendar.subtitle')}
            </p>
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl rounded-[1.5rem] md:rounded-[2.5rem] p-2 sm:p-4 md:p-8 border border-white/30 dark:border-white/[0.1] shadow-2xl mb-12 md:mb-20"
        >
          <div className="w-full aspect-[4/5] sm:aspect-square md:aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden bg-white shadow-inner">
            <iframe
              src={GOOGLE_CALENDAR_URL}
              loading="lazy"
              style={{ border: 0 }}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              className="dark:invert dark:hue-rotate-180 dark:opacity-90 transition-all duration-700"
              title="CDI Calendar"
            />
          </div>
        </m.div>

        <m.div
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
            {sportsDocuments.map(category => (
              <div
                key={category.id}
                className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedId(
                      expandedId === category.id ? null : category.id,
                    )
                  }
                  className="w-full p-6 flex items-center justify-between bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <span className="text-lg font-bold text-brand-navy dark:text-white">
                    {t(category.nameKey)}
                  </span>
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-brand-navy dark:text-white transition-transform duration-300',
                      expandedId === category.id ? 'rotate-180' : '',
                    )}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === category.id && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="p-6 pt-0 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
                        <div className="grid gap-3 mt-4">
                          {category.docs.map(doc => (
                            <a
                              key={doc.titleKey}
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-brand-red dark:hover:border-brand-red hover:shadow-md transition-all group cursor-pointer"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center">
                                  <CalendarIcon size={20} />
                                </div>
                                <div>
                                  <p className="font-semibold text-brand-navy dark:text-white group-hover:text-brand-red transition-colors">
                                    {t(doc.titleKey)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-brand-navy dark:text-white opacity-50 group-hover:opacity-100 group-hover:text-brand-red transition-all">
                                <span className="text-sm font-bold hidden sm:block">
                                  {t('calendar.download_pdf')}
                                </span>
                                <ExternalLink size={18} />
                              </div>
                            </a>
                          ))}

                          {category.id === 'aaram' && (
                            <a
                              href="https://atletismodamadeira.pt/events/lista/?ical=1"
                              className="flex items-center justify-between p-4 rounded-xl bg-brand-navy/5 dark:bg-brand-navy/20 border border-brand-navy/20 dark:border-brand-navy/30 hover:border-brand-navy dark:hover:border-brand-red hover:shadow-md transition-all group mt-2 cursor-pointer"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-brand-navy text-white flex items-center justify-center shadow-sm">
                                  <LinkIcon size={20} />
                                </div>
                                <div>
                                  <p className="font-semibold text-brand-navy dark:text-white group-hover:text-brand-red transition-colors">
                                    {t('calendar.sync_button')}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-brand-navy dark:text-white opacity-50 group-hover:opacity-100 group-hover:text-brand-red transition-all">
                                <ExternalLink size={18} />
                              </div>
                            </a>
                          )}
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </div>
  )
}
