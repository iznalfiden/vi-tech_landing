// app/products/goseeit/GoSeeiTClient.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import {
  Search as SearchIcon,
  Users,
  Gauge,
  CheckCircle2,
  Radar,
  ArrowRight,
  Layers,
  CalendarDays,
  FileText,
  Mail,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  ClipboardList,
  GitBranch,
  KeyRound,
  PenLine,
  Database,
} from 'lucide-react';

// 🔹 добавили переиспользуемый компонент
import FeatureGrid, { type FeatureGridItem } from '@/components/FeatureGrid';

type FeatureItem = {
  title: string;
  desc: string;
  Icon: LucideIcon;
  pillClass?: string;
};

type HeroBullet = {
  text: string;
  Icon?: LucideIcon;
  pillClass?: string;
};

export default function GoSeeiTClient() {
  const features: FeatureItem[] = [
    { title: 'Templates & versioning', desc: 'Publish signed-off templates as “latest”; previous versions auto-archive on sign-off.', Icon: Layers },
    { title: 'Scheduling: Standard & Tiered', desc: 'Role-based assignees, time slots and D/W/M/Q/Y frequency — or tiered round-robin by team levels.', Icon: CalendarDays },
    { title: 'Evidence in answers', desc: 'Attach photos, documents and videos; resubmissions preserve kept attachments.', Icon: FileText },
    { title: 'Approvals & quorum', desc: 'Countersigners approve or reject; full quorum auto-finalizes the run.', Icon: ShieldCheck },
    { title: 'My calendar', desc: 'Personal list of occurrences with statuses and deep links to runs.', Icon: Users },
    { title: 'Notifications', desc: 'Emails to approvers and assignees with deep links and de-duplication.', Icon: Mail },
    { title: 'Raise Problem', desc: 'Escalate a finding into a Problem Case with its own reference and follow-up tracking.', Icon: AlertTriangle, pillClass: 'bg-gradient-to-br from-violet-600 to-purple-600' },
    { title: 'Improvement Idea', desc: 'Capture ideas during or outside a run and convert them into actions later.', Icon: Lightbulb, pillClass: 'bg-gradient-to-br from-amber-500 to-orange-500' },
  ];

  const heroBullets: HeroBullet[] = [
    { text: 'Templates with versioning & sign-off' },
    { text: 'Standard & Tiered scheduling with preview' },
    { text: 'Evidence: photos, documents & videos' },
    { text: 'Raise Problem: escalate a finding into a Problem Case with its own tracking', Icon: AlertTriangle, pillClass: 'bg-gradient-to-br from-violet-600 to-purple-600' },
    { text: 'Improvement Idea: capture ideas and convert them into actions later', Icon: Lightbulb, pillClass: 'bg-gradient-to-br from-amber-500 to-orange-500' },
  ];

  // 🔹 данные для FeatureGrid (бывший benefits)
  const benefitsGrid: FeatureGridItem[] = [
    { Icon: ClipboardList, title: 'Workplace audits managed to desired frequency by role' },
    { Icon: Layers,        title: 'Promotes tiered audits, ensuring knowledge transfer' },
    { Icon: GitBranch,     title: 'Develops detailed process understanding for all' },
    { Icon: PenLine,       title: 'Not generic but specific to your business' },
    { Icon: KeyRound,      title: 'Feeds the improvement tools directly for ownership' },
    { Icon: Database,      title: 'Robust traceability of all actions back to their source' },
  ];

  // helper для однотипного fade-up
  const mk = (delay = 0) => ({
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' as const },
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
  });

  const onSeeFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('features');
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    if (history.pushState) history.pushState(null, '', '#features');
  };

  return (
    <main>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[url('/GoSeeItCircle.svg')] bg-no-repeat bg-cover bg-top">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* text */}
            <div>
              <motion.span
                {...mk(0.02)}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-100"
              >
                <span className="inline-grid place-items-center size-5 rounded-md bg-emerald-600 text-white">
                  <SearchIcon className="size-3.5" />
                </span>
                Workplace Audit
              </motion.span>

              <motion.h1
                {...mk(0.06)}
                className="mt-4 font-bold tracking-tight leading-[1.15] md:leading-[1.05] text-[clamp(28px,7.5vw,44px)] md:text-6xl"
              >
                GoSeeiT — templates, schedules, evidence & approvals
              </motion.h1>

              <motion.p
                {...mk(0.12)}
                className="mt-4 text-lg text-muted-foreground max-w-2xl"
              >
                From signed-off templates to scheduled runs: capture evidence (photos/docs/videos),
                submit for approval with quorum, and track everything in one place.
              </motion.p>

              <motion.div {...mk(0.18)} className="mt-6 flex flex-wrap items-center gap-3">
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

              <ul className="mt-6 grid gap-3 text-sm text-foreground/90">
                {heroBullets.map((b, i) => (
                  <motion.li key={b.text} {...mk(0.1 + i * 0.05)} className="flex items-center gap-2">
                    {b.pillClass ? (
                      <span
                        className={cn(
                          'mt-0.5 grid place-items-center size-6 rounded-md text-white shrink-0',
                          b.pillClass
                        )}
                        aria-hidden="true"
                      >
                        {b.Icon ? <b.Icon className="size-3.5" strokeWidth={2.5} /> : null}
                      </span>
                    ) : (
                      <CheckCircle2 className="mt-0.5 size-4 text-emerald-600 shrink-0" />
                    )}
                    <span>{b.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* visual */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative aspect-[16/11] md:aspect-[4/3] rounded-2xl border bg-white/60 backdrop-blur overflow-hidden"
            >
              <Image
                src="/goseeit.svg"
                alt="GoSeeiT overview"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 48vw, 100vw"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔁 Переиспользуемый грид вместо старого BENEFITS */}
      <FeatureGrid
        heading="Simple, structured & highly effective"
        items={benefitsGrid}
        theme="emerald"           // зелёная палитра для GoSeeiT
        className="bg-white"      // фон блока — белый
      />

      {/* FEATURES */}
      <section id="features" className="scroll-mt-24 bg-[#0e0a24] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2 {...mk()} className="text-2xl md:text-3xl font-bold text-white">
            What GoSeeiT includes
          </motion.h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.03 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      'grid place-items-center size-12 rounded-xl shrink-0 text-white shadow-md',
                      f.pillClass ?? 'bg-gradient-to-br from-emerald-600 to-teal-500'
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
          </div>
        </div>
      </section>

      {/* METRICS/CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-7xl px-4">
          <motion.h3 {...mk()} className="text-center font-lg font-bold tracking-wider uppercase">
            Outcomes with GoSeeiT
          </motion.h3>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              { Icon: Radar, value: '−35%', label: 'Time to identify issues' },
              { Icon: Gauge, value: '×2.1', label: 'Action closure speed' },
              { Icon: CheckCircle2, value: '95%', label: 'Verified fixes' },
            ].map((m, i) => (
              <motion.div
                key={i}
                {...mk(i * 0.05)}
                className="rounded-2xl border bg-white p-6 shadow-sm flex items-center gap-4"
              >
                <span className="grid place-items-center size-12 rounded-xl bg-emerald-600 text-white">
                  <m.Icon className="size-6" />
                </span>
                <div>
                  <div className="text-2xl font-bold">{m.value}</div>
                  <div className="text-muted-foreground">{m.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...mk(0.15)} className="mt-8 flex flex-wrap items-center gap-3">
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