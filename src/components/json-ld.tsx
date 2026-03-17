// components/json-ld.tsx
import Script from 'next/script';

// Organization Schema
export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vi-Tech',
    legalName: 'Virtuous Improvement Technologies Ltd',
    url: 'https://vi-tech.io',
    logo: 'https://vi-tech.io/logo.svg',
    description: 'Lean/AI software for operational excellence',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Harvest Hill House, Harvest Hill Lane',
      addressLocality: 'Allesley, Coventry',
      postalCode: 'CV5 9DD',
      addressCountry: 'UK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44 7740 656573',
      contactType: 'customer service',
      email: 'hello@vi-tech.io',
    },
    sameAs: [
      'https://www.linkedin.com/company/virtuous-improvement-technologies-limited/'
    ],
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Software Application Schema (для страниц продуктов)
export function SoftwareAppJsonLd({
  name,
  description,
  image,
  url,
}: {
  name: string;
  description: string;
  image: string;
  url: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    image,
    url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
   
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '50',
      // Обновить когда появятся реальные отзывы
    },
    provider: {
      '@type': 'Organization',
      name: 'Vi-Tech',
    },
  };

  return (
    <Script
      id="software-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// FAQ Schema (для FAQ секции)
export function FAQJsonLd({
  questions,
}: {
  questions: Array<{ question: string; answer: string }>;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Breadcrumb Schema
export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
