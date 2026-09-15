import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_SITE_TITLE, DEFAULT_SITE_DESC, DEFAULT_SITE_URL, DEFAULT_OG_IMAGE, SEO_KEYWORDS } from '../../utils/seoKeywords';

/**
 * High-performance, lightweight React SEO Manager for Google Indexing & Rich Results
 */
export const SEO = ({
  title,
  description = DEFAULT_SITE_DESC,
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  canonicalUrl,
  type = 'website',
  schemaJson = null,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
}) => {
  const location = useLocation();
  const currentUrl = canonicalUrl || `${DEFAULT_SITE_URL}${location.pathname}`;
  const fullTitle = title 
    ? (title.includes('Area 93.5 FM') ? title : `${title} | Area 93.5 FM Lagos`) 
    : DEFAULT_SITE_TITLE;

  // Combine provided keywords with core Lagos radio keywords
  const combinedKeywords = Array.from(new Set([
    ...keywords,
    ...SEO_KEYWORDS.primary,
    ...SEO_KEYWORDS.local
  ])).join(', ');

  useEffect(() => {
    // 1. Set Document Title
    document.title = fullTitle;

    // Helper to safely set meta tag
    const setMetaTag = (attrName, attrVal, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set link tags (e.g. canonical)
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Standard Search Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', combinedKeywords);
    setMetaTag('name', 'robots', robots);
    setMetaTag('name', 'author', '93.5 Area FM Lagos');
    setMetaTag('name', 'application-name', 'Area 93.5 FM');
    
    // Lagos Geo-targeting Meta Tags
    setMetaTag('name', 'geo.region', 'NG-LA');
    setMetaTag('name', 'geo.placename', 'Ikeja, Lagos, Nigeria');
    setMetaTag('name', 'geo.position', '6.6212;3.3541');
    setMetaTag('name', 'ICBM', '6.6212, 3.3541');

    // 3. Canonical URL
    setLinkTag('canonical', currentUrl);

    // 4. OpenGraph (Facebook, WhatsApp, LinkedIn, Telegram)
    setMetaTag('property', 'og:site_name', 'Area 93.5 FM Lagos');
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:locale', 'en_NG');

    // 5. Twitter / X Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', '@area935fm');
    setMetaTag('name', 'twitter:creator', '@area935fm');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    // 6. Schema.org JSON-LD Structured Data
    const scriptId = 'google-schema-jsonld';
    let scriptElement = document.getElementById(scriptId);

    if (schemaJson) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(schemaJson);
    } else if (scriptElement) {
      scriptElement.remove();
    }

    return () => {
      // Optional cleanups if needed
    };
  }, [fullTitle, description, combinedKeywords, currentUrl, image, type, schemaJson, robots]);

  return null;
};
