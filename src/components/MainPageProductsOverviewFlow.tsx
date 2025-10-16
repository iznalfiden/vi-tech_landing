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
    href,
    x,
    y,
    size,
    maskId,
    bleed = 1.25,
}: {
    href: string;
    x: number;
    y: number;
    size: number;
    maskId: string;
    bleed?: number;
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

type Props = {
    /** Встроенный режим (без своего section/фона) */
    embed?: boolean;
    /** Подпись-чип сверху (опционально) */
    overline?: string;
    /** Доп. классы для внешнего контейнера в embed-режиме */
    className?: string;
};

export default function MainPageProductsOverviewFlow({
    embed = false,
    overline = 'Product flow overview',
    className = '',
}: Props) {
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

    // ——— фон без «шва»: широкие орбы + маска плавного затухания по краям
    const gradientOverscanClass =
        'pointer-events-none absolute -z-10 left-1/2 -translate-x-1/2 ' +
        'w-[140vw] -top-24 -bottom-24 ' +
        'bg-[radial-gradient(1400px_700px_at_95%_-160px,rgba(139,92,246,0.20),transparent_65%),' +
        'radial-gradient(1000px_560px_at_-120px_120%,rgba(37,99,235,0.16),transparent_65%)]';

    const gradientMaskStyle: React.CSSProperties = {
        WebkitMaskImage:
            'linear-gradient(to right, transparent 0, white 8%, white 92%, transparent 100%)',
        maskImage:
            'linear-gradient(to right, transparent 0, white 8%, white 92%, transparent 100%)',
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

            {/* ====== MOBILE ====== */}
            <div className="md:hidden">
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
                                transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.03 }}
                                className="relative flex gap-4 py-3"
                            >
                                {!isLast && (
                                    <span className="absolute left-7 top-14 bottom-[-12px] w-px bg-gradient-to-b from-white/25 to-transparent" />
                                )}

                                <span className="shrink-0 grid place-items-center size-14 rounded-full overflow-hidden">
                                    <img
                                        src={n.img}
                                        alt=""
                                        width={2 * r}
                                        height={2 * r}
                                        className="h-full w-full object-cover mix-blend-normal"
                                        loading="lazy"
                                    />
                                </span>

                                <div className="flex-1 pt-1 pb-6">
                                    <div className="flex items-center gap-2 font-extrabold text-lg text-white">
                                        <Icon className="size-5" color={iconColorByKey[key]} aria-hidden />
                                        {n.title}
                                    </div>
                                    <div className="text-sm text-white/75">{n.sub}</div>
                                    <a
                                        href={n.href}
                                        className="mt-2 inline-block text-xs font-semibold tracking-wider uppercase text-white/90 hover:text-white"
                                    >
                                        Learn more →
                                    </a>
                                </div>
                            </motion.li>
                        );
                    })}
                </ol>
            </div>

            {/* ====== DESKTOP ====== */}
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

                {/* подписи по центру под аватаром */}
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
            {/* ——— VALUE CARDS ——— */}
            <div className="relative mt-16 md:mt-20">
                {/* мягкие орбы на фоне, без швов */}


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
                            className="
          group relative flex h-full items-center justify-center
          rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-sm
          p-6 md:p-8
          transition
        "
                        >
                            {/* акцент при ховере */}
                            <span
                                className="pointer-events-none absolute inset-x-0 -top-16 h-32 opacity-0 blur-md transition-opacity duration-300
                     bg-gradient-to-b from-violet-300/25 to-transparent"
                                aria-hidden
                            />

                            <div className="flex flex-col items-center text-center">
                                <span
                                    className="
              mb-4 grid place-items-center size-12 md:size-14 rounded-xl
              text-white ring-1 ring-white/20 shadow-lg
              bg-gradient-to-br from-violet-600 to-indigo-500
            "
                                >
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
            {/* широкий фон с маской — без видимых границ справа/слева */}
            <div className={gradientOverscanClass} style={gradientMaskStyle} />
            {content}
        </section>
    );
}