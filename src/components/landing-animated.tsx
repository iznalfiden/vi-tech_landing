'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MainPageProductsOverviewFlow from './MainPageProductsOverviewFlow';

export default function LandingAnimated() {
  const partners: { name: string; src: string }[] = [
    { name: 'Allur', src: '/Allur_logo_red_(1).png' },
    {name: "Breen Capital", src: "/breen-logo-new-strapline-01.svg"},
    { name: 'Alstom', src: '/Alstom_logo.png' },
    { name: 'TIMET', src: '/timet _logo.png' },
  ];

  // детект iOS/WebKit → отключим motion у логотипов
  const [disableMotion, setDisableMotion] = React.useState(false);
  React.useEffect(() => {
    const ua = navigator.userAgent || '';
    const iOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (/\bMac OS X\b/.test(ua) && 'ontouchend' in document);
    setDisableMotion(iOS);
  }, []);

  const backdropClass =
    'hidden sm:block pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 ' +
    'bg-[radial-gradient(70%_70%_at_80%_50%,rgba(139,92,246,0.35),transparent_65%)]';

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

  // — карточка логотипа без Next/Image fill (минимум перерисовок)
  const LogoCard: React.FC<{ p: { name: string; src: string }; i: number }> = ({ p, i }) => {
    const card = (
      <div
        className={[
          'flex h-28 w-[260px] items-center justify-center rounded-2xl border p-6',
          'bg-white border-neutral-200', // сплошной фон и непрозрачная граница
          'transition-shadow',
          'isolate',                      // новый stacking context
          '[contain:layout_paint]',       // изоляция перерисовки
          'transform-gpu [transform:translateZ(0)] [backface-visibility:hidden]',
        ].join(' ')}
        style={{ WebkitTransform: 'translateZ(0)', WebkitBackfaceVisibility: 'hidden' }}
      >
        <img
          src={p.src}
          alt={p.name}
          width={180}   // ~ w-52
          height={64}   // ~ h-16
          loading="eager"
          decoding="sync"
          draggable={false}
          className="select-none block"
          style={{
            objectFit: 'contain',
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
      </div>
    );

    if (disableMotion) return card;

    // только fade (без translateY), чтобы не дёргать композитинг
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.25, margin: '-60px' }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 * i }}
      >
        {card}
      </motion.div>
    );
  };

  return (
    <main>
      {/* HERO */}
            {/* HERO */}
            <section
        className={[
          'relative isolate overflow-hidden',
          'min-h-[calc(100vh-80px)]',
          'supports-[height:100svh]:min-h-[calc(100svh-80px)]',
          'sm:supports-[height:100svh]:min-h-[calc(100svh-80px)]',
          'md:supports-[height:100svh]:min-h-[calc(100svh-80px)]',
          '[overflow-anchor:none] [contain:layout_paint] [overscroll-behavior:contain]',
          "after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-10 sm:after:h-12 after:bg-white",
        ].join(' ')}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="hidden sm:block absolute inset-0 -z-10 bg-contain bg-no-repeat bg-right"
          aria-hidden
        />
        <div className={backdropClass} />

        <div className="mx-auto max-w-7xl px-4 pt-24 md:pt-32 pb-16 md:pb-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2.4fr)] items-center">
            {/* Левая часть: слоган + CTA */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
                className="mt-4 text-black font-bold tracking-tight leading-[1.15] md:leading-[1.05] text-[clamp(28px,9vw,44px)] sm:text-6xl md:text-7xl"
              >
                <span className="block sm:inline">Simple,</span>{' '}
                <span className="block sm:inline">standardised,</span>{' '}
                <span className="block sm:inline">sustainable.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.16 }}
                className="mt-4 sm:mt-6 max-w-2xl text-black text-base sm:text-lg md:text-xl drop-shadow"
              >
                The possibilities for efficiency improvement in every facet of the business and its
                operations are endless. Vi-Tech brings structure, visibility and AI assistance into your
                daily workflow.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.24 }}
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <Button
                  size="lg"
                  onClick={scrollToProducts}
                  className="rounded-full cursor-pointer bg-black text-white hover:bg-black/90 border-0 shadow-md hover:shadow-lg transition-shadow"
                >
                  <a
                    href="#products"
                    onClick={scrollToProducts}
                    className="inline-flex items-center gap-2 tracking-wide"
                  >
                    EXPLORE PRODUCTS <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Правая часть: карточка про AI-инструменты */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.18 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_600px_at_0%_0%,rgba(37,99,235,0.16),transparent_55%),radial-gradient(600px_600px_at_100%_100%,rgba(147,51,234,0.22),transparent_55%)]" />

                <div className="relative p-6 sm:p-8 space-y-5">
                  <p className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" />
                    AI-integrated tools
                  </p>

                  <h2 className="text-xl sm:text-2xl font-bold text-black">
                    Let AI do the heavy lifting in your projects
                  </h2>

                  <p className="text-sm sm:text-base text-black/75">
                    Vi-Tech’s AI layer sits on top of your standard work, audits, ideas and problem
                    solving — helping your team focus on decisions, not admin.
                  </p>

                  <ul className="space-y-2 text-sm text-black/80">
                    <li>• Generate draft standardised work instructions from text and video.</li>
                    <li>• Suggest step timings and highlight bottlenecks in your process.</li>
                    <li>• Auto-link issues, ideas and audits back to the right step or option.</li>
                    <li>• Surface insights across all your projects without building reports by hand.</li>
                  </ul>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs text-black/70">
                    <div className="rounded-2xl bg-white/80 px-3 py-3 border border-black/5">
                      <div className="font-semibold">For your project work</div>
                      <div className="mt-1 text-[11px] leading-relaxed">
                        AI copilots help prepare SWCs, Yamazumi views and control plans so you can
                        move your project from idea to implementation faster.
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white/60 px-3 py-3 border border-black/5">
                      <div className="font-semibold">Inside your tools</div>
                      <div className="mt-1 text-[11px] leading-relaxed">
                        No extra apps: AI is embedded directly inside Vi-Tech modules your team already
                        uses every day.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        id="products"
        className="relative isolate overflow-hidden pt-1 pb-12 bg-[#0e0a24] scroll-mt-[88px] md:scroll-mt-[100px]"
      >
        <MainPageProductsOverviewFlow embed overline="Product flow overview" />
      </section>

      {/* PARTNERS */}
      <section
        className="mx-auto max-w-7xl px-4 my-20 isolate"
        style={{ transform: 'translateZ(0)' }}
      >
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

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 isolate"
          style={{ contain: 'layout paint', transform: 'translateZ(0)' }}
        >
          {partners.map((p, i) => (
            <LogoCard key={p.name} p={p} i={i} />
          ))}
        </div>
      </section>

      {/* VALUE PROPS */}
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
        </div>
      </section>
    </main>
  );
}