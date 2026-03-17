// app/robots.ts
import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vi-tech.io';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/api/',        // API endpoints
          '/_next/',      // Next.js internals
          '/*.json$',     // JSON files
          '/private/',    // Если есть приватные страницы
        ],
      },
      {
        // Специальные правила для Google
        userAgent: 'Googlebot',
        allow: ['/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
