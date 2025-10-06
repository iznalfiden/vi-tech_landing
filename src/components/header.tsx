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
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Menu, ChevronDown, Wrench, BarChart3, ClipboardList, Lightbulb } from 'lucide-react';

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

  const products = useMemo(
    () => [
      { name: 'StandardiziT', href: '/products/standardizit', desc: 'Work standards, SWC', Icon: Wrench },
      { name: 'Yamazumi', href: '/products/yamazumi', desc: 'Operations balancing', Icon: BarChart3 },
      { name: 'GoSeeIt', href: '/products/goseeit', desc: 'Tiered audits / checks', Icon: ClipboardList },
      { name: 'ImproviT', href: '/products/improvit', desc: 'Ideas & improvements', Icon: Lightbulb },
    ],
    []
  );

  const productsActive = pathname?.startsWith('/products');

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
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/LOGO_V1.svg" alt="Brand logo" width={200} height={200} className="rounded" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {/* Products — мини-мегаменю с индикатором и анимированной стрелкой */}
          <DropdownMenu open={prodOpen} onOpenChange={setProdOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'group relative px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  'hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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

                {/* underline-indicator */}
                <span
                  className={cn(
                    'pointer-events-none absolute left-2 right-2 -bottom-1 h-0.5 rounded-full bg-foreground transition-opacity',
                    (productsActive || prodOpen) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  )}
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-[540px] p-2">
              <DropdownMenuLabel className="px-2">Products</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid grid-cols-2 gap-2">
                {products.map(({ name, href, desc, Icon }) => (
                  <Link key={name} href={href} className="rounded-lg p-3 hover:bg-accent transition-colors">
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">{name}</div>
                        <div className="text-xs text-muted-foreground">{desc}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between px-2">
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                >
                  View all products
                </Link>
                <Button asChild size="sm" variant="outline">
                  <Link href="/book-demo">Book a demo</Link>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* About / Login — улучшенные ссылки с индикатором */}
          <NavLink href="/about" activePath={pathname}>About</NavLink>
          <NavLink href="/login" activePath={pathname}>Login</NavLink>

          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* CTA — мягкая пилюля с тенью */}
          <Button
            asChild
            className="ml-1 rounded-full px-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href="/book-demo" aria-label="Book a demo">
              Book a demo
            </Link>
          </Button>
        </nav>

        {/* Mobile toggle (оставил без изменений визуально) */}
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0">
            <div className="flex h-16 items-center justify-between border-b px-4">
              <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setOpenSheet(false)}>
                <Image src="/logo.svg" alt="Brand logo" width={24} height={24} className="h-6 w-6" /> <span>Brand</span>
              </Link>
              <Button asChild size="sm" className="rounded-2xl" onClick={() => setOpenSheet(false)}>
                <Link href="/book-demo">Book a demo</Link>
              </Button>
            </div>
            <nav className="p-2">
              <div className="px-2 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Products</div>
              <ul className="px-2 space-y-1">
                {products.map((p) => (
                  <li key={p.name}>
                    <Link href={p.href} className="block rounded-xl px-3 py-2 hover:bg-accent" onClick={() => setOpenSheet(false)}>
                      <div className="flex items-center gap-3">
                        <p.Icon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{p.desc}</div>
                        </div>
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

/** Ссылка навигации с красивым индикатором */
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
        'group relative px-3 py-2 text-sm font-medium rounded-md transition-colors',
        'hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        active ? 'text-foreground' : 'text-foreground/80'
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