// app/products/goseeit/page.tsx
import GoSeeiTClient from './GoSeeiTClient';
import { createMetadata } from '@/lib/og';

export const metadata = createMetadata({
  title: 'GoSeeiT – Workplace Audit',
  description: 'Standardized workplace audits, issue capture and quick improvements. GoSeeiT helps teams verify process adherence and identify opportunities for improvement.',
  path: '/products/goseeit',
});

export default function Page() {
  return <GoSeeiTClient />;
}