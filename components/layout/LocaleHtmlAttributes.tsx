"use client";

import { useEffect } from "react";

interface LocaleHtmlAttributesProps {
  locale: string;
}

export function LocaleHtmlAttributes({ locale }: LocaleHtmlAttributesProps) {
  useEffect(() => {
    const html = document.documentElement;
    const isRTL = locale === "ar";
    
    // Set language and direction
    html.setAttribute("lang", locale);
    html.setAttribute("dir", isRTL ? "rtl" : "ltr");
    
    // Track elements we add for cleanup
    const addedElements: Element[] = [];
    
    // Handle canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalLink) {
      canonicalLink.setAttribute("href", `https://yemenhires.com/${locale}`);
    } else {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      canonicalLink.href = `https://yemenhires.com/${locale}`;
      canonicalLink.setAttribute("data-locale-managed", "true");
      document.head.appendChild(canonicalLink);
      addedElements.push(canonicalLink);
    }
    
    // Remove old hreflang links safely
    document.querySelectorAll('link[rel="alternate"][hreflang][data-locale-managed="true"]').forEach((el) => {
      try {
        if (el.isConnected) {
          el.remove();
        }
      } catch (e) {
        // Ignore any errors during removal
      }
    });
    
    // Add hreflang links
    const hreflangLinks = [
      { lang: "ar", href: "https://yemenhires.com/ar" },
      { lang: "en", href: "https://yemenhires.com/en" },
      { lang: "x-default", href: "https://yemenhires.com/ar" },
    ];
    
    hreflangLinks.forEach(({ lang, href }) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lang;
      link.href = href;
      link.setAttribute("data-locale-managed", "true");
      document.head.appendChild(link);
      addedElements.push(link);
    });
    
    // Cleanup function
    return () => {
      // Small delay to prevent race conditions during navigation
      setTimeout(() => {
        try {
          // Reset to default
          if (document.documentElement) {
            document.documentElement.setAttribute("lang", "en");
            document.documentElement.setAttribute("dir", "ltr");
          }
          
          // Remove added elements using modern .remove() API
          addedElements.forEach((el) => {
            try {
              if (el && el.isConnected) {
                el.remove();
              }
            } catch (e) {
              // Silently ignore any errors
            }
          });
        } catch (e) {
          // Silently ignore cleanup errors
        }
      }, 100); // 100ms delay to avoid race conditions
    };
  }, [locale]);

  return null;
}

