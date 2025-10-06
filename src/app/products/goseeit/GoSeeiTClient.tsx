// app/products/goseeit/GoSeeiTClient.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Search as SearchIcon,
  ClipboardCheck,
  Users,
  Gauge,
  CheckCircle2,
  Radar,
  ArrowRight,
} from 'lucide-react';

export default function GoSeeiTClient() {
  const features = [
    {
      title: 'Go Look & See',
      desc: 'Стандартизированные обходы рабочих зон, чек-листы и фотофиксация.',
      Icon: SearchIcon,
    },
    {
      title: 'Несоответствия → действия',
      desc: 'Быстрое создание задач, ответственные и сроки прямо с обхода.',
      Icon: ClipboardCheck,
    },
    {
      title: 'Вовлечение команды',
      desc: 'Назначайте владельцев участков, подтверждайте исправления.',
      Icon: Users,
    },
    {
      title: 'Метрики в реальном времени',
      desc: 'Дашборды по зонам, типам проблем и скорости закрытия.',
      Icon: Gauge,
    },
  ] as const;

  const steps = [
    { title: 'Выберите зону', desc: 'Цех/линия/участок — где требуется аудит.' },
    { title: 'Пройдите чек-лист', desc: 'Отмечайте несоответствия, добавляйте фото/комментарии.' },
    { title: 'Назначьте действие', desc: 'Кто отвечает и до какого срока, авто-уведомления.' },
    { title: 'Проверьте результат', desc: 'Подтвердите исправление и закройте пункт.' },
  ] as const;

  return (
    <main>
      {/* BREADCRUMB */}
      

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* text */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-100">
                <span className="inline-grid place-items-center size-5 rounded-md bg-emerald-600 text-white">
                  <SearchIcon className="size-3.5" />
                </span>
                Workplace Audit
              </span>

              <h1 className="mt-4 font-display font-bold tracking-tight leading-[1.15] md:leading-[1.05] text-[clamp(28px,7.5vw,44px)] md:text-6xl">
                GoSeeiT — стандартизированные обходы и быстрые улучшения
              </h1>

              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                Продвигайте культуру «Go Look & See»: фиксируйте несоответствия в момент обнаружения,
                назначайте действия и контролируйте их закрытие в одном месте.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild className="rounded-full">
                  <Link href="/book-demo">
                    Book a demo
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="#features">See features</Link>
                </Button>
              </div>

              <ul className="mt-6 grid gap-3 text-sm text-foreground/90">
                {[
                  'Чек-листы с фото и комментариями',
                  'Назначение задач в один клик',
                  'Онлайн-дашборды и отчёты',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 text-emerald-600 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* visual */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative aspect-[16/11] md:aspect-[4/3] rounded-2xl border bg-white/60 backdrop-blur overflow-hidden"
            >
              <Image
                src="/main_page_1.svg"
                alt="GoSeeiT overview"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 48vw, 100vw"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-[#0e0a24] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Что умеет GoSeeiT</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.03 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
              >
                <div className="flex items-start gap-4">
                  {/* Пилюля-иконка: единый размер и стиль */}
                  <span
                    className={cn(
                      'grid place-items-center size-12 rounded-xl shrink-0 text-white shadow-md',
                      'bg-gradient-to-br from-emerald-600 to-teal-500'
                    )}
                    aria-hidden="true"
                  >
                    <f.Icon className="size-6" strokeWidth={2} />
                  </span>

                  <div className="min-w-0">
                    <div className="text-white text-lg font-semibold leading-tight">{f.title}</div>
                    <div className="text-white/80 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold">Как это работает</h2>

          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="grid place-items-center size-9 rounded-lg bg-emerald-600 text-white font-semibold">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-muted-foreground text-sm leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* METRICS/CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { Icon: Radar, value: '−35%', label: 'Время на выявление проблем' },
              { Icon: Gauge, value: '×2.1', label: 'Скорость закрытия действий' },
              { Icon: CheckCircle2, value: '95%', label: 'Подтверждённых исправлений' },
            ].map((m, i) => (
              <div key={i} className="rounded-2xl border bg-white p-6 shadow-sm flex items-center gap-4">
                <span className="grid place-items-center size-12 rounded-xl bg-emerald-600 text-white">
                  <m.Icon className="size-6" />
                </span>
                <div>
                  <div className="text-2xl font-bold">{m.value}</div>
                  <div className="text-muted-foreground">{m.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild className="rounded-full">
              <Link href="/book-demo">
                Запросить демо
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/products">К другим продуктам</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}