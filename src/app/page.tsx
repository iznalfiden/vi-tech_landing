// === app/page.tsx ===
import React from 'react';
import Header from '@/components/header';
import LandingAnimated from '@/components/landing-animated';
import Footer from '@/components/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />
      <LandingAnimated />
      <Footer />
    </div>
  );
}
