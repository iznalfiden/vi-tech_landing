'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Search,
    Lightbulb,
    Settings,
    Gauge,
    ChevronRight,
    ChartCandlestick,
} from 'lucide-react';

export default function LandingAnimated() {
    const products = [
        { name: 'GoSeeiT', desc: 'Promotes ’Go Look & See’ Approach', href: '/products/goseeit', gradient: 'bg-emerald-500', Icon: Search },
        { name: 'StandardiziT', desc: 'Work Standards & SWC', href: '/products/standardizit', gradient: 'bg-fuchsia-600', Icon: ChartCandlestick },
        { name: 'ImproviT', desc: 'Structured Idea Generation & Implementation', href: '/products/improvit', gradient: 'from-amber-500 to-orange-500', Icon: Lightbulb },
        { name: 'ResolvIT', desc: 'Drives & Simplifies Standardised Problem Solving (AI Powered)', href: '/products/resolvit', gradient: 'from-violet-600 to-purple-600', Icon: Settings },
    ];

    const partners: { name: string; src: string }[] = [
        { name: 'Alstom', src: '/Alstom_logo.png' },
        { name: 'Allur', src: '/Allur_logo_red_(1).png' },
        { name: 'TIMET', src: '/timet _logo.png' },
    ];

    // плавный скролл к секции Products с небольшим «прижимом»
    const scrollToProducts = (e: React.MouseEvent) => {
        e.preventDefault();
        const target = document.getElementById('products');
        if (!target) return;
        const header = document.querySelector('header') as HTMLElement | null;
        const headerH = header ? header.offsetHeight : 80;
        const tuck = 1;
        const top = target.getBoundingClientRect().top + window.scrollY - (headerH - tuck);
        window.scrollTo({ top, behavior: 'smooth' });
    };

    return (
        <main>
            {/* HERO (мобайл — без сложных фонов) */}
            <section className="
    relative isolate overflow-hidden
    min-h-[calc(100dvh-80px)] md:min-h-[calc(100svh-80px)]
    after:content-[''] after:absolute after:inset-x-0 after:bottom-0
    after:h-10 sm:after:h-12 after:bg-white
  ">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="hidden sm:block absolute inset-0 -z-10 bg-contain bg-no-repeat bg-right"
                    aria-hidden
                />
                <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(70%_70%_at_80%_50%,rgba(139,92,246,0.35),transparent_65%)]" />

                <div className="mx-auto max-w-7xl px-4 pt-28 md:pt-40 pb-20 md:pb-28">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
                        className="text-black font-bold tracking-tight leading-[1.15] md:leading-[1.05] text-[clamp(28px,9vw,44px)] sm:text-6xl md:text-7xl"
                    >
                        <span className="block sm:inline">Simple,</span>{' '}
                        <span className="block sm:inline">standardised,</span>{' '}
                        <span className="block sm:inline">sustainable.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
                        className="mt-4 sm:mt-6 max-w-2xl text-black text-base sm:text-lg md:text-xl drop-shadow"
                    >
                        The possibilities for efficiency improvement in every facet of the business and its operations are endless.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.25 }}
                        className="mt-6 sm:mt-8"
                    >
                        <Button
                            size="lg"
                            onClick={scrollToProducts}
                            className="rounded-full cursor-pointer bg-white text-black hover:bg-white/90 border-0 shadow-md hover:shadow-lg transition-shadow"
                        >
                            <a href="#products" onClick={scrollToProducts} className="inline-flex items-center gap-2 tracking-wide">
                                EXPLORE PRODUCTS <ArrowRight className="h-4 w-4" />
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* PRODUCTS LIST + IMAGE */}
            {/* PRODUCTS LIST + IMAGE */}
            <section
                id="products"
                className="relative isolate overflow-hidden py-24 md:py-36 lg:py-40 bg-[#0e0a24] scroll-mt-[88px] md:scroll-mt-[100px]"
            >
                <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(70%_70%_at_80%_50%,rgba(139,92,246,0.35),transparent_65%)]" />
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid gap-10 md:grid-cols-2 items-start">
                        <div>
                            <ul className="mt-2 md:mt-4 divide-y divide-white/10">
                                {products.map((p, i) => (
                                    <motion.li
                                        key={p.name}
                                        initial={{ opacity: 0, y: 8 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-80px' }}
                                        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 * i }}
                                        className="min-h-[88px] md:min-h-[96px] flex items-center"
                                    >
                                        <Link href={p.href} className="group flex w-full items-center justify-between gap-6">
                                            <div className="flex items-center gap-4">
                                                <span
                                                    className={`grid place-items-center size-14 md:size-16 rounded-2xl shrink-0 bg-gradient-to-br ${p.gradient} text-white shadow-md`}
                                                    aria-hidden="true"
                                                >
                                                    <p.Icon className="size-6 md:size-8" strokeWidth={2} />
                                                </span>
                                                <div className="leading-snug">
                                                    <div className="text-xl md:text-2xl font-semibold text-white">{p.name}</div>
                                                    <div className="text-white/75 text-sm md:text-base">{p.desc}</div>
                                                </div>
                                            </div>
                                            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-white/70 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="relative rounded-2xl overflow-hidden min-h-[260px] md:min-h-[380px]"
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

            {/* PARTNERS */}
            <section className="mx-auto max-w-7xl px-4 my-20">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold">Working with valued partners</h2>
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
                            className="flex h-28 w-[260px] items-center justify-center rounded-2xl border bg-white/70 p-6 backdrop-blur hover:shadow-sm transition"
                        >
                            <div className="relative h-14 w-44 sm:h-16 sm:w-52">
                                <Image src={p.src} alt={p.name} fill sizes="200px" className="object-contain" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* VALUE PROPS (ниже партнёров) */}
            {/* VALUE PROPS (ниже партнёров) — 4 колонки в ряд */}
            <section className="relative isolate overflow-hidden bg-[#0e0a24] py-16 md:py-24">
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_95%_-120px,rgba(139,92,246,0.20),transparent_60%),radial-gradient(900px_500px_at_-120px_120%,rgba(37,99,235,0.16),transparent_60%)]" />

                <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
                        className="h-full"
                    >
                        <h3 className="text-white font-extrabold text-2xl md:text-3xl">
                            Suitable for all business
                        </h3>
                        <p className="mt-4 text-white/85 text-lg leading-relaxed">
                            Vi-Tech software can be embedded
                            across a multitude of industries including Construction, Manufacturing, Service &amp; Maintenance,
                            Healthcare, FMCG, Transactional, Mining, Oil &amp; Gas.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
                        className="h-full"
                    >
                        <h3 className="text-white font-extrabold text-2xl md:text-3xl">
                            Tailored to serve you best
                        </h3>
                        <p className="mt-4 text-white/85 text-lg leading-relaxed">
                            The Vi-Tech suite can be adapted to collaborate with 3rd-party applications.
                            We’re always happy to discuss bespoke solutions to suit your needs.
                        </p>
                    </motion.div>
                    {/* 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full"
                    >
                        <h3 className="text-white font-extrabold text-2xl md:text-3xl">
                            Embedded in your work flow
                        </h3>
                        <p className="mt-4 text-white/85 text-lg leading-relaxed">
                            We partner with your existing team and tools to ensure the seamless integration and
                            evolution of Vi-Tech products throughout your work flow.
                        </p>
                    </motion.div>

                    {/* 2 */}


                    {/* 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                        className="h-full"
                    >
                        <h3 className="text-white font-extrabold text-2xl md:text-3xl">
                            There when you need us
                        </h3>
                        <p className="mt-4 text-white/85 text-lg leading-relaxed">
                            Our support team are always on hand to help you get the most out of Vi-Tech tools,
                            allowing you to focus on the important stuff.
                        </p>
                    </motion.div>

                    {/* 4 — новый текст */}

                </div>
            </section>
        </main>
    );
}