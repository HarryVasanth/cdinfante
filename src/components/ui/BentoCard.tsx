import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Bento Grid Card Component
 *
 * Implements premium Glassmorphism with dynamic edge-lighting and hover effects.
 *
 * @param title - Sports discipline name
 * @param icon - Lucide icon component
 * @param imageUrl - Background image URL
 * @param className - Optional additional Tailwind classes
 * @param delay - Animation delay for staggered reveal
 */
export const BentoCard = ({
  title,
  icon: Icon,
  imageUrl,
  className,
  delay = 0,
  slug,
}: {
  title: string;
  icon: LucideIcon;
  imageUrl?: string;
  className?: string;
  delay?: number;
  slug: string;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      onMouseMove={handleMouseMove}
      onClick={() => navigate(`/sports/${slug}`)}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative overflow-hidden rounded-[2.5rem] p-8 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border border-white/20 dark:border-white/[0.08] shadow-lg hover:shadow-2xl transition-all duration-700 min-h-[260px] flex flex-col justify-between cursor-pointer',
        'before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-br before:from-white/40 before:to-transparent before:rounded-[2.5rem] before:-z-10 dark:before:from-white/10 dark:before:to-transparent',
        className,
      )}
    >
      <motion.div
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
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 dark:opacity-30 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-brand-navy dark:via-brand-navy/60 dark:to-transparent" />
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
    </motion.div>
  );
};
