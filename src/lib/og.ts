// lib/og.ts - Helper for generating OG image URLs and SEO metadata

import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vi-tech.io';

interface OGImageParams {
  title: string;
  description?: string;
}

interface CreateMetadataParams extends OGImageParams {
  path?: string;
  noIndex?: boolean;
}

/**
 * Generate OG image URL with custom title and description
 */
export function ogImage({ title, description = 'Operational Excellence Software' }: OGImageParams) {
  const params = new URLSearchParams();
  params.set('title', title);
  params.set('description', description);
  
  return {
    url: `${siteUrl}/api/og?${params.toString()}`,
    width: 1200,
    height: 630,
    alt: title,
  };
}

/**
 * Full metadata helper for pages with SEO best practices
 * 
 * Example:
 * ```ts
 * export const metadata = createMetadata({
 *   title: "Products",
 *   description: "Our product suite",
 *   path: "/products",
 * });
 * ```
 */
export function createMetadata({
  title,
  description = 'Operational Excellence Software',
  path = '',
  noIndex = false,
}: CreateMetadataParams): Metadata {
  const og = ogImage({ title: `Vi-Tech – ${title}`, description });
  const url = `${siteUrl}${path}`;
  
  return {
    title,
    description,
    // Canonical URL - важно для SEO
    alternates: {
      canonical: url,
      // Hreflang для мультиязычности (когда будет RU версия)
      languages: {
        'en-US': url,
        // 'ru-RU': `${siteUrl}/ru${path}`,
      },
    },
    // Open Graph
    openGraph: {
      title: `Vi-Tech – ${title}`,
      description,
      url,
      siteName: 'Vi-Tech',
      type: 'website',
      locale: 'en_US',
      images: [og],
    },
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: `Vi-Tech – ${title}`,
      description,
      images: [og.url],
    },
    // Robots - управление индексацией
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

/**
 * Create metadata for product pages
 */
export function createProductMetadata({
  title,
  description,
  path,
}: OGImageParams & { path: string }): Metadata {
  return createMetadata({ title, description, path });
}
