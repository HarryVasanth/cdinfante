import { m, useMotionTemplate, useMotionValue } from 'framer-motion'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../lib/utils'

/**
 * Interactive Bento Card with premium glassmorphism.
 * Features dynamic edge-lighting and high-performance hover effects.
 *
 * @author Harry Vasanth (harryvasanth.com)
 * @copyright (c) 2026
 */
export const BentoCard = ({
  title,
  icon: Icon,
  imageUrl,
  className,
  delay = 0,
  slug,
}: {
  title: string
  icon: LucideIcon
  imageUrl?: string
  className?: string
  delay?: number
  slug: string
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      onMouseMove={handleMouseMove}
      onClick={() => navigate(`/sports/${slug}`)}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative overflow-hidden rounded-[2.5rem] p-8 bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/30 dark:border-white/[0.1] shadow-xl hover:shadow-[0_32px_64px_-16px_rgba(182,23,30,0.1)] transition-all duration-700 min-h-[260px] flex flex-col justify-between cursor-pointer',
        'before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-br before:from-white/50 before:to-transparent before:rounded-[2.5rem] before:-z-10 dark:before:from-white/20 dark:before:to-transparent',
        className,
      )}
    >
      <m.div
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
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-80 dark:opacity-40 group-hover:opacity-100 dark:group-hover:opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent dark:from-black dark:via-black/60 dark:to-transparent" />
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
    </m.div>
  )
}
