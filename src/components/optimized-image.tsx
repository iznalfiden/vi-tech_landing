// components/optimized-image.tsx
import Image from 'next/image';
import { ComponentProps } from 'react';

interface OptimizedImageProps extends Omit<ComponentProps<typeof Image>, 'alt'> {
  alt: string; // Делаем alt обязательным
  caption?: string;
}

/**
 * Optimized Image component with SEO best practices
 * - Requires alt text (accessibility & SEO)
 * - Proper loading strategy
 * - Caption support
 */
export function OptimizedImage({
  alt,
  caption,
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <figure className={className}>
      <Image
        {...props}
        alt={alt}
        // Приоритет для LCP (Largest Contentful Paint) изображений
        // Используй priority для первого видимого изображения на странице
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Hero image with priority loading (for LCP optimization)
 */
export function HeroImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      priority
      loading="eager"
    />
  );
}

/**
 * Lazy loaded image for below-the-fold content
 */
export function LazyImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      loading="lazy"
    />
  );
}
