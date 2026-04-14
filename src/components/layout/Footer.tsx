import { Facebook, Instagram } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Logo } from '../ui/Logo'

/**
 * Footer Component.
 * Contains branding, social links, navigation, and copyright information.
 *
 * @author Harry Vasanth (harryvasanth.com)
 * @copyright (c) 2026
 */
export const Footer = () => {
  const { t } = useTranslation()

  const navLinks = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.sports'), href: '#sports' },
    { name: t('nav.calendar'), href: 'calendar' },
    { name: t('nav.contact'), href: '#contact' },
  ]

  return (
    <footer className="py-24 border-t border-slate-200/50 dark:border-white/5 bg-[#FBFBFD] dark:bg-black transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <Logo />

        <div className="flex gap-6 mt-10">
          <a
            href="https://www.facebook.com/CDInfante"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-brand-navy dark:text-white hover:bg-brand-red hover:text-white transition-all shadow-sm cursor-pointer"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://www.instagram.com/cdinfante_atletismo/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-brand-navy dark:text-white hover:bg-brand-red hover:text-white transition-all shadow-sm cursor-pointer"
          >
            <Instagram size={20} />
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-12 mb-12">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={`/${link.href}`}
              className="text-sm font-bold text-brand-navy/50 dark:text-slate-500 hover:text-brand-red transition-colors uppercase tracking-widest cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="w-20 h-1 bg-brand-red/20 rounded-full mb-12" />
        <p className="text-brand-navy/40 dark:text-slate-500 text-xs font-bold uppercase tracking-[0.3em] text-center leading-relaxed">
          © {new Date().getFullYear()} Clube Desportivo Infante Dom Henrique{' '}
          <br className="md:hidden" />
          <span className="hidden md:inline mx-2">•</span> {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
