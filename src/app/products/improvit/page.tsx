// app/products/improvit/page.tsx
import ImproviTClient from './ImproviTClient';
import { createMetadata } from '@/lib/og';

export const metadata = createMetadata({
  title: 'ImproviT – Idea Generation & Implementation',
  description: 'Structured idea collection, prioritization and implementation with result tracking. Empower every employee to contribute to continuous improvement.',
  path: '/products/improvit',
});

export default function Page() {
  return <ImproviTClient />;
}