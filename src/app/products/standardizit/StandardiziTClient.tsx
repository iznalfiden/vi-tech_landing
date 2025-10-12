// app/products/standardizit/StandardiziTClient.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  FileText,
  GitBranch,
  Wrench,
  Image as ImageIcon,
  ClipboardCheck,
  ShieldCheck,
  Gauge,
  CheckCircle2,
  ChartCandlestick,
  LineChart,
  TimerOff,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

// 🔁 переиспользуемый грид
import FeatureGrid, { type FeatureGridItem } from '@/components/FeatureGrid';

type FeatureItem = {
  title: string;
  desc: string;
  Icon: LucideIcon;
  gradient?: string; // optional accent gradient
};

export default function StandardiziTClient() {
  const shouldReduce = useReducedMotion();

  // 🔧 строго типизированные variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduce ? 0 : 0.5, ease: 'easeOut' },
    },
  };

  const containerStagger: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.08,
        delayChildren: shouldReduce ? 0 : 0.05,
      },
    },
  };

  const features: FeatureItem[] = [
    {
      title: 'Authoring: steps & WES substeps',
      desc:
        'Structure your process: steps and WES substeps with time (VA/NVA/Walk). When a step is renamed, WES numbering updates automatically.',
      Icon: FileText,
      gradient: 'bg-fuchsia-600',
    },
    {
      title: 'Options / variants',
      desc:
        'Link options to product variants. Deletion is protected: if an option is used in takt-time configuration, deletion is blocked.',
      Icon: GitBranch,
      gradient: 'bg-fuchsia-600',
    },
    {
      title: 'PPE & Equipment',
      desc:
        'Associate PPE and equipment with steps and WES substeps. Bulk add/remove and update links in one click.',
      Icon: Wrench,
      gradient: 'bg-fuchsia-600',
    },
    {
      title: 'Media & documents',
      desc:
        'Images, videos, layout diagrams and supporting documents (S3). Smart, collision-safe file names.',
      Icon: ImageIcon,
      gradient: 'bg-fuchsia-600',
    },
    {
      title: 'Key Points (SQK) & reasons',
      desc:
        'Key Points with types/codes and reasons — on steps and WES substeps. Flexible edit and delete.',
      Icon: ClipboardCheck,
      gradient: 'bg-fuchsia-600',
    },
    {
      title: 'Approval',
      desc: 'Two-party approvals (creator/approver).',
      Icon: ShieldCheck,
      gradient: 'bg-fuchsia-600',
    },
    // Line Planning
    {
      title: 'Line Planning',
      desc:
        'Set takt target, crew size, shift pattern, and planned output. These parameters directly feed Yamazumi balancing to keep each station under takt.',
      Icon: LineChart,
      gradient: 'bg-fuchsia-600',
    },
    // Losses impact
    {
      title: 'Losses & availability',
      desc:
        'Model planned/unplanned losses (changeovers, microstops, meetings). Net available time is recalculated and Yamazumi bars update instantly, highlighting overloads after losses.',
      Icon: TimerOff,
      gradient: 'bg-fuchsia-600',
    },
    // Highlighted tools
    {
      title: 'Raise Problem',
      desc:
        'Spin off an issue discovered during Yamazumi balancing into a Problem case with its own ID, assignee and follow-up tracking.',
      Icon: AlertTriangle,
      gradient: 'from-violet-600 to-purple-600',
    },
    {
      title: 'Improvement Idea',
      desc:
        'Capture an idea on the fly while working in Yamazumi balancing; keep full context and convert into actions later.',
      Icon: Lightbulb,
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  // 🔹 данные для FeatureGrid (короткие тезисы, как в других продуктах)
  const benefitsGrid: FeatureGridItem[] = [
    { Icon: ChartCandlestick, title: 'Captures the “one best way”' },
    { Icon: FileText,         title: 'Publishes signed standards with versions' },
    { Icon: GitBranch,        title: 'Supports variants without losing control' },
    { Icon: ImageIcon,        title: 'Explains work clearly with visuals' },
    { Icon: Wrench,           title: 'Links steps to people, tools and safety' },
    { Icon: ClipboardCheck,   title: 'Creates accountability with approvals & traceability' },
  ];;

  // smooth scroll to features
  const onSeeFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('features');
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    if (history.pushState) history.pushState(null, '', '#features');
  };

  const bullets = [
    'Steps & WES substeps with VA/NVA/Walk times',
    'Product options/variants with safe constraints',
    'Media: images, videos, layout diagrams + documents',
    'PPE/equipment, parts and assemblies at step or WES level',
    'Approvals and auto-reset on edits',
    'Processes and Line Planning feed Yamazumi balancing',
    'Losses recalc net time — Yamazumi highlights overloads',
    'Raise Problem / Improvement Idea directly from Yamazumi',
  ];

  return (
    <main>
      {/* HERO */}
      <section
        className="
          relative isolate overflow-hidden
          bg-[url('/StandardiziTCircle.svg')] bg-no-repeat bg-cover bg-center
        "
      >
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* text */}
            <motion.div
              variants={containerStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full bg-fuchsia-50 px-3 py-1 text-fuchsia-700 ring-1 ring-fuchsia-100"
              >
                <span className="inline-grid place-items-center size-5 rounded-md bg-fuchsia-600 text-white">
                  <ChartCandlestick className="size-3.5" />
                </span>
                Process Standardization
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="mt-4 font-bold tracking-tight leading-[1.15] md:leading-[1.05] text-[clamp(28px,7.5vw,44px)] md:text-6xl"
              >
                StandardiziT — create & approve standard processes
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-lg text-muted-foreground max-w-2xl"
              >
                From step structure to translations and approvals: one flow to create, update, and publish work standards.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                <motion.div whileHover={{ y: shouldReduce ? 0 : -2 }} whileTap={{ scale: shouldReduce ? 1 : 0.98 }}>
                  <Button asChild className="rounded-full">
                    <Link href="/book-demo">
                      Book a demo
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ y: shouldReduce ? 0 : -2 }} whileTap={{ scale: shouldReduce ? 1 : 0.98 }}>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="#features" onClick={onSeeFeaturesClick}>
                      See features
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.ul
                variants={containerStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="mt-6 grid gap-3 text-sm text-foreground/90"
              >
                {bullets.map((t) => (
                  <motion.li
                    key={t}
                    variants={fadeUp}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 text-fuchsia-600 shrink-0" />
                    <span>{t}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* visual */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: shouldReduce ? 0 : 0.6, ease: 'easeOut' }}
              className="relative aspect-[16/11] md:aspect-[4/3] rounded-2xl border bg-white/60 backdrop-blur overflow-hidden"
            >
              <Image
                src="/standardizit.svg"
                alt="standardiziT overview"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 48vw, 100vw"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔁 Переиспользуемый грид (как на других продуктах) */}
      <FeatureGrid
        heading="Simple, standardised & scalable"
        items={benefitsGrid}
        theme="fuchsia"          // фиолетовая палитра для StandardiziT
        className="bg-white"    // фон — белый
      />

      {/* FEATURES */}
      <section id="features" className="scroll-mt-24 bg-[#0e0a24] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            What StandardiziT includes
          </motion.h2>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                whileHover={{ y: shouldReduce ? 0 : -4, scale: shouldReduce ? 1 : 1.01 }}
                whileTap={{ scale: shouldReduce ? 1 : 0.995 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
                layout
              >
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      'grid place-items-center size-12 rounded-xl shrink-0 text-white shadow-md',
                      'bg-gradient-to-br',
                      f.gradient ? f.gradient : 'from-fuchsia-600 to-teal-500'
                    )}
                    aria-hidden="true"
                  >
                    <f.Icon className="size-6" strokeWidth={2} />
                  </span>

                  <div className="min-w-0">
                    <div className="text-white text-lg font-semibold leading-tight">
                      {f.title}
                    </div>
                    <div className="text-white/80 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* METRICS/CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-fuchsia-50 to-white">
        <div className="mx-auto max-w-7xl px-4">
          {/* подпись к блоку метрик */}
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="text-center font-lg font-bold tracking-wider uppercase"
          >
            Outcomes with StandardiziT
          </motion.h3>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-2 text-center text-sm text-muted-foreground max-w-2xl mx-auto"
          >
            Indicative results from customer rollouts; actual impact depends on baseline,
            process complexity, and adoption maturity.
          </motion.p>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-6 grid gap-6 md:grid-cols-3"
          >
            {[
              { Icon: Gauge,         value: '−30%', label: 'Time to update standards' },
              { Icon: ShieldCheck,   value: '100%', label: 'Version traceability' },
              { Icon: ClipboardCheck,value: '×2.0', label: 'Approval throughput' },
            ].map((m) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                whileHover={{ y: shouldReduce ? 0 : -3 }}
                className="rounded-2xl border bg-white p-6 shadow-sm flex items-center gap-4"
              >
                <span className="grid place-items-center size-12 rounded-xl bg-fuchsia-600 text-white">
                  <m.Icon className="size-6" />
                </span>
                <div>
                  <div className="text-2xl font-bold">{m.value}</div>
                  <div className="text-muted-foreground">{m.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <motion.div whileHover={{ y: shouldReduce ? 0 : -2 }} whileTap={{ scale: shouldReduce ? 1 : 0.98 }}>
              <Button asChild className="rounded-full">
                <Link href="/book-demo">
                  Request a demo
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: shouldReduce ? 0 : -2 }} whileTap={{ scale: shouldReduce ? 1 : 0.98 }}>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/products">Other products</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}