// app/products/improvit/ImproviTClient.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Lightbulb,
  ClipboardCheck,
  CalendarDays,
  Users,
  LineChart,
  Target,
  CheckCircle2,
  Gauge,
  Layers,
  GitBranch,
} from 'lucide-react';
import FeatureGrid, { type FeatureGridItem } from '@/components/FeatureGrid';

type FeatureItem = {
  title: string;
  desc: string;
  Icon: LucideIcon;
  gradient?: string;
};

type HeroBullet = {
  text: string;
  Icon?: LucideIcon;
  pillClass?: string;
};

export default function ImproviTClient() {
  const reduce = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: 'easeOut' } },
  };

  const containerStagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.05 } },
  };

  // ✅ Hero bullets
  const heroBullets: HeroBullet[] = [
    { text: 'Capture ideas from anywhere', Icon: Lightbulb, pillClass: 'bg-gradient-to-br from-amber-500 to-orange-500' },
    { text: 'Prioritise by impact & effort' },
    { text: 'Convert ideas into actions' },
    { text: 'Track implementation & outcomes' },
    { text: 'Close the loop into standards (StandardiziT / ResolvIT)' },
  ];

  // ✅ Переиспользуемый грид — в стиле GoSeeiT/ResolvIT (свои формулировки)
  const benefitsGrid: FeatureGridItem[] = [
    { Icon: Lightbulb,     title: 'Makes continuous improvement visible and easy' },
    { Icon: Target,        title: 'Focuses effort on the highest-impact changes' },
    { Icon: ClipboardCheck,title: 'Turns ideas into clear, owned actions' },
    { Icon: CalendarDays,  title: 'Keeps momentum with schedules & reminders' },
    { Icon: Users,         title: 'Engages teams and builds shared ownership' },
    { Icon: LineChart,     title: 'Shows measurable results and learning' },
  ];

  // ✅ Основные фичи
  const features: FeatureItem[] = [
    {
      title: 'Idea intake',
      desc: 'Capture ideas on the floor or from your desk; tag by area/process and attach quick evidence.',
      Icon: Lightbulb,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Prioritisation',
      desc: 'Impact × effort scoring, duplicates merge, quick wins vs. candidates for projects.',
      Icon: Target,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Action planning',
      desc: 'Owners, due dates and SLAs. Split an idea into several actions with clear responsibilities.',
      Icon: ClipboardCheck,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Team visibility',
      desc: 'Shared boards by area/line. Filters by owner, status and due date to drive daily reviews.',
      Icon: Users,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Results & KPIs',
      desc: 'Tie actions to metrics; track savings, quality and safety outcomes over time.',
      Icon: LineChart,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Standard updates',
      desc: 'When the method changes, initiate a StandardiziT update and link the implemented idea.',
      Icon: Layers,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Problem linkage',
      desc: 'Escalate complex items to ResolvIT; keep references both ways for full traceability.',
      Icon: GitBranch,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Governance & cadence',
      desc: 'Tiered reviews, email nudges and clean status rules to keep improvements moving.',
      Icon: CalendarDays,
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  // smooth scroll
  const onSeeFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('features');
    if (!el) return;
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    if (history.pushState) history.pushState(null, '', '#features');
  };

  return (
    <main>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[url('/ImproviTCircle.svg')] bg-no-repeat bg-cover bg-top">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* text */}
            <motion.div variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
              <motion.span variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-amber-700 ring-1 ring-amber-100">
                <span className="inline-grid place-items-center size-5 rounded-md bg-amber-500 text-white">
                  <Lightbulb className="size-3.5" />
                </span>
                Idea Generation & Implementation
              </motion.span>

              <motion.h1 variants={fadeUp} className="mt-4 font-bold tracking-tight leading-[1.15] md:leading-[1.05] text-[clamp(28px,7.5vw,44px)] md:text-6xl">
                ImproviT — from ideas to implemented outcomes
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-4 text-lg text-muted-foreground max-w-2xl">
                Capture ideas anywhere, prioritise by impact, convert into actions and link outcomes to standards and metrics.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild className="rounded-full">
                  <Link href="/book-demo">
                    Book a demo
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="#features" onClick={onSeeFeaturesClick}>
                    See features
                  </Link>
                </Button>
              </motion.div>

              <motion.ul variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="mt-6 grid gap-3 text-sm text-foreground/90">
                {heroBullets.map((b) => (
                  <motion.li key={b.text} variants={fadeUp} className="flex items-center gap-2">
                    {b.pillClass ? (
                      <span className={cn('mt-0.5 grid place-items-center size-6 rounded-md text-white shrink-0', b.pillClass)} aria-hidden="true">
                        {b.Icon ? <b.Icon className="size-3.5" strokeWidth={2.5} /> : null}
                      </span>
                    ) : (
                      <CheckCircle2 className="mt-0.5 size-4 text-amber-600 shrink-0" />
                    )}
                    <span>{b.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* visual */}
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: reduce ? 0 : 0.5, ease: 'easeOut' }}
              className="relative aspect-[16/11] md:aspect-[4/3] rounded-2xl border bg-white/60 backdrop-blur overflow-hidden"
            >
              <Image
                src="/improvit.svg"
                alt="ImproviT overview"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* BENEFITS GRID */}
      <FeatureGrid
        heading="Practical continuous improvement"
        items={benefitsGrid}
        theme="amber"
        className="bg-white"
      />

      {/* FEATURES */}
      <section id="features" className="scroll-mt-24 bg-[#0e0a24] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-2xl md:text-3xl font-bold text-white">
            What ImproviT includes
          </motion.h2>

          <motion.div variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                whileHover={{ y: reduce ? 0 : -4, scale: reduce ? 1 : 1.01 }}
                whileTap={{ scale: reduce ? 1 : 0.995 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
                layout
              >
                <div className="flex items-start gap-4">
                  <span className={cn('grid place-items-center size-12 rounded-xl shrink-0 text-white shadow-md', 'bg-gradient-to-br', f.gradient ?? 'from-amber-500 to-orange-500')} aria-hidden="true">
                    <f.Icon className="size-6" strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-white text-lg font-semibold leading-tight">{f.title}</div>
                    <div className="text-white/80 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* METRICS / CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto max-w-7xl px-4">
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center font-lg font-bold tracking-wider uppercase"
          >
            Outcomes with ImproviT
          </motion.h3>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-2 text-center text-muted-foreground max-w-3xl mx-auto"
          >
            Teams move faster from ideas to measurable results, with clear ownership and feedback loops into standards.
          </motion.p>

          <motion.div variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              { Icon: Gauge, value: '×2.4', label: 'Throughput of implemented ideas' },
              { Icon: CheckCircle2, value: '+45%', label: 'On-time action completion' },
              { Icon: LineChart, value: '↑ ROI', label: 'Tracked benefit per idea' },
            ].map((m) => (
              <motion.div key={m.label} variants={fadeUp} whileHover={{ y: reduce ? 0 : -3 }} className="rounded-2xl border bg-white p-6 shadow-sm flex items-center gap-4">
                <span className="grid place-items-center size-12 rounded-xl bg-amber-500 text-white">
                  <m.Icon className="size-6" />
                </span>
                <div>
                  <div className="text-2xl font-bold">{m.value}</div>
                  <div className="text-muted-foreground">{m.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mt-8 flex flex-wrap items-center gap-3 justify-center">
            <Button asChild className="rounded-full">
              <Link href="/book-demo">
                Request a demo
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/products">Other products</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}