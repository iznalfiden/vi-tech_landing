// components/footer.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

export default function Footer() {
  const reduce = useReducedMotion();

  const fadeUp = {
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' as const },
    viewport: { once: true, margin: '-80px' },
  };

  return (
    <motion.footer
      {...fadeUp}
      className="relative isolate overflow-hidden bg-[#0e0a24] text-white"
    >
      {/* сглаживаем шов сверху (от предыдущего блока к футеру) */}
      <div className="pointer-events-none absolute -top-16 left-0 right-0 h-16 bg-gradient-to-t from-[#0e0a24] to-transparent" />

      {/* мягкое центральное освещение, чтобы середина не была слишком тёмной */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_120%_at_50%_0%,rgba(255,255,255,0.06),transparent_65%)]" />

      {/* угловые «пузыри» — меньше плотность, чтобы не утяжелять центр */}
      <div className="pointer-events-none absolute -left-40 -top-48 h-[28rem] w-[28rem] rounded-full bg-indigo-400/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 -bottom-40 h-[26rem] w-[26rem] rounded-full bg-violet-500/14 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          {/* логотип */}
          <motion.div
            whileHover={{ scale: reduce ? 1 : 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/LOGO_V1_white.svg"
              alt="Vi-Tech mark"
              width={200}
              height={200}
              priority
            />
          </motion.div>

          {/* название + email + адрес */}
          <div className="text-left md:text-right">
            <div className="text-lg md:text-xl font-semibold">
              Virtuous Improvement Technologies
            </div>
            <Link
              href="mailto:hello@vi-tech.io"
              className="mt-1 inline-block text-white hover:text-white/80"
            >
              hello@vi-tech.io
            </Link>

            <p className="mt-2 max-w-xs text-sm text-white/80 md:ml-auto">
              Harvest Hill House<br />
              Harvest Hill Lane, Allesley<br />
              Coventry, England, CV5 9DD
            </p>
          </div>
        </div>

        {/* нижняя строка */}
        <div className="mt-8 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-end md:gap-6 text-sm text-white/80">
          <Link href="/privacy" className="hover:text-white underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white underline-offset-4 hover:underline">
            Terms &amp; Conditions
          </Link>
          <Link href="/gdpr" className="hover:text-white underline-offset-4 hover:underline">
            GDPR
          </Link>
          <Link href="/copyright" className="hover:text-white underline-offset-4 hover:underline">
            Copyright
          </Link>
          <span className="md:ml-2">Vi-Tech {new Date().getFullYear()} ©</span>
        </div>
      </div>
    </motion.footer>
  );
}