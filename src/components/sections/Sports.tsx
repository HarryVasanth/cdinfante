import {
  Activity,
  ArrowUpRight,
  CircleDot,
  Footprints,
  LayoutGrid,
  Mountain,
  ShieldCheck,
  Target,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BentoCard } from '../ui/BentoCard'

export const Sports = () => {
  const { t } = useTranslation()

  return (
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
            imageUrl="images/main/road-running.avif"
            delay={0.1}
            className="md:col-span-2"
            slug="road-running"
          />
          <BentoCard
            title={t('sports.trail_running')}
            icon={Mountain}
            imageUrl="images/main/trail-running.avif"
            delay={0.2}
            slug="trail-running"
          />
          <BentoCard
            title={t('sports.skyrunning_kv')}
            icon={ArrowUpRight}
            imageUrl="images/main/skyrunning-kv.avif"
            delay={0.4}
            slug="skyrunning-kv"
          />
          <BentoCard
            title={t('sports.track_field')}
            icon={Footprints}
            imageUrl="images/main/track-field.avif"
            delay={0.5}
            slug="track-field"
          />
          <BentoCard
            title={t('sports.other_competitions')}
            icon={Target}
            imageUrl="images/main/other-competitions.avif"
            delay={0.8}
            slug="other-competitions"
          />
          <BentoCard
            title={t('sports.handball')}
            icon={CircleDot}
            imageUrl="images/main/handball.avif"
            delay={0.6}
            slug="handball"
          />
          <BentoCard
            title={t('sports.judo')}
            icon={ShieldCheck}
            imageUrl="images/main/judo.avif"
            delay={0.7}
            slug="judo"
          />
          <BentoCard
            title={t('sports.others')}
            icon={LayoutGrid}
            imageUrl="images/main/others.avif"
            delay={0.8}
            className="md:col-span-2"
            slug="others"
          />
        </div>
      </div>
    </section>
  )
}
