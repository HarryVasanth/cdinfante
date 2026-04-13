// @author HarryVasanth (https://github.com/harryvasanth)
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

/**
 * Official Branding Logo.
 * Features a glowing background effect on hover.
 *
 * @author Harry Vasanth (harryvasanth.com)
 */
export const Logo = () => {
  const { t } = useTranslation()
  return (
    <Link to="/" className="flex items-center gap-3 group cursor-pointer">
      <div className="relative">
        <div className="absolute inset-0 bg-brand-red/20 blur-xl rounded-full group-hover:bg-brand-red/40 transition-colors duration-500" />
        <img
          src="/icons/apple-touch-icon.png"
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
  )
}
