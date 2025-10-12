// app/products/resolvit/ResolvITClient.tsx
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
    Link2,
    FileText,
    ClipboardCheck,
    ShieldCheck,
    Gauge,
    CheckCircle2,
    Layers,
    Lightbulb,
    Target,
    Mail,
    Bot,
    GitBranch,
    Handshake,
    LineChart,
    Settings,
    Users,
} from 'lucide-react';
import FeatureGrid, { FeatureGridItem } from '@/components/FeatureGrid';

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

const integratedItems: FeatureGridItem[] = [
    { Icon: GitBranch, title: 'Drives & simplifies standardised problem solving' },
    { Icon: Settings, title: 'Enables robust management of all problems within the business' },
    { Icon: LineChart, title: 'Links all problems to a recorded metric for analysis' },
    { Icon: Lightbulb, title: 'Creates a shared knowledge base for all solutions' },
    { Icon: Handshake, title: 'Encourages collaboration and collective problem solving' },
    { Icon: Users, title: 'Connects remote teams & aligns workforces' },
];

export default function ResolvITClient() {
    const shouldReduce = useReducedMotion();

    // ✨ variants (same pattern as the StandardiziT example)
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
            title: 'Intake & linking',
            desc:
                'Raise a Problem from GoSeeiT findings, Yamazumi balancing, Takt Config, or ad-hoc. Keep full source context and deep links.',
            Icon: Link2,
            gradient: 'from-violet-600 to-purple-600',
        },
        {
            title: 'Root cause (JDI / 8D / 5 Whys)',
            desc:
                'Work through structured analysis. Attach photos, documents, and references to evidence right in the case.',
            Icon: FileText,
            gradient: 'from-violet-600 to-purple-600',
        },
        {
            title: 'Lean Coach (AI)',
            desc:
                'Context-aware assistant: suggests next stage, validates required fields, drafts 4W1H/Fishbone text, proposes KPIs, and finds similar cases.',
            Icon: Bot,
            gradient: 'from-violet-600 to-purple-600',
        },
        {
            title: 'Countermeasures & actions',
            desc:
                'Owners, due dates, SLAs, and reminders. Track on-time completion and verification of effectiveness.',
            Icon: ClipboardCheck,
            gradient: 'from-violet-600 to-purple-600',
        },
        {
            title: 'Approvals & stage gates',
            desc:
                'D-stages and sign-offs per policy. Clear status, rejections with comments, and full audit trail.',
            Icon: ShieldCheck,
            gradient: 'from-violet-600 to-purple-600',
        },
        {
            title: 'Update the standard',
            desc:
                'When a fix changes the method, trigger a StandardiziT update and link the case to the new version.',
            Icon: Layers,
            gradient: 'from-violet-600 to-purple-600',
        },
        {
            title: 'Notifications',
            desc:
                'Email alerts with deep links for assignees and approvers. Noise-reduced deduplication.',
            Icon: Mail,
            gradient: "from-violet-600 to-purple-600"
        },
        {
            title: 'Improvement Idea',
            desc:
                'Capture an idea during analysis or from the floor; groom later and convert into actions or a Problem.',
            Icon: Lightbulb,
            gradient: 'from-amber-500 to-orange-500',
        },
    ];

    const heroBullets: HeroBullet[] = [
        { text: 'Structured JDI/8D with evidence' },
        { text: 'Lean Coach: guided steps & checks' },
        { text: 'Actions with owners, due dates & SLAs' },
        { text: 'Approvals, stage gates & audit trail' },
        {
            text: 'Improvement Idea pipeline & conversion to actions',
            Icon: Lightbulb,
            pillClass: 'bg-gradient-to-br from-amber-500 to-orange-500',
        },
    ];

    const onSeeFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const el = document.getElementById('features');
        if (!el) return;
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        if (history.pushState) history.pushState(null, '', '#features');
    };

    const steps = [
        { title: 'Raise / Intake', desc: 'Create a case or spin off from GoSeeiT, StandardiziT.' },
        { title: 'Analyze root cause', desc: 'JDI/8D.' },
        { title: 'Plan countermeasures', desc: 'Define actions, owners, deadlines, and SLAs.' },
        { title: 'Implement & verify', desc: 'Track completion and effectiveness; request approvals where required.' },
        { title: 'Update the standard', desc: 'If method changed, trigger a StandardiziT update and link versions.' },
        { title: 'Close & learn', desc: 'Prevent recurrence; mark learnings and feed metrics.' },
    ] as const;

    // helper for compact tool chips (visible tags with optional tooltip)
    const ToolTag = ({ children, title }: { children: React.ReactNode; title?: string }) => (
        <span
            title={title}
            className="inline-flex items-center rounded-md bg-violet-50 text-violet-700 ring-1 ring-violet-100 px-2 py-0.5 text-[11px] leading-5"
        >
            {children}
        </span>
    );

    return (
        <main>
            <section
                className="
    relative isolate overflow-hidden
    bg-[url('/ReolviTCircle.svg')] bg-no-repeat bg-cover bg-top
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
                                className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-violet-700 ring-1 ring-fuchsia-100"
                            >
                                <span className="inline-grid place-items-center size-5 rounded-md bg-violet-600 text-white">
                                    <Target className="size-3.5" />
                                </span>
                                Problem Solving
                            </motion.span>

                            <motion.h1
                                variants={fadeUp}
                                className="mt-4 font-bold tracking-tight leading-[1.15] md:leading-[1.05] text-[clamp(28px,7.5vw,44px)] md:text-6xl"
                            >
                                ResolvIT — structured problem solving & action tracking
                            </motion.h1>

                            <motion.p variants={fadeUp} className="mt-4 text-lg text-muted-foreground max-w-2xl">
                                ResolviT takes the pain out of managing the Problem Solving process by embedding world class tools and
                                techniques within its standardised digital format enabling Problem Solving teams to work in a structured
                                and results driven manner
                            </motion.p>

                            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
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
                                {heroBullets.map((b) => (
                                    <motion.li key={b.text} variants={fadeUp} className="flex items-center gap-2">
                                        {b.pillClass ? (
                                            <span
                                                className={cn('mt-0.5 grid place-items-center size-6 rounded-md text-white shrink-0', b.pillClass)}
                                                aria-hidden="true"
                                            >
                                                {b.Icon ? <b.Icon className="size-3.5" strokeWidth={2.5} /> : null}
                                            </span>
                                        ) : (
                                            <CheckCircle2 className="mt-0.5 size-4 text-violet-600 shrink-0" />
                                        )}
                                        <span>{b.text}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="relative aspect-[16/11] md:aspect-[4/3] rounded-2xl border bg-white/60 backdrop-blur overflow-hidden"
                        >
                            <Image
                                src="/resolvit.svg"
                                alt="Resolvit overview"
                                fill
                                className="object-contain"
                                sizes="(min-width: 1024px) 48vw, 100vw"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <FeatureGrid
                id="integrated"
                heading="Integrated Problem Solving"
                items={integratedItems}
                theme="violet"
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
                        What ResolvIT includes
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
                                            f.gradient ? f.gradient : 'from-violet-600 to-purple-600'
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

            {/* HOW IT WORKS */}
            <section className="py-12 md:py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-2xl md:text-3xl font-bold"
                    >
                        How it works
                    </motion.h2>

                    <motion.ol
                        variants={containerStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch [grid-auto-rows:minmax(180px,1fr)]"
                    >
                        {steps.map((s, i) => (
                            <motion.li
                                key={s.title}
                                variants={fadeUp}
                                className="rounded-2xl border bg-white p-4 shadow-sm h-full flex"
                            >
                                <div className="flex items-start gap-3 w-full">
                                    <span className="grid place-items-center size-9 rounded-lg bg-violet-600 text-white font-semibold shrink-0">
                                        {i + 1}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-semibold">{s.title}</div>
                                        <div className="text-muted-foreground text-sm leading-relaxed">
                                            {s.desc}
                                        </div>

                                        {/* contextual tags per step */}
                                        {s.title === 'Raise / Intake' && (
                                            <div className="mt-2 flex flex-wrap gap-1.5">
                                                <ToolTag title="Create a case from apps or manually">GoSeeiT</ToolTag>
                                                <ToolTag>StandardiziT</ToolTag>
                                                <ToolTag>Yamazumi</ToolTag>
                                                <ToolTag title="Auto-numbering, project, source">Auto-ref & project</ToolTag>
                                                <ToolTag title="If the problem is complex — upgrade to 8D in one click">Upgrade to 8D</ToolTag>
                                            </div>
                                        )}

                                        {s.title === 'Analyze root cause' && (
                                            <div className="mt-2 flex flex-wrap gap-1.5">
                                                <ToolTag title="What / Where / When / Who / How">4W1H</ToolTag>
                                                <ToolTag title="Ishikawa diagram">Fishbone</ToolTag>
                                                <ToolTag>5 Whys</ToolTag>
                                                <ToolTag title="AI: improve description text">Improve text</ToolTag>
                                                <ToolTag title="AI: find similar cases (embeddings)">AI similar</ToolTag>
                                                <ToolTag title="Generate KPI from metric & description">KPI generator</ToolTag>
                                                <ToolTag title="Contextual assistant: suggests steps, drafts 4W1H/Fishbone/KPIs, finds similar cases">
                                                    Lean Coach
                                                </ToolTag>
                                            </div>
                                        )}

                                        {s.title === 'Plan countermeasures' && (
                                            <div className="mt-2 flex flex-wrap gap-1.5">
                                                <ToolTag>Owners & SLAs</ToolTag>
                                                <ToolTag title="Stage gates with validations">Stage gates (D-stages)</ToolTag>
                                                <ToolTag title="Escalation across company tiers">Tier controls</ToolTag>
                                                <ToolTag title="Auto progress when required fields are done">Auto status</ToolTag>
                                                <ToolTag title="Suggests owners/due dates; checks required fields">
                                                    Lean Coach
                                                </ToolTag>
                                            </div>
                                        )}

                                        {s.title === 'Implement & verify' && (
                                            <div className="mt-2 flex flex-wrap gap-1.5">
                                                <ToolTag title="Emails with deep links for assignees/approvers">Email alerts</ToolTag>
                                                <ToolTag title="Photos/files/documents as evidence">Evidence</ToolTag>
                                                <ToolTag title="SLA tracking by business days">SLA tracking</ToolTag>
                                                <ToolTag title="Links: CA ↔ Containment (validations in D6/D7)">Dependencies</ToolTag>
                                                <ToolTag title="Suggests effectiveness checks and notification copy">
                                                    Lean Coach
                                                </ToolTag>
                                            </div>
                                        )}

                                        {s.title === 'Update the standard' && (
                                            <div className="mt-2 flex flex-wrap gap-1.5">
                                                <ToolTag title="Create a change in the standard and link to the case">StandardiziT link</ToolTag>
                                                <ToolTag>Version traceability</ToolTag>
                                            </div>
                                        )}

                                        {s.title === 'Close & learn' && (
                                            <div className="mt-2 flex flex-wrap gap-1.5">
                                                <ToolTag title="Final 8D stage">D8 closure</ToolTag>
                                                <ToolTag>Lessons learned</ToolTag>
                                                <ToolTag title="Free navigation after D8">Free navigation</ToolTag>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.li>
                        ))}
                    </motion.ol>
                </div>
            </section>

            {/* METRICS/CTA */}
            <section className="py-12 md:py-16 bg-gradient-to-b from-violet-50 to-white">
                <div className="mx-auto max-w-7xl px-4">
                    <motion.div
                        variants={containerStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid gap-6 md:grid-cols-3"
                    >
                        {[
                            { Icon: Gauge, value: '−35%', label: 'Mean time to resolve (MTTR)' },
                            { Icon: CheckCircle2, value: '×1.8', label: 'On-time action completion' },
                            { Icon: ShieldCheck, value: '−40%', label: 'Issue recurrence' },
                        ].map((m) => (
                            <motion.div
                                key={m.label}
                                variants={fadeUp}
                                whileHover={{ y: shouldReduce ? 0 : -3 }}
                                className="rounded-2xl border bg-white p-6 shadow-sm flex items-center gap-4"
                            >
                                <span className="grid place-items-center size-12 rounded-xl bg-violet-600 text-white">
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