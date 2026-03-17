import BookDemoClient from './BookDemoClient';
import { createMetadata } from '@/lib/og';

export const metadata = createMetadata({
  title: 'Book a Demo',
  description: 'Request a personalized demo of Vi-Tech operational excellence software. See how GoSeeiT, StandardiziT, ResolviT and ImproviT can transform your business.',
  path: '/book-demo',
});

export default function Page() {
  return <BookDemoClient />;
}