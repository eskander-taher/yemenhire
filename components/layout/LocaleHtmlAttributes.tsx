"use client";

import { useEffect } from "react";

interface LocaleHtmlAttributesProps {
  locale: string;
}

export function LocaleHtmlAttributes({ locale }: LocaleHtmlAttributesProps) {
  useEffect(() => {
    const html = document.documentElement;
    const isRTL = locale === "ar";
    
    // Set language
    html.setAttribute("lang", locale);
    
    // Set direction
    html.setAttribute("dir", isRTL ? "rtl" : "ltr");
    
    // Add canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.setAttribute("href", `https://yemenhires.com/${locale}`);
    } else {
      const canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = `https://yemenhires.com/${locale}`;
      document.head.appendChild(canonical);
    }
    
    // Add hreflang links
    const hreflangLinks = [
      { lang: "ar", href: "https://yemenhires.com/ar" },
      { lang: "en", href: "https://yemenhires.com/en" },
      { lang: "x-default", href: "https://yemenhires.com/ar" },
    ];
    
    // Remove existing hreflang links
    document.querySelectorAll('link[rel="alternate"]').forEach((link) => link.remove());
    
    // Add new hreflang links
    hreflangLinks.forEach(({ lang, href }) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hrefLang = lang;
      link.href = href;
      document.head.appendChild(link);
    });
  }, [locale]);

  return null;
}

