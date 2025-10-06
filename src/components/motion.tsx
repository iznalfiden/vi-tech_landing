'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

type MotionAs<T extends keyof React.JSX.IntrinsicElements> = {
  as?: T;
  children?: React.ReactNode;
  className?: string;
  delay?: number;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export function FM<T extends keyof React.JSX.IntrinsicElements = 'div'>(
  { as, children, className, delay = 0, ...rest }: MotionAs<T>
) {
  const Comp = motion[(as || 'div') as keyof typeof motion] as any;
  return (
    <Comp
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}