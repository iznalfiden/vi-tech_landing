'use client';

import React from 'react';
import { motion, easeOut } from 'framer-motion';

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
    std: { cx: 180, cy: 260, title: 'StandardiziT', sub: 'Work Standards & SWC',             href: '/products/standardizit', img: '/main_page_1.svg' },
    gsi: { cx: 520, cy: 260, title: 'GoSeeiT',      sub: 'Promotes ‘Go Look & See’',         href: '/products/goseeit',      img: '/goseeit.svg' },
    res: { cx: 900, cy: resY, title: 'Resolvit',    sub: 'Standardised Problem Solving',     href: '/products/resolvit',     img: '/resolvit.svg' },
    imp: { cx: 900, cy: impY, title: 'ImproviT',    sub: 'Idea Generation & Implementation', href: '/products/improvit',     img: '/improvit.svg' },
  } as const;

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

  // motion пресеты
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

  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-16 md:pb-24">
      <div className="pointer-events-none absolute -z-10 inset-0 bg-[radial-gradient(1200px_600px_at_95%_-120px,rgba(99,102,241,0.18),transparent_60%),radial-gradient(900px_500px_at_-120px_120%,rgba(37,99,235,0.14),transparent_60%)]" />

      <div className="rounded-3xl border bg-white/80 backdrop-blur p-4 shadow-sm">
        <motion.svg
          viewBox={`0 0 ${vb.w} ${vb.h}`}
          role="img"
          aria-labelledby="flowTitle"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: 'visible' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: easeOut }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <title id="flowTitle">Products flow: StandardiziT → GoSeeiT → Resolvit/ImproviT</title>

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
              <path d={`M0,0 L${arrowSize},${arrowSize/2} L0,${arrowSize} Z`} fill={stroke} />
            </marker>

            {order.map((key) => (
              <clipPath key={`clip-${key}`} id={`clip-${key}`}>
                <circle cx={nodes[key].cx} cy={nodes[key].cy} r={r} />
              </clipPath>
            ))}
          </defs>

          {/* линии */}
          <motion.path
            d={pathStdToGsi}
            fill="none"
            stroke={stroke}
            strokeWidth={2.5}
            strokeLinecap="butt"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            markerEnd="url(#arrow)"
            {...draw(0.05)}
          />
          <motion.path
            d={pathGsiToRes}
            fill="none"
            stroke={stroke}
            strokeWidth={2.5}
            strokeLinecap="butt"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            markerEnd="url(#arrow)"
            {...draw(0.15)}
          />
          <motion.path
            d={pathGsiToImp}
            fill="none"
            stroke={stroke}
            strokeWidth={2.5}
            strokeLinecap="butt"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            markerEnd="url(#arrow)"
            {...draw(0.2)}
          />

          {/* узлы + LEARN MORE */}
          {order.map((key, i) => {
            const n = nodes[key];
            const titleY = n.cy + r + 28;
            const subY = n.cy + r + 56;
            const linkY = n.cy + r + 84;

            return (
              <motion.g key={key} {...pop(0.1 + i * 0.08)}>
                {/* изображение в круге */}
                <image
                  href={n.img}
                  x={n.cx - r}
                  y={n.cy - r}
                  width={2 * r}
                  height={2 * r}
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#clip-${key})`}
                />
                {/* белое кольцо */}
                <circle cx={n.cx} cy={n.cy} r={r} fill="transparent" stroke="#ffffff" strokeWidth="8" />

                {/* кликабельная область для текстов */}
                <a href={n.href} target="_self" className="cursor-pointer">
                  {/* хит-ареа побольше (удобно на мобилках) */}
                  <rect
                    x={n.cx - 150}
                    y={n.cy + r + 6}
                    width={300}
                    height={90}
                    fill="transparent"
                  />
                  <text x={n.cx} y={titleY} textAnchor="middle" fontWeight={800} fontSize="28" fill="#120b2b">
                    {n.title}
                  </text>
                  <text x={n.cx} y={subY} textAnchor="middle" fontSize="16" fill="#120b2bB3">
                    {n.sub}
                  </text>
                  {/* LEARN MORE → */}
                  <text
                    x={n.cx}
                    y={linkY}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight={700}
                    fill="#120b2b"
                    style={{ letterSpacing: 1.2, textTransform: 'uppercase' as any }}
                  >
                    LEARN MORE
                  </text>
                </a>
              </motion.g>
            );
          })}
        </motion.svg>
      </div>
    </section>
  );
}