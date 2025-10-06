import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  defaultTitle: 'Brand — Lean/AI for Manufacturing',
  description: 'Reduce losses and accelerate production with takt time, Yamazumi, and loss control.',
  openGraph: {
    type: 'website',
    siteName: 'Brand',
    images: [{ url: 'https://example.com/og.jpg', width: 1200, height: 630 }],
  },
  twitter: { cardType: 'summary_large_image' }
};

export default config;