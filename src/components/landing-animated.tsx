'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Lightbulb, Settings, Gauge, ChevronRight, ListChecks } from 'lucide-react';

export default function LandingAnimated() {
    // список продуктов (для блока "Products designed...")
    const products = [
        { name: 'GoSeeiT', desc: 'Promotes ’Go Look & See’ Approach', href: '/products/goseeit', gradient: 'from-emerald-500 to-teal-500', Icon: Search },
        { name: 'StandardiziT', desc: 'Work Standards & SWC', href: '/products/standardizit', gradient: 'from-sky-500 to-blue-500', Icon: ListChecks },
        { name: 'ImproviT', desc: 'Structured Idea Generation & Implementation', href: '/products/improvit', gradient: 'from-amber-500 to-orange-500', Icon: Lightbulb },
        { name: 'ResolvIT', desc: 'Drives & Simplifies Standardised Problem Solving', href: '/products/resolvit', gradient: 'from-violet-600 to-purple-600', Icon: Settings },
        { name: 'MeasuriT', desc: 'Real Time Metrics and Insights', href: '/products/measurit', gradient: 'from-rose-500 to-orange-500', Icon: Gauge },
    ];

    // партнёры (положи логотипы в /public/partners/)
    const partners: { name: string; src: string; w?: number; h?: number }[] = [
        { name: 'Partner One', src: '/alstom.png', w: 140, h: 40 },
        { name: 'Partner Two', src: '/timet.png', w: 140, h: 40 },
    ];

    return (
        <main>
            {/* Full-bleed HERO */}
            <section className="relative isolate min-h-[72vh] md:min-h-[82vh] overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute inset-0 -z-10 bg-contain bg-no-repeat bg-right md:bg-right"
                    style={{ backgroundImage: "url('/hero_bg.svg')" }}
                    aria-hidden
                />
                {/* тёмно-синие оверлеи (brand navy) */}
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            'linear-gradient(to right, var(--brand-navy) 0%, color-mix(in oklab, var(--brand-navy) 45%, transparent) 50%, transparent 100%)',
                    }}
                    aria-hidden
                />
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            'linear-gradient(to bottom, color-mix(in oklab, var(--brand-navy) 25%, transparent) 0%, transparent 60%, color-mix(in oklab, var(--brand-navy) 10%, transparent) 100%)',
                    }}
                    aria-hidden
                />

                {/* content */}
                <div className="mx-auto max-w-7xl px-4 pt-24 md:pt-40 pb-20 md:pb-28">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
                        className="font-display text-white text-5xl md:text-7xl font-bold leading-[1.05] drop-shadow-sm"
                    >
                        Simple,
                        <br className="hidden sm:block" />
                        standardised,
                        <br className="hidden sm:block" />
                        sustainable
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
                        className="mt-6 max-w-2xl text-white/85 text-lg md:text-xl drop-shadow"
                    >
                        The possibilities for efficiency improvement in every facet of the business and its operations are endless.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.25 }}
                        className="mt-8"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="rounded-full bg-white text-black hover:bg-white/90 border-0 shadow-md hover:shadow-lg transition-shadow"
                        >
                            <Link href="/products" className="inline-flex items-center gap-2 tracking-wide">
                                EXPLORE PRODUCTS <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Feature → Image + copy */}
            <section className="mx-auto max-w-7xl px-4 mt-16 md:mt-24">
                <div className="grid gap-8 md:grid-cols-2 items-center">
                    {/* Left: illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="relative aspect-[16/11] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-sm"
                    >
                        <Image
                            src="/main_page_1.svg"
                            alt="Vi-Tech tools in action"
                            fill
                            sizes="(min-width: 1024px) 48vw, 100vw"
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Right: copy */}
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
                    >
                        <h2 className="font-display text-3xl md:text-4xl font-bold">
                            Tools developed to empower you and your team
                        </h2>
                        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                            We specialise in world-class software that understands today’s business requirements but more importantly their future needs. Book a demo today and find out how Vi-Tech tools can work for you.
                        </p>

                        <div className="mt-6">
                            <Button asChild className="rounded-2xl">
                                <Link href="/book-demo">Book a demo</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Products list + illustration справа */}
            <section className="relative isolate overflow-hidden mt-20 md:mt-28 py-16 md:py-24 bg-[#0e0a24]">
                <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(70%_70%_at_80%_50%,rgba(139,92,246,0.35),transparent_65%)]" />
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid gap-10 md:grid-cols-2 items-start">
                        {/* Left: title + list */}
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                className="font-display text-white text-4xl md:text-5xl font-bold leading-tight"
                            >
                                Products designed to support
                                <br /> you at every step
                            </motion.h2>

                            <ul className="mt-10 divide-y divide-white/10">
                                {products.map((p, i) => (
                                    <motion.li
                                        key={p.name}
                                        initial={{ opacity: 0, y: 8 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-80px' }}
                                        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 * i }}
                                        className="py-6"
                                    >
                                        <Link href={p.href} className="group flex items-center justify-between gap-6">
                                            <div className="flex items-center gap-4">
                                                <span className={`grid place-items-center h-16 w-16 rounded-xl text-white bg-gradient-to-br ${p.gradient} shadow-md`}>
                                                    <p.Icon className="h-7 w-7" />
                                                </span>
                                                <div>
                                                    <div className="text-2xl font-semibold text-white">{p.name}</div>
                                                    <div className="text-white/75">{p.desc}</div>
                                                </div>
                                            </div>
                                            <ChevronRight className="h-6 w-6 text-white/70 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: illustration */}
                        <motion.div
                            initial={{ opacity: 0, x: 16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="relative aspect-[16/11] md:aspect-[4/3] rounded-2xl overflow-hidden"
                        >
                            <Image
                                src="/main_page_1.svg"
                                alt="Vi-Tech product suite"
                                fill
                                sizes="(min-width: 1024px) 48vw, 100vw"
                                className="object-contain"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Working with valued partners */}
            <section className="mx-auto max-w-7xl px-4 my-20">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center"
                >
                    <h2 className="font-display text-3xl md:text-4xl font-bold">
                        Working with valued partners
                    </h2>
                    <p className="mt-3 text-muted-foreground max-w-3xl mx-auto">
                        We are currently working with trusted partners across a wide range of industries,
                        to help build efficient and rewarding processes through embedding Vi-Tech tools
                    </p>
                </motion.div>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                    {partners.map((p, i) => (
                        <motion.div
                            key={p.name}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 * i }}
                            className="flex h-24 w-[220px] items-center justify-center rounded-2xl border bg-white/70 p-4 backdrop-blur hover:shadow-sm transition"
                        >
                            {/* фиксированный бокс + object-contain */}
                            <div className="relative h-12 w-40 sm:h-14 sm:w-48">
                                <Image
                                    src={p.src}
                                    alt={p.name}
                                    fill
                                    sizes="160px"            // можно увеличить при необходимости
                                    className="object-contain"
                                    priority={false}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>


        </main>
    );
}