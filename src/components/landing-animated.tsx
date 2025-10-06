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
  ListChecks,
} from 'lucide-react';

export default function LandingAnimated() {
  const products = [
    { name: 'GoSeeiT', desc: 'Promotes ’Go Look & See’ Approach', href: '/products/goseeit', gradient: 'from-emerald-500 to-teal-500', Icon: Search },
    { name: 'StandardiziT', desc: 'Work Standards & SWC', href: '/products/standardizit', gradient: 'from-sky-500 to-blue-500', Icon: ListChecks },
    { name: 'ImproviT', desc: 'Structured Idea Generation & Implementation', href: '/products/improvit', gradient: 'from-amber-500 to-orange-500', Icon: Lightbulb },
    { name: 'ResolvIT', desc: 'Drives & Simplifies Standardised Problem Solving', href: '/products/resolvit', gradient: 'from-violet-600 to-purple-600', Icon: Settings },
    { name: 'MeasuriT', desc: 'Real Time Metrics and Insights', href: '/products/measurit', gradient: 'from-rose-500 to-orange-500', Icon: Gauge },
  ];

  const partners: { name: string; src: string }[] = [
    { name: 'Alstom', src: '/Alstom_logo.png' },
    { name: 'Allur', src: '/Allur_logo_red_(1).png' },
    { name: 'TIMET', src: '/timet _logo.png' },
  ];

  // Плавный скролл к секции Products с дополнительным смещением вниз,
  // чтобы нижний элемент списка был виден.
  const scrollToProducts: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    const target = document.getElementById('products');
    if (!target) return;

    const header = document.querySelector('header') as HTMLElement | null;
    const headerH = header ? header.offsetHeight : 80; // fallback
    const tuck = 1;                                     // на пиксель «поджать», чтобы не было светлой полосы
    const top =
      target.getBoundingClientRect().top + window.scrollY - (headerH - tuck);

    window.scrollTo({ top, behavior: 'smooth' });
  };


  return (
    <main>
      {/* HERO */}
      <section className="relative isolate min-h-[73vh] md:min-h-[82vh] overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0 -z-10 bg-contain bg-no-repeat bg-right md:bg-right"
          style={{ backgroundImage: "url('/hero_bg.svg')" }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(70%_70%_at_80%_50%,rgba(139,92,246,0.35),transparent_65%)]" />

        <div className="mx-auto max-w-7xl px-4 pt-24 md:pt-40 pb-20 md:pb-28">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className="font-display text-black text-5xl md:text-7xl font-bold leading-[1.05] drop-shadow-sm"
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
            className="mt-6 max-w-2xl text-black text-lg md:text-xl drop-shadow"
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

      {/* IMAGE + COPY */}


      {/* PRODUCTS LIST + IMAGE */}
      <section
        id="products"
        className=" min-h-[800px] relative isolate overflow-hidden mt-20 md:mt-28 py-16 md:py-24 bg-[#0e0a24]"
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(70%_70%_at_80%_50%,rgba(139,92,246,0.35),transparent_65%)]" />
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 md:grid-cols-2 items-start">
            <div>
              
              <ul className="mt-10 divide-y divide-white/10">
                {products.map((p, i) => (
                  <motion.li
                    key={p.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 * i }}
                    className="min-h-[96px] flex items-center"
                  >
                    <Link href={p.href} className="group flex w-full items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <span className={`grid place-items-center h-16 w-16 rounded-xl text-white bg-gradient-to-br ${p.gradient} shadow-md`}>
                          <p.Icon className="h-7 w-7" />
                        </span>
                        <div className="leading-snug">
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

      {/* PARTNERS */}
      <section className="mx-auto max-w-7xl px-4 my-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold">Working with valued partners</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl mx-auto">
            We are currently working with trusted partners across a wide range of industries, to help build efficient
            and rewarding processes through embedding Vi-Tech tools
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
    </main>
  );
}