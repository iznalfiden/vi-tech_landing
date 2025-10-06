// === app/page.tsx ===
import React from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import LandingAnimated from '@/components/landing-animated';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />
      <LandingAnimated />
      <footer className="border-t py-10 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Brand. All rights reserved.</footer>
    </div>
  );
}
