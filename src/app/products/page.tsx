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
            Tools built to empower teams, standardise processes and surface
            performance insights — from shopfloor to leadership.
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: easeOut, delay: i * 0.06 }}
              className="group rounded-2xl border bg-white hover:shadow-lg transition-shadow"
            >
              <Link href={t.slug} className="flex h-full flex-col">
                {/* cover (optional) */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl bg-gradient-to-br from-slate-50 to-slate-100">
                  {t.cover ? (
                    <Image
                      src={t.cover}
                      alt={`${t.name} preview`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-contain p-4"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${t.gradient} opacity-90`}
                    />
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid size-10 place-items-center rounded-xl text-white bg-gradient-to-br ${t.gradient} shadow-sm`}
                      aria-hidden
                    >
                      <t.Icon className="size-5" />
                    </span>
                    <h3 className="text-xl font-semibold">{t.name}</h3>
                  </div>

                  <p className="mt-3 text-muted-foreground">{t.desc}</p>

                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}