import type { Metadata } from 'next';
import BookDemoClient from './BookDemoClient';

export const metadata: Metadata = {
  title: 'Book a demo',
  description: 'Request a Vi-Tech demo: First name, Last name, Company, Email and Message.',
};

export default function Page() {
  return <BookDemoClient />;
}