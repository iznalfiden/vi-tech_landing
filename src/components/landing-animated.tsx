'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';
import MainPageProductsOverviewFlow from './MainPageProductsOverviewFlow';
import FAQSection from './faq-section';
import { useTranslation } from 'react-i18next';

export default function LandingAnimated() {
  const { t } = useTranslation('landing');
  
  const partners: { name: string; src: string }[] = [
    { name: 'Allur', src: '/Allur_logo_red_(1).png' },
    { name: "Breen Capital", src: "/breen-logo-new-strapline-01.svg" },
    { name: 'Alstom', src: '/Alstom_logo.png' },
    { name: 'TIMET', src: '/timet _logo.png' },
  ];

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
      {/* HERO - Enhanced */}
      <section
        className={[
          'relative isolate overflow-hidden',
          'min-h-[calc(100vh-80px)]',
          'supports-[height:100svh]:min-h-[calc(100svh-80px)]',
          "after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-16 after:bg-gradient-to-t after:from-white after:to-transparent after:pointer-events-none",
        ].join(' ')}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 -z-20">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
          
          {/* Animated gradient orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-400/20 to-purple-600/10 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-600/10 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-emerald-400/10 to-teal-600/10 blur-3xl"
          />
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23120E2F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-20 md:pt-28 pb-12 md:pb-20">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1.2fr_1fr] items-center">
            {/* Left Column - Content */}
            <div className="relative z-10">
              

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight leading-[1.1] text-[#120E2F]"
              >
                Operational Excellence{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Software</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-violet-400/40 to-purple-400/40 -z-0 origin-left"
                  />
                </span>{' '}
                for Problem Solving & Standardised Work
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
                className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-2xl leading-relaxed"
              >
                Eliminate recurring problems, standardise best practices, and drive continuous improvement 
                with Vi-Tech&apos;s integrated digital platform.
              </motion.p>

              

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="mt-10 flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  onClick={scrollToProducts}
                  className="cursor-pointer rounded-full bg-[#120E2F] text-white hover:bg-[#120E2F]/90 shadow-lg shadow-[#120E2F]/20 hover:shadow-xl hover:shadow-[#120E2F]/30 transition-all px-8 py-6 text-base"
                >
                  <span className="inline-flex items-center gap-2">
                    Explore Products
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </motion.div>

            </div>

            {/* Right Column - Trust Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Background decorative cards */}
                <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-200/50" />
                
                {/* Main content card */}
                <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl shadow-neutral-900/5 overflow-hidden">
                  {/* Card Header */}
                  <div className="relative h-28 bg-gradient-to-br from-[#120E2F] to-[#1a1650] p-6">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2MmgydjRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMHgydjRIMGgydjRoMlY2aDRWNEg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                    
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20">
                        <Shield className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-xs font-medium text-white/90">Trusted Worldwide</span>
                      </div>
                      <h3 className="mt-3 text-xl font-bold text-white">
                        Industry Leaders Choose Vi-Tech
                      </h3>
                    </div>
                  </div>

                  {/* Partners Grid */}
                  <div className="p-8">
                    <p className="text-sm text-neutral-500 mb-6 text-center">Trusted by industry leaders:</p>
                    <div className="grid grid-cols-2 gap-5">
                      {partners.map((partner, i) => (
                        <motion.div
                          key={partner.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                          className="flex items-center justify-center p-6 rounded-xl bg-neutral-50/80 border border-neutral-100 hover:bg-white hover:border-neutral-200 hover:shadow-sm transition-all"
                        >
                          <img
                            src={partner.src}
                            alt={partner.name}
                            className="h-8 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                          />
                        </motion.div>
                      ))}
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

      {/* FAQ */}
      <FAQSection 
        title={t('faq.title')} 
        searchPlaceholder={t('faq.searchPlaceholder')}
        searchResults={t('faq.searchResults')}
        noResults={t('faq.noResults')}
        clearSearch={t('faq.clearSearch')}
        expandAll={t('faq.expandAll')}
        collapseAll={t('faq.collapseAll')}
        categories={t('faq.categories', { returnObjects: true }) as Record<string, string>}
        groups={t('faq.groups', { returnObjects: true }) as Array<{ category: string; items: { question: string; answer: string }[] }>}
      />
    </main>
  );
}