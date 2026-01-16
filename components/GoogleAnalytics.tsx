'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_MEASUREMENT_ID = 'G-TJKJ1NRBSF';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Wait for gtag to be available, then send pageview
    const sendPageview = () => {
      if ((window as any).gtag) {
        (window as any).gtag('config', GA_MEASUREMENT_ID, {
          page_path: url,
          page_location: window.location.href,
        });
      } else {
        // Retry after a short delay if gtag is not ready
        setTimeout(sendPageview, 100);
      }
    };

    sendPageview();
  }, [pathname, searchParams]);

  return null;
}
