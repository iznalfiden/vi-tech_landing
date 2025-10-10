// app/products/overview/page.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, easeOut } from 'framer-motion';
import {
  Search,
  Settings,
  Gauge,
  Lightbulb,
  ChartCandlestick,
  ChevronRight,
} from 'lucide-react';
import ProductsOverviewFlow from './components/ProductsOverviewFlow';

type Tool = {
  name: string;
  slug: string;
  desc: string;
  gradient: string; // tailwind bg gradient or solid
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  cover?: string;
};

const tools: Tool[] = [
  {
    name: 'GoSeeiT',
    slug: '/products/goseeit',
    desc: 'Promotes ‘Go Look & See’ approach.',
    gradient: 'from-emerald-500 to-teal-500',
    Icon: Search,
    cover: '/main_page_1.svg',
  },
  {
    name: 'StandardiziT',
    slug: '/products/standardizit',
    desc: 'Work Standards & SWC.',
    gradient: 'from-fuchsia-600 to-violet-600',
    Icon: ChartCandlestick,
    cover: '/about2.svg',
  },
  {
    name: 'ImproviT',
    slug: '/products/improvit',
    desc: 'Structured idea generation & implementation.',
    gradient: 'from-amber-500 to-orange-500',
    Icon: Lightbulb,
  },
  {
    name: 'ResolvIT',
    slug: '/products/resolvit',
    desc: 'Drives & simplifies standardised problem solving.',
    gradient: 'from-violet-600 to-purple-600',
    Icon: Settings,
  },
  {
    name: 'MeasuriT',
    slug: '/products/measurit',
    desc: 'Real-time metrics and insights.',
    gradient: 'from-rose-500 to-orange-500',
    Icon: Gauge,
  },
];

export default function ProductsOverviewPage() {
  return (
    <main className="bg-white text-foreground">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-20 md:pt-28 pb-10 md:pb-14">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.05 }}
            className="font-display text-4xl md:text-6xl font-bold tracking-tight"
          >
            Our product suite
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.12 }}
            className="mt-4 max-w-2xl text-muted-foreground text-lg"
          >
            Each Vi-Tech tool works individually but are most effective when combined and applied as a structured process embedded into your teams workflow
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.18 }}
            className="mt-6"
          >
            <Button asChild className="rounded-2xl">
              <Link href="/book-demo">Book a demo</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* GRID OF TOOLS */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <ProductsOverviewFlow />
      </section>
    </main>
  );
}