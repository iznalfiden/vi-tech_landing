'use client';

import React from 'react';
import { motion, easeOut } from 'framer-motion';
import {
  Search,
  CandlestickChart as ChartCandlestick,
  Lightbulb,
  Settings,
} from 'lucide-react';

const XLINK_NS = 'http://www.w3.org/1999/xlink';

function NodeImg({
  href,
  x,
  y,
  size,
  clipId,
}: {
  href: string;
  x: number;
  y: number;
  size: number;
  clipId: string;
}) {
  const ref = React.useRef<SVGImageElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    try {
      el.setAttributeNS(null, 'href', href);
      el.setAttributeNS(XLINK_NS, 'href', href);
    } catch { }
  }, [href]);

  return (
    <image
      ref={ref}
      href={href}
      x={x}
      y={y}
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid slice"
      clipPath={`url(#${clipId})`}
    />
  );
}

export default function ProductsOverviewFlowSVG() {
  const vb = { w: 1200, h: 620 };
  const r = 96;
  const gap = 16;
  const branchExtra = 66;

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

  const stroke = '#120b2b';
  const arrowSize = 12;

  const draw = (delay = 0) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.9, ease: easeOut, delay },
    viewport: { once: true, margin: '-80px' },
  });

  const pop = (delay = 0) => ({
    initial: { opacity: 0, y: 16, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.5, ease: easeOut, delay },
    viewport: { once: true, margin: '-80px' },
    whileHover: { y: -2 },
  });

  // ===== измеряем ширину заголовков, чтобы центрировать "иконка+текст" =====
  const titleRefs = React.useRef<Record<string, SVGTextElement | null>>({});
  const [titleW, setTitleW] = React.useState<Record<string, number>>({});

  const setTitleRef = (key: keyof typeof nodes) => (el: SVGTextElement | null) => {
    titleRefs.current[key] = el;
  };

  React.useLayoutEffect(() => {
    const widths: Record<string, number> = {};
    for (const key of order) {
      const el = titleRefs.current[key];
      if (el) widths[key] = el.getBBox().width;
    }
    setTitleW(widths);
  }, []);

  // ========== MOBILE with arrows ==========
  function MobileStackBranched() {
    const wrapRef = React.useRef<HTMLDivElement | null>(null);
    type DivRef = React.MutableRefObject<HTMLDivElement | null>;

    // anchors (circle avatars) + "Learn more"
    const refStdAnchor = React.useRef<HTMLDivElement | null>(null);
    const refGsiAnchor = React.useRef<HTMLDivElement | null>(null);
    const refResAnchor = React.useRef<HTMLDivElement | null>(null);
    const refImpAnchor = React.useRef<HTMLDivElement | null>(null);

    const refStdOutBox = React.useRef<HTMLDivElement | null>(null);
    const refGsiOutBox = React.useRef<HTMLDivElement | null>(null);

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

      const stdA = bbox(refStdAnchor.current, wr);
      const gsiA = bbox(refGsiAnchor.current, wr);
      const resA = bbox(refResAnchor.current, wr);
      const impA = bbox(refImpAnchor.current, wr);

      const stdOutB = bbox(refStdOutBox.current, wr);
      const gsiOutB = bbox(refGsiOutBox.current, wr);

      const round = (n: number) => Math.round(n);
      const cx = (b: { x: number; w: number }) => round(b.x + b.w / 2);

      setBox({ w: round(wr.width), h: round(wr.height) });
      setPt({
        stdIn: stdA ? { x: cx(stdA), y: round(stdA.y) - 2 } : { x: 0, y: 0 },
        gsiIn: gsiA ? { x: cx(gsiA), y: round(gsiA.y) - 2 } : { x: 0, y: 0 },
        resIn: resA ? { x: cx(resA), y: round(resA.y) - 2 } : { x: 0, y: 0 },
        impIn: impA ? { x: cx(impA), y: round(impA.y) - 2 } : { x: 0, y: 0 },
        stdOut: stdOutB ? { x: cx(stdOutB), y: round(stdOutB.y + stdOutB.h + 10) } : { x: 0, y: 0 },
        gsiOut: gsiOutB ? { x: cx(gsiOutB), y: round(gsiOutB.y + gsiOutB.h + 10) } : { x: 0, y: 0 },
      });
    }, []);

    React.useLayoutEffect(() => {
      measure();
      const ro = new ResizeObserver(measure);
      if (wrapRef.current) ro.observe(wrapRef.current);
      window.addEventListener('resize', measure, { passive: true });
      return () => {
        ro.disconnect();
        window.removeEventListener('resize', measure as any);
      };
    }, [measure]);

    // path builders
    const vLineTo = (from: { x: number; y: number }, to: { x: number; y: number }) =>
      `M ${Math.round(to.x)} ${Math.round(from.y)} V ${Math.round(to.y)}`;

    // smooth cubic curve (soft split & landing)
    const curveOut = (
      s: { x: number; y: number },
      e: { x: number; y: number },
      side: 'left' | 'right'
    ) => {
      const stem = 12;
      const start = { x: s.x, y: s.y + stem };

      const dx = e.x - start.x;
      const dy = e.y - start.y;
      const dist = Math.hypot(dx, dy) || 1;

      const spread = Math.max(Math.abs(dx) * 0.55, 110);
      const pull = Math.min(240, dist * 0.48);
      const drop = Math.min(56, dist * 0.22);

      const sideSign = side === 'left' ? -1 : 1;
      const c1 = {
        x: start.x + sideSign * Math.min(40, spread * 0.18),
        y: start.y + drop,
      };

      const theta = Math.atan2(dy, dx);
      const c2 = {
        x: e.x - Math.cos(theta) * pull + sideSign * Math.min(80, spread * 0.35),
        y: e.y - Math.sin(theta) * pull + Math.min(40, dist * 0.08),
      };

      return `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${e.x} ${e.y}`;
    };

    // double-stroke for subtle glow; linecaps 'butt' to avoid dot under arrow
    const PathWithGlow: React.FC<{ d: string; withArrow?: boolean }> = ({ d, withArrow = true }) => (
      <>
        <path
          d={d}
          stroke="rgba(18,11,43,0.14)"
          strokeWidth="5"
          strokeLinecap="butt"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          fill="none"
        />
        <path
          d={d}
          stroke="#120b2b"
          strokeWidth="2.25"
          strokeLinecap="butt"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          fill="none"
          {...(withArrow ? { markerEnd: 'url(#mobArrow)' } : {})}
        />
      </>
    );

    const Card = ({
      k,
      anchorRef,
      learnMoreRef,
      center = false,
    }: {
      k: 'std' | 'gsi' | 'res' | 'imp';
      anchorRef?: DivRef;
      learnMoreRef?: DivRef;
      center?: boolean;
    }) => {
      const n = nodes[k];
      const Icon = iconByKey[k];
      const color = iconColorByKey[k];
      return (
        <div className={`relative mx-auto ${center ? 'max-w-[560px]' : 'max-w-[320px]'} pt-6 pb-8`}>
          <a href={n.href} className="flex flex-col items-center text-center gap-3">
            <span
              ref={anchorRef}
              className={`grid place-items-center ${center ? 'size-20' : 'size-16'} rounded-full overflow-hidden ring-4 ring-white/40 border bg-white`}
            >
              <img
                src={n.img}
                alt=""
                width={center ? 200 : 160}
                height={center ? 200 : 160}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </span>
            <div className="pt-1">
              <div className={`flex items-center justify-center gap-2 font-extrabold ${center ? 'text-lg' : 'text-[17px]'} text-[#120b2b]`}>
                <Icon className="size-5" color={color} aria-hidden />
                {n.title}
              </div>
              <div className={`${center ? 'text-sm' : 'text-[13px]'} text-[#120b2bB3]`}>{n.sub}</div>
              <div ref={learnMoreRef} className="mt-2 inline-flex text-xs font-semibold tracking-wider uppercase text-[#120b2b]">
                Learn more
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
          <Card k="std" anchorRef={refStdAnchor} learnMoreRef={refStdOutBox} center />
        </div>

        {/* 2. GoSeeiT (центр) */}
        <div className="min-h-[188px] flex items-center justify-center">
          <Card k="gsi" anchorRef={refGsiAnchor} learnMoreRef={refGsiOutBox} center />
        </div>

        {/* 3. Разветвление: два столбца */}
        <div className="grid grid-cols-2 gap-7 pt-8">
          <div className="min-h-[176px] flex items-center justify-center">
            <Card k="res" anchorRef={refResAnchor} />
          </div>
          <div className="min-h-[176px] flex items-center justify-center">
            <Card k="imp" anchorRef={refImpAnchor} />
          </div>
        </div>

        {/* связи */}
        <svg
          className="pointer-events-none absolute inset-0 -z-10"
          width={Math.max(box.w, 1)}
          height={Math.max(box.h, 1)}
          viewBox={`0 0 ${Math.max(box.w, 1)} ${Math.max(box.h, 1)}`}
          preserveAspectRatio="none"
          shapeRendering="geometricPrecision"
        >
          <defs>
            <marker
              id="mobArrow"
              viewBox="0 0 10 10"
              markerUnits="userSpaceOnUse"
              markerWidth="10"
              markerHeight="10"
              refX="5"
              refY="5"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="#120b2b" />
            </marker>
          </defs>

          {/* std → gsi (строго вертикально) */}
          {pt.stdOut && pt.gsiIn && pt.stdOut.x !== 0 && pt.gsiIn.x !== 0 && (
            <PathWithGlow d={vLineTo(pt.stdOut, pt.gsiIn)} />
          )}

          {/* gsi → res / imp (симметричные плавные дуги) */}
          {pt.gsiOut && pt.resIn && pt.gsiOut.x !== 0 && pt.resIn.x !== 0 && (
            <PathWithGlow d={curveOut(pt.gsiOut, pt.resIn, 'left')} />
          )}
          {pt.gsiOut && pt.impIn && pt.gsiOut.x !== 0 && pt.impIn.x !== 0 && (
            <PathWithGlow d={curveOut(pt.gsiOut, pt.impIn, 'right')} />
          )}
        </svg>
      </div>
    );
  }

  return (
    <section className="relative mx-auto max-w-7xl pb-16 md:pb-24">
      <div className="pointer-events-none absolute -z-10 inset-0 bg-[radial-gradient(1200px_600px_at_95%_-120px,rgba(99,102,241,0.18),transparent_60%),radial-gradient(900px_500px_at_-120px_120%,rgba(37,99,235,0.14),transparent_60%)]" />

      <div className="rounded-3xl border bg-white/80 backdrop-blur shadow-sm">
        {/* ====== MOBILE (со стрелками) ====== */}
        <div className="md:hidden p-4 sm:p-6">
          <MobileStackBranched />
        </div>

        {/* ====== DESKTOP SVG ====== */}
        <div className="relative hidden md:block w-full md:aspect-[1200/620]">
          <motion.svg
            viewBox={`0 0 ${vb.w} ${vb.h}`}
            role="img"
            aria-labelledby="flowTitle"
            className="absolute inset-0 h-full w-full block"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: 'visible' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: easeOut }}
            viewport={{ once: true, margin: '-80px' }}
            xmlnsXlink={XLINK_NS}
          >
            <title id="flowTitle">Products flow: StandardiziT → GoSeeiT → ResolvIT/ImproviT</title>

            <defs>
              <marker
                id="arrow"
                viewBox={`0 0 ${arrowSize} ${arrowSize}`}
                markerUnits="userSpaceOnUse"
                markerWidth={arrowSize}
                markerHeight={arrowSize}
                refX={arrowSize - 1}
                refY={arrowSize / 2}
                orient="auto"
              >
                <path d={`M0,0 L${arrowSize},${arrowSize / 2} L0,${arrowSize} Z`} fill={stroke} />
              </marker>

              {order.map((key) => (
                <clipPath key={`clip-${key}`} id={`clip-${key}`}>
                  <circle cx={nodes[key].cx} cy={nodes[key].cy} r={r} />
                </clipPath>
              ))}
            </defs>

            {/* линии */}
            <motion.path d={pathStdToGsi} fill="none" stroke={stroke} strokeWidth={2.5} strokeLinecap="butt" strokeLinejoin="round" vectorEffect="non-scaling-stroke" markerEnd="url(#arrow)" {...draw(0.05)} />
            <motion.path d={pathGsiToRes} fill="none" stroke={stroke} strokeWidth={2.5} strokeLinecap="butt" strokeLinejoin="round" vectorEffect="non-scaling-stroke" markerEnd="url(#arrow)" {...draw(0.15)} />
            <motion.path d={pathGsiToImp} fill="none" stroke={stroke} strokeWidth={2.5} strokeLinecap="butt" strokeLinejoin="round" vectorEffect="non-scaling-stroke" markerEnd="url(#arrow)" {...draw(0.2)} />

            {/* узлы */}
            {order.map((key, i) => {
              const n = nodes[key];
              const Icon = iconByKey[key];

              const titleY = n.cy + r + 28;
              const subY = n.cy + r + 56;
              const linkY = n.cy + r + 84;

              const iconSize = 20;
              const gapIcon = 8;
              const textWidth = titleW[key] ?? 180;
              const total = iconSize + gapIcon + textWidth;
              const startX = n.cx - total / 2;
              const iconX = startX;
              const iconY = titleY - iconSize;
              const titleX = startX + iconSize + gapIcon;

              return (
                <motion.g
                  key={key}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: easeOut, delay: 0.1 + i * 0.08 }}
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <NodeImg href={n.img} x={n.cx - r} y={n.cy - r} size={2 * r} clipId={`clip-${key}`} />
                  <circle cx={n.cx} cy={n.cy} r={r} fill="transparent" stroke="#ffffff" strokeWidth="8" />

                  <a href={n.href} target="_self">
                    <rect x={n.cx - 180} y={n.cy + r + 6} width={360} height={90} fill="transparent" />
                    <Icon x={iconX} y={iconY} width={iconSize} height={iconSize} color={iconColorByKey[key]} strokeWidth={2} aria-hidden />
                    <text
                      ref={setTitleRef(key)}
                      x={titleX}
                      y={titleY}
                      textAnchor="start"
                      fontWeight={800}
                      fontSize="28"
                      fill="#120b2b"
                    >
                      {n.title}
                    </text>
                    <text x={n.cx} y={subY} textAnchor="middle" fontSize="16" fill="#120b2bB3">
                      {n.sub}
                    </text>
                    <text
                      x={n.cx}
                      y={linkY}
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight={700}
                      fill="#120b2b"
                      style={{ letterSpacing: 1.2, textTransform: 'uppercase' }}
                    >
                      LEARN MORE
                    </text>
                  </a>
                </motion.g>
              );
            })}
          </motion.svg>
        </div>
      </div>
    </section>
  );
}