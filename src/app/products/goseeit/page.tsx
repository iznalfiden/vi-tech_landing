// app/products/goseeit/page.tsx
import type { Metadata } from 'next';
import GoSeeiTClient from './GoSeeiTClient';

export const metadata: Metadata = {
  title: 'GoSeeiT — Workplace Audit',
  description: 'Стандартизированные обходы, фиксация проблем и быстрые улучшения.',
};

export default function Page() {
  return <GoSeeiTClient />;
}