// components/breadcrumbs.tsx
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Не показываем на главной
  if (items.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="py-4 text-sm text-muted-foreground"
    >
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link 
            href="/" 
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.href} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              
              {isLast ? (
                <span 
                  className="text-foreground font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Хелпер для создания breadcrumb items для страниц
export const breadcrumbItems = {
  home: { label: 'Home', href: '/' },
  products: { label: 'Products', href: '/products' },
  services: { label: 'Services', href: '/services' },
  about: { label: 'About', href: '/about' },
  'book-demo': { label: 'Book a Demo', href: '/book-demo' },
  privacy: { label: 'Privacy Policy', href: '/privacy' },
  gdpr: { label: 'GDPR', href: '/gdpr' },
  copyright: { label: 'Copyright', href: '/copyright' },
  goseeit: { label: 'GoSeeiT', href: '/products/goseeit' },
  standardizit: { label: 'StandardiziT', href: '/products/standardizit' },
  resolvit: { label: 'ResolviT', href: '/products/resolvit' },
  improvit: { label: 'ImproviT', href: '/products/improvit' },
};
