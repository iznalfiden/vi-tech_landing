// app/products/standardizit/page.tsx
import StandardiziTClient from './StandardiziTClient';
import { createMetadata } from '@/lib/og';

export const metadata = createMetadata({
  title: 'StandardiziT – Process Standardization',
  description: 'Create, translate and approve standardized processes: steps, sub-steps, media, documents, PPE/equipment and approvals with content hashing.',
  path: '/products/standardizit',
});

export default function Page() {
  return <StandardiziTClient />;
}