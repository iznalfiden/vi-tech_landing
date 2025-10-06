'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function LandingAnimated() {
  return (
    <main>
      {/* Full-bleed HERO */}
      <section className="relative isolate min-h-[72vh] md:min-h-[82vh] overflow-hidden">
        {/* background image + overlays */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero_bg.svg')" }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/40 to-transparent" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-transparent to-black/10" aria-hidden />

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

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 mt-16 md:mt-24 grid gap-6 md:grid-cols-3">
        {[
          { title: 'Takt time', desc: 'Ideal/actual takt with losses considered.' },
          { title: 'Yamazumi', desc: 'Operator/line load balancing.' },
          { title: 'Loss control', desc: 'Daily tracking of downtimes and losses.' },
        ].map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.08 * i }}
            className="rounded-2xl border p-6 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur"
          >
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <motion.section
        className="mx-auto max-w-7xl px-4 mt-20 md:mt-28 text-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold">Ready to see results?</h2>
        <p className="mt-2 text-muted-foreground">Leave a request — we will contact you and show a demo.</p>
        <Button asChild className="mt-6 rounded-2xl">
          <Link href="/book-demo">Book a demo</Link>
        </Button>
      </motion.section>
    </main>
  );
}