'use client';

import * as React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FeatureGridItem = {
  title: string;
  Icon: LucideIcon;
  onClick?: () => void;
};

export type FeatureGridTheme = 'violet' | 'emerald';

type Props = {
  heading?: string;
  items: FeatureGridItem[];
  id?: string;
  className?: string;
  theme?: FeatureGridTheme; // ⬅️ теперь поддерживает emerald
};

export default function FeatureGrid({
  heading,
  items,
  id,
  className,
  theme = 'violet',
}: Props) {
  const reduce = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: 'easeOut' },
    },
  };

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.05 },
    },
  };

  // Палитры по темам
  const palettes: Record<FeatureGridTheme, { border: string; iconWrap: string }> = {
    violet: {
      border: 'border-violet-200/70 hover:border-violet-300',
      iconWrap: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
    },
    emerald: {
      border: 'border-emerald-200/70 hover:border-emerald-300',
      iconWrap: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    },
  };

  const palette = palettes[theme];

  return (
    <section id={id} className={cn('py-14 md:py-20 bg-white', className)}>
      <div className="mx-auto max-w-7xl px-4">
        {heading ? (
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center text-3xl md:text-4xl font-extrabold"
          >
            {heading}
          </motion.h2>
        ) : null}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(({ Icon, title, onClick }) => (
            <motion.button
              key={title}
              type="button"
              onClick={onClick}
              variants={fadeUp}
              whileHover={{ y: reduce ? 0 : -4, scale: reduce ? 1 : 1.01 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className={cn(
                'text-left rounded-3xl border bg-white p-8 md:p-10 text-center',
                'shadow-[0_1px_0_rgba(16,24,40,.06)] hover:shadow-md transition',
                palette.border
              )}
            >
              <span
                className={cn(
                  'mx-auto mb-4 grid size-16 place-items-center rounded-2xl',
                  palette.iconWrap
                )}
                aria-hidden="true"
              >
                <Icon className="size-8" strokeWidth={2.25} />
              </span>
              <p className="text-lg leading-relaxed">{title}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}