// app/products/improvit/page.tsx
import type { Metadata } from 'next';
import ImproviTClient from './ImproviTClient';

export const metadata: Metadata = {
  title: 'ImproviT — Idea Generation & Implementation',
  description: 'Структурированный сбор идей, приоритизация и внедрение с отслеживанием результата.',
};

export default function Page() {
  return <ImproviTClient />;
}