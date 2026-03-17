// lib/og.ts - Helper for generating OG image URLs

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vi-tech.io';

interface OGImageParams {
  title: string;
  description?: string;
}

/**
 * Generate OG image URL with custom title and description
 * 
 * Example:
 * ```ts
 * export const metadata: Metadata = {
 *   openGraph: {
 *     images: [ogImage({ title: "About Us", description: "Learn more about our company" })],
 *   },
 * };
 * ```
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
 * Full metadata helper for pages
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
}: OGImageParams & { path?: string }): {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    images: ReturnType<typeof ogImage>[];
  };
  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string;
    images: string[];
  };
} {
  const og = ogImage({ title: `Vi-Tech – ${title}`, description });
  
  return {
    title,
    description,
    openGraph: {
      title: `Vi-Tech – ${title}`,
      description,
      url: `${siteUrl}${path}`,
      images: [og],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Vi-Tech – ${title}`,
      description,
      images: [og.url],
    },
  };
}
