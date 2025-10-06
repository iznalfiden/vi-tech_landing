// app/products/standardizit/page.tsx
import type { Metadata } from 'next';
import StandardiziTClient from './StandardiziTClient';

export const metadata: Metadata = {
  title: 'StandardiziT — Process Standardization',
  description:
    'Создание, переводы и согласования стандартных процессов: шаги, WES-подшаги, медиа, документы, PPE/оборудование и approvals с контент-хешем.',
};

export default function Page() {
  return <StandardiziTClient />;
}