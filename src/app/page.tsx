// === app/page.tsx ===
import React from 'react';
import LandingAnimated from '@/components/landing-animated';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <LandingAnimated />
    </div>
  );
}
