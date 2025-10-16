'use client';

import React from 'react';
import { motion, easeOut } from 'framer-motion';
import {
  Search,
  CandlestickChart as ChartCandlestick,
  Lightbulb,
  Settings,
  BookOpen,
  Cog,
  Coins,
  Globe,
  RefreshCw,
  Users,
} from 'lucide-react';

const XLINK_NS = 'http://www.w3.org/1999/xlink';

function NodeImg({
  href, x, y, size, maskId, bleed = 1.25,
}: {
  href: string; x: number; y: number; size: number; maskId: string; bleed?: number;
}) {
  const ref = React.useRef<SVGImageElement | null>(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    try { el.setAttributeNS(null, 'href', href); el.setAttributeNS(XLINK_NS, 'href', href); } catch {}
  }, [href]);

  return (
    <image
      ref={ref}
      href={href}
      x={x - bleed}
      y={y - bleed}
      width={size + 2 * bleed}
      height={size + 2 * bleed}
      preserveAspectRatio="xMidYMid slice"
      mask={`url(#${maskId})`}
      style={{ mixBlendMode: 'normal', filter: 'none', opacity: 1, imageRendering: 'auto' }}
    />
  );
}

type Props = { embed?: boolean; overline?: string; className?: string };

export default function MainPageProductsOverviewFlow({
  embed = false,
  overline = 'Product flow overview',
  className = '',
}: Props) {
  // ===== DESKTOP constants =====
  const vb = { w: 1200, h: 620 };
  const r = 96;
  const gap = 16;
  const branchExtra = 66;

  const pctX = (x: number) => `${(x / vb.w) * 100}%`;
  const pctY = (y: number) => `${(y / vb.h) * 100}%`;

  const splitDx = 8;
  const splitDy = 7;

  const resY = 170 - branchExtra;
  const impY = 350 + branchExtra;

  const nodes = {
    std: { cx: 180, cy: 260, title: 'StandardiziT', sub: 'Work Standards & SWC', href: '/products/standardizit', img: '/standardizit.svg' },
    gsi: { cx: 520, cy: 260, title: 'GoSeeiT', sub: 'Promotes ‘Go Look & See’', href: '/products/goseeit', img: '/goseeit.svg' },
    res: { cx: 900, cy: resY, title: 'ResolviT', sub: 'Standardised Problem Solving', href: '/products/resolvit', img: '/resolvit.svg' },
    imp: { cx: 900, cy: impY, title: 'ImproviT', sub: 'Idea Generation & Implementation', href: '/products/improvit', img: '/improvit.svg' },
  } as const;

  const iconByKey: Record<keyof typeof nodes, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    std: ChartCandlestick,
    gsi: Search,
    res: Settings,
    imp: Lightbulb,
  };
  const iconColorByKey: Record<keyof typeof nodes, string> = {
    gsi: '#10B981',
    std: '#C026D3',
    imp: '#F59E0B',
    res: '#7C3AED',
  };

  const order: Array<keyof typeof nodes> = ['std', 'gsi', 'res', 'imp'];

  const bezier = (sx: number, sy: number, ex: number, ey: number) => {
    const mx = (sx + ex) / 2;
    return `M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`;
  };

  const pathStdToGsi = bezier(
    nodes.std.cx + r + gap,
    nodes.std.cy,
    nodes.gsi.cx - r - gap,
    nodes.gsi.cy
  );

  const startX = nodes.gsi.cx + r + gap + splitDx;
  const startUpY = nodes.gsi.cy - splitDy;
  const startDownY = nodes.gsi.cy + splitDy;

  const pathGsiToRes = bezier(startX, startUpY, nodes.res.cx - r - gap, nodes.res.cy);
  const pathGsiToImp = bezier(startX, startDownY, nodes.imp.cx - r - gap, nodes.imp.cy);

  const stroke = 'rgba(255,255,255,0.9)';
  const arrowSize = 12;

  const draw = (delay = 0) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.9, ease: easeOut, delay },
    viewport: { once: true, margin: '-80px' },
  });

  // ===== MOBILE: центр + развилка. Стрелки стартуют из реального блока "LEARN MORE" =====
  function MobileStackBranched() {
    const wrapRef = React.useRef<HTMLDivElement | null>(null);
    type DivRef = React.MutableRefObject<HTMLDivElement | null>;

    // якоря: in — верх карточки; outBox — сам блок Learn more (берём центр-низ)
    const refStdIn = React.useRef<HTMLDivElement | null>(null);
    const refStdOutBox = React.useRef<HTMLDivElement | null>(null);
    const refGsiIn = React.useRef<HTMLDivElement | null>(null);
    const refGsiOutBox = React.useRef<HTMLDivElement | null>(null);
    const refResIn = React.useRef<HTMLDivElement | null>(null);
    const refImpIn = React.useRef<HTMLDivElement | null>(null);

    const [box, setBox] = React.useState({ w: 0, h: 0 });
    const [pt, setPt] = React.useState<Record<string, { x: number; y: number }>>({});

    const bbox = (el: HTMLElement | null, root: DOMRect) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left - root.left, y: r.top - root.top, w: r.width, h: r.height };
    };

    const measure = React.useCallback(() => {
      const w = wrapRef.current;
      if (!w) return;
      const wr = w.getBoundingClientRect();

      const stdIn = bbox(refStdIn.current, wr);
      const stdOutB = bbox(refStdOutBox.current, wr);
      const gsiIn = bbox(refGsiIn.current, wr);
      const gsiOutB = bbox(refGsiOutBox.current, wr);
      const resIn = bbox(refResIn.current, wr);
      const impIn = bbox(refImpIn.current, wr);

      const round = (n: number) => Math.round(n);

      setBox({ w: round(wr.width), h: round(wr.height) });
      setPt({
        stdIn:  stdIn ? { x: round(stdIn.x + stdIn.w / 2), y: round(stdIn.y) } : { x: 0, y: 0 },
        stdOut: stdOutB ? { x: round(stdOutB.x + stdOutB.w / 2), y: round(stdOutB.y + stdOutB.h + 10) } : { x: 0, y: 0 }, // +10px ниже текста
        gsiIn:  gsiIn ? { x: round(gsiIn.x + gsiIn.w / 2), y: round(gsiIn.y) } : { x: 0, y: 0 },
        gsiOut: gsiOutB ? { x: round(gsiOutB.x + gsiOutB.w / 2), y: round(gsiOutB.y + gsiOutB.h + 10) } : { x: 0, y: 0 },
        resIn:  resIn ? { x: round(resIn.x + resIn.w / 2), y: round(resIn.y) } : { x: 0, y: 0 },
        impIn:  impIn ? { x: round(impIn.x + impIn.w / 2), y: round(impIn.y) } : { x: 0, y: 0 },
      });
    }, []);

    React.useLayoutEffect(() => {
      measure();
      const ro = new ResizeObserver(measure);
      if (wrapRef.current) ro.observe(wrapRef.current);
      window.addEventListener('resize', measure);
      return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
    }, [measure]);

    // вертикальная линия от A к B (жёстко вертикальная, чтобы не было «наклона»)
    const vertical = (a: {x:number;y:number}, b: {x:number;y:number}) => {
      const x = Math.round((a.x + b.x) / 2);
      const y0 = Math.min(a.y, b.y);
      const y1 = Math.max(a.y, b.y);
      return `M ${x} ${y0} V ${y1}`;
    };

    // аккуратная симметричная дуга от s к e
    const curveOut = (s: {x:number;y:number}, e: {x:number;y:number}, side: 'left'|'right') => {
      const stem = 18;             // хвост вниз от точки старта
      const from = { x: s.x, y: s.y + stem };
      const pushX = Math.max(Math.abs(e.x - s.x) * 0.6, 120);
      const cx = side === 'left' ? from.x - pushX : from.x + pushX;
      const cy = Math.round((from.y + e.y) / 2 + 24); // чуть ниже середины, чтобы не перекрывать текст
      return `M ${from.x} ${from.y} Q ${cx} ${cy} ${e.x} ${e.y}`;
    };

    const Card = ({
        k, topRef, learnMoreRef, center = false,
      }: {
        k: 'std' | 'gsi' | 'res' | 'imp';
        topRef: DivRef;                         // было: RefObject<HTMLDivElement>
        learnMoreRef?: DivRef;                  // было: RefObject<HTMLDivElement>
        center?: boolean;
      }) => {
      const n = nodes[k];
      const Icon = iconByKey[k];
      const color = iconColorByKey[k];
      return (
        <div ref={topRef} className={`relative mx-auto ${center ? 'max-w-[560px]' : 'max-w-[320px]'} pt-6 pb-8`}>
          <a href={n.href} className="flex flex-col items-center text-center gap-3">
            <span className={`grid place-items-center ${center ? 'size-20' : 'size-16'} rounded-full overflow-hidden ring-4 ring-white/10`}>
              <img src={n.img} alt="" width={center ? 200 : 160} height={center ? 200 : 160} className="h-full w-full object-cover" loading="lazy" />
            </span>
            <div className="pt-1">
              <div className={`flex items-center justify-center gap-2 font-extrabold text-white ${center ? 'text-lg' : 'text-[17px]'}`}>
                <Icon className="size-5" color={color} aria-hidden />
                {n.title}
              </div>
              <div className={`${center ? 'text-sm' : 'text-[13px]'} text-white/80`}>{n.sub}</div>
              <div ref={learnMoreRef} className="mt-2 inline-flex text-xs font-semibold tracking-wider uppercase text-white/90">
                Learn more →
              </div>
            </div>
          </a>
        </div>
      );
    };

    return (
      <div ref={wrapRef} className="relative">
        {/* 1. StandardiziT (центр) */}
        <div className="min-h-[176px] flex items-center justify-center">
          <Card k="std" topRef={refStdIn} learnMoreRef={refStdOutBox} center />
        </div>

        {/* 2. GoSeeiT (центр) */}
        <div className="min-h-[188px] flex items-center justify-center">
          <Card k="gsi" topRef={refGsiIn} learnMoreRef={refGsiOutBox} center />
        </div>

        {/* 3. Разветвление: два столбца */}
        <div className="grid grid-cols-2 gap-7 pt-8">
          <div className="min-h-[176px] flex items-center justify-center">
            <Card k="res" topRef={refResIn} />
          </div>
          <div className="min-h-[176px] flex items-center justify-center">
            <Card k="imp" topRef={refImpIn} />
          </div>
        </div>

        {/* связи */}
        <svg
          className="pointer-events-none absolute inset-0 -z-10"
          width={box.w}
          height={box.h}
          viewBox={`0 0 ${box.w} ${box.h}`}
          preserveAspectRatio="none"
          shapeRendering="crispEdges"
        >
          <defs>
            <marker
              id="mobArrow"
              viewBox="0 0 10 10"
              markerUnits="userSpaceOnUse"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="rgba(255,255,255,0.9)" />
            </marker>
          </defs>

          {/* std.LearnMore -> gsi.top — строго вертикально */}
          {pt.stdOut && pt.gsiIn && (
            <path
              d={vertical(pt.stdOut, pt.gsiIn)}
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="2"
              strokeLinecap="butt"
              fill="none"
              markerEnd="url(#mobArrow)"
            />
          )}

          {/* gsi.LearnMore -> res.top / imp.top — симметричные дуги */}
          {pt.gsiOut && pt.resIn && (
            <path
              d={curveOut(pt.gsiOut, pt.resIn, 'left')}
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="2"
              strokeLinecap="butt"
              fill="none"
              markerEnd="url(#mobArrow)"
            />
          )}
          {pt.gsiOut && pt.impIn && (
            <path
              d={curveOut(pt.gsiOut, pt.impIn, 'right')}
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="2"
              strokeLinecap="butt"
              fill="none"
              markerEnd="url(#mobArrow)"
            />
          )}
        </svg>
      </div>
    );
  }

  // ——— фон без «шва»
  const gradientOverscanClass =
    'pointer-events-none absolute -z-10 left-1/2 -translate-x-1/2 w-[140vw] -top-24 -bottom-24 ' +
    'bg-[radial-gradient(1400px_700px_at_95%_-160px,rgba(139,92,246,0.20),transparent_65%),' +
    'radial-gradient(1000px_560px_at_-120px_120%,rgba(37,99,235,0.16),transparent_65%)]';
  const gradientMaskStyle: React.CSSProperties = {
    WebkitMaskImage: 'linear-gradient(to right, transparent 0, white 8%, white 92%, transparent 100%)',
    maskImage: 'linear-gradient(to right, transparent 0, white 8%, white 92%, transparent 100%)',
  };

  const content = (
    <div className={`mx-auto max-w-7xl px-4 ${embed ? className : ''}`}>
      {overline && (
        <div className="mb-8 md:mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[16px] font-semibold tracking-wider uppercase text-white/80">
            {overline}
          </span>
        </div>
      )}

      {/* ===== MOBILE ===== */}
      <div className="md:hidden">
        <MobileStackBranched />
      </div>

      {/* ===== DESKTOP (как было) ===== */}
      <div className="relative hidden md:block w-full md:aspect-[1200/620]">
        <motion.svg
          viewBox={`0 0 ${vb.w} ${vb.h}`}
          role="img"
          aria-labelledby="flowTitle"
          className="absolute inset-0 h-full w-full block"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: 'visible', pointerEvents: 'none' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: easeOut }}
          viewport={{ once: true, margin: '-80px' }}
          shapeRendering="geometricPrecision"
        >
          <title id="flowTitle">Products flow: StandardiziT → GoSeeiT → ResolvIT/ImproviT</title>

          <defs>
            <marker
              id="arrow"
              viewBox={`0 0 12 12`}
              markerUnits="userSpaceOnUse"
              markerWidth={12}
              markerHeight={12}
              refX={11}
              refY={6}
              orient="auto"
            >
              <path d={`M0,0 L12,6 L0,12 Z`} fill={stroke} />
            </marker>

            {order.map((key) => {
              const n = nodes[key];
              const x = n.cx - r - 4;
              const y = n.cy - r - 4;
              const w = 2 * r + 8;
              const h = 2 * r + 8;
              return (
                <mask key={`mask-${key}`} id={`mask-${key}`} maskUnits="userSpaceOnUse" x={x} y={y} width={w} height={h}>
                  <rect x={x} y={y} width={w} height={h} fill="#000" />
                  <circle cx={n.cx} cy={n.cy} r={r} fill="#fff" />
                </mask>
              );
            })}
          </defs>

          <motion.path d={pathStdToGsi} fill="none" stroke={stroke} strokeWidth={2.5} strokeLinecap="butt" strokeLinejoin="round" vectorEffect="non-scaling-stroke" markerEnd="url(#arrow)" {...draw(0.05)} />
          <motion.path d={pathGsiToRes} fill="none" stroke={stroke} strokeWidth={2.5} strokeLinecap="butt" strokeLinejoin="round" vectorEffect="non-scaling-stroke" markerEnd="url(#arrow)" {...draw(0.15)} />
          <motion.path d={pathGsiToImp} fill="none" stroke={stroke} strokeWidth={2.5} strokeLinecap="butt" strokeLinejoin="round" vectorEffect="non-scaling-stroke" markerEnd="url(#arrow)" {...draw(0.2)} />

          {order.map((key, i) => {
            const n = nodes[key];
            return (
              <motion.g
                key={key}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease: easeOut, delay: 0.1 + i * 0.08 }}
              >
                <NodeImg href={n.img} x={n.cx - r} y={n.cy - r} size={2 * r} maskId={`mask-${key}`} />
              </motion.g>
            );
          })}
        </motion.svg>

        {order.map((key, i) => {
          const n = nodes[key];
          const Icon = iconByKey[key];
          const color = iconColorByKey[key];
          const top = n.cy + r + 10;

          return (
            <motion.a
              key={`${key}-label`}
              href={n.href}
              className="absolute z-10 block -translate-x-1/2 text-center"
              style={{ left: pctX(n.cx), top: pctY(top), width: 300 }}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.12 + i * 0.08 }}
            >
              <div className="flex items-center justify-center gap-2">
                <Icon className="size-5" color={color} strokeWidth={2} aria-hidden />
                <span className="font-extrabold text-[28px] leading-none text-white">{n.title}</span>
              </div>
              <div className="mt-2 text-[16px] leading-none text-white/80">{n.sub}</div>
              <div className="mt-4 text-[14px] font-bold tracking-[0.06em] uppercase text-white">LEARN MORE</div>
            </motion.a>
          );
        })}
      </div>

      {/* ===== VALUE CARDS ===== */}
      <div className="relative mt-16 md:mt-20">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center text-white text-3xl md:text-5xl font-extrabold tracking-tight"
        >
          Empowering your team at every stage
        </motion.h2>

        <p className="mx-auto mt-3 max-w-3xl text-center text-white/80">
          Practical benefits your teams feel day one — from collaboration to decisions and alignment.
        </p>

        <div className="mt-10 md:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {[
            { Icon: Cog, text: 'Catalyst for improvement' },
            { Icon: Users, text: 'Encourages collaborative problem solving' },
            { Icon: BookOpen, text: 'Develop a shared knowledge base and gives every employee a voice' },
            { Icon: RefreshCw, text: 'Engaged workforce identifying & eliminating waste' },
            { Icon: Coins, text: 'Cost benefit decision making' },
            { Icon: Globe, text: 'Connects remote teams & aligns workforces' },
          ].map(({ Icon, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.03 }}
              viewport={{ once: true, margin: '-80px' }}
              className="relative flex h-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-sm p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-200 hover:bg-white/[0.075]"
            >
              <div className="flex flex-col items-center text-center">
                <span className="mb-4 grid place-items-center size-12 md:size-14 rounded-xl text-white ring-1 ring-white/20 shadow-lg bg-gradient-to-br from-violet-600 to-indigo-500">
                  <Icon className="size-6 md:size-7" strokeWidth={2.2} />
                </span>
                <div className="text-white/90 text-lg md:text-xl leading-snug">
                  {text}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  if (embed) return content;

  return (
    <section className="relative isolate overflow-hidden bg-[#0e0a24] py-24 md:py-36">
      <div className={gradientOverscanClass} style={gradientMaskStyle} />
      {content}
    </section>
  );
}