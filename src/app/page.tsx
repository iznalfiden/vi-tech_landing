// === app/page.tsx ===
import React from 'react';
import LandingAnimated from '@/components/landing-animated';
import { createMetadata } from '@/lib/og';

export const metadata = createMetadata({
  title: 'Home',
  description: 'Vi-Tech provides Lean/AI software for operational excellence: GoSeeiT, StandardiziT, ResolviT, and ImproviT. Eliminate recurring problems, standardize best practices, and drive continuous improvement.',
  path: '/',
});

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <LandingAnimated />
    </div>
  );
}
