// === components/header.tsx ===
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import {
    Menu,
    ChevronDown,
    LayoutGrid,
    Search,
    Lightbulb,
    Settings,
    ChartCandlestick,
    ArrowRight,
} from 'lucide-react';

type ProductItem = {
    name: string;
    href: string;
    desc: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    gradient: string; // tailwind: 'from-... to-...'
};

export default function Header() {
    const pathname = usePathname();
    const [openSheet, setOpenSheet] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [prodOpen, setProdOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // ——— БЕЗ MeasuriT ———
    const products: ProductItem[] = useMemo(
        () => [
            {
                name: 'Overview',
                href: '/products',
                desc: 'Discover how our suite works together',
                Icon: LayoutGrid,
                gradient: 'from-indigo-700 to-indigo-500',
            },

            {
                name: 'GoSeeiT',
                href: '/products/goseeit',
                desc: 'Workplace Audit',
                Icon: Search,
                gradient: 'from-emerald-500 to-emerald-500',
            },
            {
                name: 'StandardiziT',
                href: '/products/standardizit',
                desc: 'Work Standards',
                Icon: ChartCandlestick,
                gradient: 'from-fuchsia-600 to-fuchsia-600',
            },
            {
                name: 'Resolvit',
                href: '/products/resolvit',
                desc: 'Drives & simplifies standardised problem solving',
                Icon: Settings,
                gradient: 'from-violet-600 to-violet-600',
            },
            {
                name: 'ImproviT',
                href: '/products/improvit',
                desc: 'Structured Idea Generation & Implementation',
                Icon: Lightbulb,
                gradient: 'from-amber-500 to-amber-500',
            },
        ],
        []
    );

    const productsActive = pathname?.startsWith('/products');

    // Разделяем Overview и остальные
    const [overview, ...productList] = products;

    return (
        <motion.header
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={cn(
                'sticky top-0 z-50 w-full backdrop-blur transition-colors',
                scrolled ? 'bg-white/80 border-b shadow-sm' : 'bg-white/50 border-transparent'
            )}
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-semibold cursor-pointer">
                    <Image src="/LOGO_V1.svg" alt="Brand logo" width={200} height={200} className="rounded" priority />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-1 md:flex">
                    {/* Products */}
                    <DropdownMenu open={prodOpen} onOpenChange={setProdOpen}>
                        <DropdownMenuTrigger asChild>
                            <button
                                className={cn(
                                    'group relative px-3 py-2 text-sm font-medium bg-transparent',
                                    'border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
                                    (productsActive || prodOpen) ? 'text-foreground' : 'text-foreground/80'
                                )}
                                aria-haspopup="menu"
                                aria-expanded={prodOpen}
                            >
                                <span className="inline-flex items-center gap-1">
                                    Products
                                    <motion.span
                                        animate={{ rotate: prodOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="inline-flex"
                                    >
                                        <ChevronDown className="h-4 w-4" />
                                    </motion.span>
                                </span>
                                <span
                                    className={cn(
                                        'pointer-events-none absolute left-2 right-2 -bottom-1 h-0.5 rounded-full bg-foreground transition-opacity',
                                        (productsActive || prodOpen) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                    )}
                                />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="start" className="w-[760px] p-3">
                            <DropdownMenuLabel className="px-2">Products</DropdownMenuLabel>

                            {/* Новая структура меню */}
                            <div className="mt-2 space-y-3">
                                {/* Широкая карточка Overview */}
                                <OverviewCard {...overview} />

                                {/* Сетка 2×2 остальных тулзов */}
                                <div className="grid grid-cols-2 gap-3">
                                    {productList.map((p) => (
                                        <ProductCard key={p.name} {...p} />
                                    ))}
                                </div>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <NavLink href="/about" activePath={pathname}>About</NavLink>
                    <NavLink href="/login" activePath={pathname}>Login</NavLink>

                    <Separator orientation="vertical" className="mx-1 h-6" />

                    <Button asChild className="ml-1 rounded-full px-4 shadow-sm hover:shadow-md transition-shadow">
                        <Link href="/book-demo" aria-label="Book a demo">Book a demo</Link>
                    </Button>
                </nav>

                {/* Mobile */}
                <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-80 p-0">
                        <SheetHeader className="sr-only">
                            <SheetTitle>Mobile navigation</SheetTitle>
                            <SheetDescription>Open site menu and product links</SheetDescription>
                        </SheetHeader>

                        <div className="flex h-16 items-center justify-between border-b px-4">
                            <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setOpenSheet(false)}>
                                <Image src="/logo.svg" alt="Brand logo" width={36} height={36} /> <span>Vi-Tech</span>
                            </Link>
                        </div>

                        <nav className="p-2">
                            <div className="px-2 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Products</div>

                            <ul className="px-2 space-y-2">
                                {/* Overview — первым пунктом */}
                                <li key={overview.name}>
                                    <Link
                                        href={overview.href}
                                        onClick={() => setOpenSheet(false)}
                                        className="grid grid-cols-[48px_1fr] items-center gap-3 rounded-xl px-3 py-3 hover:bg-accent active:bg-accent/70 transition-colors"
                                    >
                                        <span className={cn('grid place-items-center size-12 rounded-xl shrink-0 bg-gradient-to-br text-white shadow-md', overview.gradient)} aria-hidden="true">
                                            <overview.Icon className="size-6" strokeWidth={2} />
                                        </span>
                                        <div className="min-w-0 pt-0.5">
                                            <div className="text-sm font-medium leading-tight truncate">{overview.name}</div>
                                            <div className="text-xs text-muted-foreground leading-snug truncate">{overview.desc}</div>
                                        </div>
                                    </Link>
                                </li>

                                {productList.map((p) => (
                                    <li key={p.name}>
                                        <Link
                                            href={p.href}
                                            onClick={() => setOpenSheet(false)}
                                            className="grid grid-cols-[48px_1fr] items-center gap-3 rounded-xl px-3 py-3 hover:bg-accent active:bg-accent/70 transition-colors"
                                        >
                                            <span className={cn('grid place-items-center size-12 rounded-xl shrink-0 bg-gradient-to-br text-white shadow-md', p.gradient)} aria-hidden="true">
                                                <p.Icon className="size-6" strokeWidth={2} />
                                            </span>
                                            <div className="min-w-0 pt-0.5">
                                                <div className="text-sm font-medium leading-tight truncate">{p.name}</div>
                                                <div className="text-xs text-muted-foreground leading-snug truncate">{p.desc}</div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <Separator className="my-2" />

                            <Link href="/about" className="block rounded-xl px-3 py-2 hover:bg-accent" onClick={() => setOpenSheet(false)}>
                                About
                            </Link>
                            <Link href="/login" className="block rounded-xl px-3 py-2 hover:bg-accent" onClick={() => setOpenSheet(false)}>
                                Login
                            </Link>

                            <Button asChild className="mt-4 w-full rounded-2xl" onClick={() => setOpenSheet(false)}>
                                <Link href="/book-demo">Book a demo</Link>
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </motion.header>
    );
}

/* ——— Карточки ——— */

function OverviewCard({ name, href, desc, Icon, gradient }: ProductItem) {
    return (
        <Link
            href={href}
            className="group flex items-center gap-4 rounded-2xl bg-white/95 backdrop-blur p-4 shadow-sm ring-1 ring-black/5 hover:shadow-md hover:-translate-y-0.5 transition"
        >
            <span className={cn('grid place-items-center h-14 w-14 rounded-xl text-white shadow-md shrink-0 bg-gradient-to-br', gradient)}>
                <Icon className="h-6 w-6" />
            </span>
            <div className="flex-1">
                <div className="text-base font-semibold">{name}</div>
                <div className="mt-1 text-sm text-muted-foreground leading-snug">{desc}</div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
        </Link>
    );
}

function ProductCard({ name, href, desc, Icon, gradient }: ProductItem) {
    return (
        <Link
            href={href}
            className="group flex items-start gap-4 rounded-2xl bg-white/95 backdrop-blur p-4 shadow-sm ring-1 ring-black/5 hover:shadow-md hover:-translate-y-0.5 transition"
        >
            <span className={cn('grid place-items-center h-14 w-14 rounded-xl text-white shadow-md shrink-0 bg-gradient-to-br', gradient)}>
                <Icon className="h-6 w-6" />
            </span>
            <div>
                <div className="text-base font-semibold">{name}</div>
                <div className="mt-1 text-sm text-muted-foreground leading-snug">{desc}</div>
            </div>
        </Link>
    );
}

function NavLink({
    href,
    children,
    activePath,
}: {
    href: string;
    children: React.ReactNode;
    activePath: string | null;
}) {
    const active = !!activePath && (activePath === href || activePath.startsWith(href + '/'));

    return (
        <Link
            href={href}
            className={cn(
                'group relative px-3 py-2 text-sm font-medium',
                active ? 'text-foreground' : 'text-foreground/80 hover:text-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            )}
        >
            {children}
            <span
                className={cn(
                    'pointer-events-none absolute left-2 right-2 -bottom-1 h-0.5 rounded-full bg-foreground transition-opacity',
                    active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                )}
            />
        </Link>
    );
}