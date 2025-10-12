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
    // NEW icons for the benefits section
    Cog,
    Users,
    BookOpen,
    RefreshCw,
    Coins,
    Globe,
} from 'lucide-react';
import ProductsOverviewFlow from './components/ProductsOverviewFlow';


export default function ProductsOverviewPage() {
    // данные для секции “Empowering…”
    const benefits = [
        { Icon: Cog, text: 'Catalyst for improvement' },
        { Icon: Users, text: 'Encourages collaborative problem solving' },
        { Icon: BookOpen, text: 'Develop a shared knowledge base and gives every employee a voice' },
        { Icon: RefreshCw, text: 'Engaged workforce identifying & eliminating waste' },
        { Icon: Coins, text: 'Cost benefit decision making' },
        { Icon: Globe, text: 'Connects remote teams & aligns workforces' },
    ] as const;

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
                        className="text-4xl md:text-6xl font-bold tracking-tight"
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
                </div>
            </section>

            {/* FLOW */}
            <section className="mx-auto max-w-7xl px-4">
                <ProductsOverviewFlow />
            </section>

            {/* NEW — Empowering your team */}
            {/* NEW — Empowering your team (improved visuals) */}
            <section className="relative mx-auto max-w-7xl px-4 pt-10 md:pt-14 pb-20 md:pb-28">
                {/* декоративные орбы */}
                <div className="pointer-events-none absolute -z-10 inset-0 bg-[radial-gradient(800px_400px_at_0%_10%,rgba(124,58,237,0.10),transparent_60%),radial-gradient(900px_500px_at_100%_90%,rgba(99,102,241,0.10),transparent_60%)]" />

                <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="text-center text-3xl md:text-5xl font-extrabold tracking-tight"
                >
                    Empowering your team at every stage
                </motion.h2>

                <p className="mx-auto mt-3 max-w-3xl text-center text-muted-foreground">
                    Practical benefits your teams feel day one — from collaboration to
                    decisions and alignment.
                </p>

                <div className="mt-10 md:mt-14 grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        { Icon: Cog, text: 'Catalyst for improvement' },
                        { Icon: Users, text: 'Encourages collaborative problem solving' },
                        { Icon: BookOpen, text: 'Develop a shared knowledge base and gives every employee a voice' },
                        { Icon: RefreshCw, text: 'Engaged workforce identifying & eliminating waste' },
                        { Icon: Coins, text: 'Cost benefit decision making' },
                        { Icon: Globe, text: 'Connects remote teams & aligns workforces' },
                    ].map(({ Icon, text }, i) => (
                        <motion.div
                            key={text}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.03 }}
                            viewport={{ once: true, margin: '-80px' }}
                            className="group relative overflow-hidden rounded-2xl border border-violet-200/40 bg-white/80 backdrop-blur p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* мягкая подсветка по ховеру */}
                            <span
                                className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-gradient-to-b from-violet-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-hidden
                            />
                            <div className="flex flex-col items-center text-center">
                                <span className="grid place-items-center size-14 md:size-16 rounded-2xl text-white shadow-lg ring-1 ring-white/20 bg-gradient-to-br from-violet-600 to-indigo-500">
                                    <Icon className="size-7 md:size-8" strokeWidth={2.2} />
                                </span>
                                <div className="mt-4 text-lg md:text-xl leading-snug">
                                    {text}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}