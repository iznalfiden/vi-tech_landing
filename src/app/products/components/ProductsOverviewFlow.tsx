// app/products/overview/page.tsx  (фрагмент секции с flow)
'use client';

import Link from 'next/link';
import { motion, easeOut } from 'framer-motion';
import { ArrowRight, Search, Settings, Lightbulb, ChartCandlestick } from 'lucide-react';

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-grid place-items-center h-8 w-8 rounded-xl bg-violet-600 text-white shadow-sm">
    {children}
  </span>
);

const CirclePreview = ({
  bg,
  pill,
}: {
  bg: string; // url('/...') или tailwind gradient
  pill: React.ReactNode;
}) => (
  <div className="relative mx-auto">
    <div
      className="h-44 w-44 md:h-56 md:w-56 rounded-full bg-center bg-cover ring-4 ring-white/80 shadow-xl"
      style={{ backgroundImage: bg.startsWith('url(') ? bg : undefined }}
    >
      {/* если хочешь градиент вместо картинки: className дополни bg-gradient-to-br ... */}
    </div>
    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">{pill}</div>
  </div>
);

const Learn = ({ href }: { href: string }) => (
  <Link
    href={href}
    className="mt-3 inline-flex items-center gap-2 font-semibold tracking-wide uppercase text-[#120b2b] hover:opacity-80"
  >
    Learn more <ArrowRight className="h-4 w-4" />
  </Link>
);

export default function ProductsOverviewFlow() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="grid gap-16 md:grid-cols-2">
        {/* LEFT COLUMN — 1) StandardiziT  2) GoSeeiT */}
        <div className="flex flex-col gap-16">
          {/* StandardiziT */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="text-center"
          >
            <CirclePreview
              bg={"url('/main_page_1.svg')"}
              pill={
                <Pill>
                  <ChartCandlestick className="h-4 w-4" />
                </Pill>
              }
            />
            <h3 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#120b2b]">StandardiziT</h3>
            <p className="mt-2 text-base md:text-lg text-[#120b2b]/70">
              Work Standards &amp; Standard Work Combination (SWC)
            </p>
            <Learn href="/products/standardizit" />
          </motion.article>

          {/* GoSeeiT */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.05 }}
            className="text-center"
          >
            <CirclePreview
              bg={"url('/main_page_1.svg')"}
              pill={
                <Pill>
                  <Search className="h-4 w-4" />
                </Pill>
              }
            />
            <h3 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#120b2b]">GoSeeiT</h3>
            <p className="mt-2 text-base md:text-lg text-[#120b2b]/70">
              Promotes ‘Go Look &amp; See’ Approach
            </p>
            <Learn href="/products/goseeit" />
          </motion.article>
        </div>

        {/* RIGHT COLUMN — вертикальная линия + Resolvit, ImprovIT */}
        <div className="relative pl-10 md:pl-14">
          {/* вертикальная линия */}
          <span className="pointer-events-none absolute left-2 md:left-4 top-0 bottom-0 w-[3px] bg-[#120b2b]" />

          {/* стрелка → (сверху) */}
          <ArrowRight className="pointer-events-none absolute -left-1 md:-left-0 top-20 h-7 w-7 text-[#120b2b]" />

          {/* Resolvit */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="text-center"
          >
            <CirclePreview
              bg={"url('/main_page_1.svg')"}
              pill={
                <Pill>
                  <Settings className="h-4 w-4" />
                </Pill>
              }
            />
            <h3 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#120b2b]">Resolvit</h3>
            <p className="mt-2 text-base md:text-lg text-[#120b2b]/70">
              Drives &amp; Simplifies Standardised Problem Solving
            </p>
            <Learn href="/products/resolvit" />
          </motion.article>

          {/* стрелка вниз на линии */}
          <ArrowRight className="pointer-events-none absolute -left-1 md:-left-0 top-1/2 rotate-90 h-7 w-7 text-[#120b2b]" />

          {/* ImprovIT */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="mt-14 text-center"
          >
            <CirclePreview
              bg={"url('/main_page_1.svg')"}
              pill={
                <Pill>
                  <Lightbulb className="h-4 w-4" />
                </Pill>
              }
            />
            <h3 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#120b2b]">ImproviT</h3>
            <p className="mt-2 text-base md:text-lg text-[#120b2b]/70">
              Structured Idea Generation &amp; Implementation
            </p>
            <Learn href="/products/improvit" />
          </motion.article>

          {/* финальная стрелка → на уровне нижнего элемента */}
          <ArrowRight className="pointer-events-none absolute -left-1 md:-left-0 bottom-16 h-7 w-7 text-[#120b2b]" />
        </div>
      </div>
    </section>
  );
}