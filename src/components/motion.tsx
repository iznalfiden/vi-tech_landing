'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

// Берём только HTML-теги из фабрики motion
type MotionFactory = typeof motion;
type MotionTag = Extract<keyof MotionFactory, keyof React.JSX.IntrinsicElements>;

// Пропсы конкретного motion-компонента (например, motion.div)
type MotionComponentOf<T extends MotionTag> = MotionFactory[T];
type PropsOf<T extends MotionTag> = React.ComponentProps<MotionComponentOf<T>>;

type FMProps<T extends MotionTag = 'div'> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  delay?: number;
} & Omit<PropsOf<T>, 'className' | 'children'>;

export function FM<T extends MotionTag = 'div'>(
  { as, children, className, delay = 0, ...rest }: FMProps<T>
) {
  const tag = (as ?? 'div') as T;

  // Приводим к нужному компоненту один раз через unknown (без any)
  const Comp = motion[tag] as unknown as React.ComponentType<PropsOf<T>>;

  return (
    <Comp
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      className={className}
      {...(rest as PropsOf<T>)}
    >
      {children}
    </Comp>
  );
}