import { DefaultSeoProps } from 'next-seo';

// Динамический OG image URL — генерируется автоматически через /api/og
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vi-tech.io';

const config: DefaultSeoProps = {
  defaultTitle: 'Vi-Tech – Operational Excellence Software',
  titleTemplate: '%s – Vi-Tech',
  description: 'Virtuous Improvement Technologies provides Lean/AI software for manufacturing: GoSeeiT, StandardiziT, ResolviT, ImproviT. Eliminate recurring problems, standardise best practices, and drive continuous improvement.',
  canonical: siteUrl,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Vi-Tech',
    images: [
      { 
        url: `${siteUrl}/api/og?title=Vi-Tech&description=Operational%20Excellence%20Software`, 
        width: 1200, 
        height: 630,
        alt: 'Vi-Tech – Operational Excellence Software'
      }
    ],
  },
  twitter: { 
    handle: '@vitech_io',
    site: '@vitech_io',
    cardType: 'summary_large_image' 
  },
  additionalMetaTags: [
    { name: 'keywords', content: 'operational excellence, lean manufacturing, continuous improvement, problem solving, standardized work, GoSeeiT, StandardiziT, ResolviT, ImproviT, manufacturing software' },
    { name: 'author', content: 'Vi-Tech' },
    { name: 'theme-color', content: '#120E2F' },
  ],
  additionalLinkTags: [
    { rel: 'icon', href: '/logo.svg' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'manifest', href: '/site.webmanifest' },
  ],
};

export default config;