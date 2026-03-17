// components/seo-scripts.tsx
import Script from 'next/script';

/**
 * Preconnect to external domains for faster loading
 * Add to layout.tsx <head>
 */
export function PreconnectLinks() {
  return (
    <>
      {/* Google Fonts (если будете использовать) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Analytics domains */}
      <link rel="preconnect" href="https://va.vercel-scripts.com" />
      
      {/* DNS prefetch для внешних ресурсов */}
      <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
    </>
  );
}

/**
 * Google Analytics 4 (если нужно)
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

/**
 * Microsoft Clarity (аналитика поведения пользователей)
 */
export function MicrosoftClarity({ projectId }: { projectId: string }) {
  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `}
    </Script>
  );
}
