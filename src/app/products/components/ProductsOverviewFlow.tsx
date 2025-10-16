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
    gsi: '#10B981', // emerald-500
    std: '#C026D3', // fuchsia-600
    imp: '#F59E0B', // amber-500
    res: '#7C3AED', // violet-600
  };

  const order: Array<keyof typeof nodes> = ['std', 'gsi', 'res', 'imp'];

  const bezier = (sx: number, sy: number, ex: number, ey: number) => {
    const mx = (sx + ex) / 2;
    return `M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`;
  };

  type NodeKey = keyof typeof nodes;


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

  const setTitleRef = (key: NodeKey) => (el: SVGTextElement | null) => {
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

  return (
    <section className="relative mx-auto max-w-7xl pb-16 md:pb-24">
      <div className="pointer-events-none absolute -z-10 inset-0 bg-[radial-gradient(1200px_600px_at_95%_-120px,rgba(99,102,241,0.18),transparent_60%),radial-gradient(900px_500px_at_-120px_120%,rgba(37,99,235,0.14),transparent_60%)]" />

      <div className="rounded-3xl border bg-white/80 backdrop-blur shadow-sm">
        {/* ====== MOBILE ====== */}
        <div className="md:hidden p-4 sm:p-6">
          <ol className="relative">
            {order.map((key, i) => {
              const n = nodes[key];
              const Icon = iconByKey[key];
              const isLast = i === order.length - 1;
              return (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, ease: easeOut, delay: i * 0.03 }}
                  className="relative flex gap-4"
                >
                  {!isLast && (
                    <span
                      className="absolute left-7 top-14 bottom-[-12px] w-px bg-gradient-to-b from-[#120b2b33] to-transparent"
                      aria-hidden
                    />
                  )}

                  <span className="shrink-0 grid place-items-center size-14 rounded-full ring-4 ring-white overflow-hidden border bg-white">
                    <img
                      src={n.img}
                      alt=""
                      width={2 * r}
                      height={2 * r}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </span>

                  <div className="flex-1 pt-1 pb-6">
                    <div className="flex items-center gap-2 font-extrabold text-lg text-[#120b2b]">
                      <Icon className="size-5" color={iconColorByKey[key]} aria-hidden />
                      {n.title}
                    </div>

                    <div className="text-sm text-[#120b2bB3]">{n.sub}</div>
                    <a
                      href={n.href}
                      className="mt-2 inline-block text-xs font-semibold tracking-wider uppercase text-[#120b2b]"
                    >
                      Learn more →
                    </a>
                  </div>
                </motion.li>
              );
            })}
          </ol>
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
              const iconColor = iconColorByKey[key];

              const titleY = n.cy + r + 28;
              const subY = n.cy + r + 56;
              const linkY = n.cy + r + 84;

              // параметры для центрирования
              const iconSize = 20;
              const gapIcon = 8;
              const textWidth = titleW[key] ?? 180; // запас на первый рендер
              const total = iconSize + gapIcon + textWidth;
              const startX = n.cx - total / 2; // начало строки "иконка+текст"
              const iconX = startX;
              const iconY = titleY - iconSize; // выравнивание по базовой линии
              const titleX = startX + iconSize + gapIcon;

              return (
                <motion.g key={key} {...pop(0.1 + i * 0.08)}>
                  <NodeImg href={n.img} x={n.cx - r} y={n.cy - r} size={2 * r} clipId={`clip-${key}`} />

                  {/* кольцо вокруг аватара (как было) */}
                  <circle cx={n.cx} cy={n.cy} r={r} fill="transparent" stroke="#ffffff" strokeWidth="8" />

                  <a href={n.href} target="_self">
                    {/* невидимый hit-area */}
                    <rect x={n.cx - 180} y={n.cy + r + 6} width={360} height={90} fill="transparent" />

                    {/* иконка слева от заголовка */}
                    <Icon x={iconX} y={iconY} width={iconSize} height={iconSize} color={iconColor} strokeWidth={2} aria-hidden />

                    {/* заголовок — измеряется и центрируется вместе с иконкой */}
                    <text
                      ref={setTitleRef(key)}   // ⬅️ раньше было ref={(el) => (titleRefs.current[key] = el)}
                      x={titleX}
                      y={titleY}
                      textAnchor="start"
                      fontWeight={800}
                      fontSize="28"
                      fill="#120b2b"
                    >
                      {n.title}
                    </text>

                    {/* сабхедер и CTA — строго по центру под кругом */}
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