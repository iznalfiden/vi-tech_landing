// app/products/resolvit/page.tsx
import ResolvITClient from './ResolvitClient';
import { createMetadata } from '@/lib/og';

export const metadata = createMetadata({
  title: 'ResolviT – Structured Problem Solving',
  description: 'AI-powered standardized problem solving with A3/8D methodology. Intake from GoSeeiT, analyze root causes, run countermeasures and track actions in one flow.',
  path: '/products/resolvit',
});

export default function Page() {
  return <ResolvITClient />;
}