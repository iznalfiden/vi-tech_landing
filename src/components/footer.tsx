// components/footer.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function Footer() {
  const reduce = useReducedMotion();

  const fadeUp = {
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" as const },
    viewport: { once: true, margin: "-80px" },
  };

  return (
    <motion.footer
      {...fadeUp}
      className="relative isolate overflow-hidden bg-[#0e0a24] text-white"
    >
      {/* мягкие фоны */}
      <div className="pointer-events-none absolute -left-32 -top-48 h-[28rem] w-[28rem] rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-32 h-[26rem] w-[26rem] rounded-full bg-violet-800/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          {/* Левый блок: логотип */}
          <motion.div whileHover={{ scale: reduce ? 1 : 1.02 }} transition={{ duration: 0.2 }}>
            <Image
              src="/LOGO_V1_white.svg"
              alt="Vi-Tech mark"
              width={200}
              height={200}
              priority
            />
          </motion.div>

          {/* Правый блок: название + email */}
          <div className="text-left md:text-right">
            <div className="text-lg md:text-xl font-semibold">
              Virtuous Improvement Technologies
            </div>
            <Link
              href="mailto:info@vi-tech.io"
              className="mt-1 inline-block text-white hover:text-white/80"
            >
              info@vi-tech.io
            </Link>
          </div>
        </div>

        {/* Нижняя строка */}
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