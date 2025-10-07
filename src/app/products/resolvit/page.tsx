// app/products/resolvit/page.tsx
import type { Metadata } from 'next';
import ResolvITClient from './ResolvitClient';

export const metadata: Metadata = {
  title: 'ResolvIT — structured problem solving & action tracking',
  description:
    'Intake from GoSeeiT, Yamazumi, and Takt Config; analyze root cause (A3/8D), run countermeasures, approvals, and update standards — in one flow.',
};

export default function Page() {
  return <ResolvITClient />;
}