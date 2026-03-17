// app/products/page.tsx
import ProductsClient from './ProductsClient';
import { createMetadata } from '@/lib/og';

export const metadata = createMetadata({
  title: 'Products',
  description: 'Explore the Vi-Tech product suite: GoSeeiT for workplace audits, StandardiziT for process standardization, ResolviT for problem solving, and ImproviT for idea management.',
  path: '/products',
});

export default function Page() {
  return <ProductsClient />;
}
