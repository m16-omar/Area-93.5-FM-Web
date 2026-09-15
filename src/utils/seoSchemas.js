import { DEFAULT_SITE_URL, DEFAULT_OG_IMAGE } from './seoKeywords';

/**
 * Generate Schema.org JSON-LD structured data for Google Rich Results
 */

export const getRadioStationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "RadioStation",
  "@id": `${DEFAULT_SITE_URL}/#radiostation`,
  "name": "Area 93.5 FM Lagos",
  "alternateName": ["93.5 Area FM", "Area FM", "City 105.1 FM / Area 93.5 FM"],
  "url": DEFAULT_SITE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": DEFAULT_OG_IMAGE,
    "width": 600,
    "height": 200
  },
  "image": DEFAULT_OG_IMAGE,
  "description": "Lagos' No.1 Pidgin English radio station broadcasting 24/7 urban music, news, sports, street culture, and talk shows live on 93.5 MHz FM and streaming online worldwide.",
  "broadcastFrequency": "93.5 MHz FM",
  "broadcastChannelId": "93.5 FM",
  "broadcastAffiliation": "City Media Group / Area 93.5 FM",
  "genre": ["Urban Music", "Afrobeats", "News & Talk", "Pidgin English Broadcast", "Street Culture"],
  "inLanguage": ["pcm", "en", "yo"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Plot 2 Lateef Jakande Road, Agidingbi, Ikeja",
    "addressLocality": "Ikeja",
    "addressRegion": "Lagos State",
    "postalCode": "100271",
    "addressCountry": "NG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 6.6212,
    "longitude": 3.3541
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Lagos Mainland" },
    { "@type": "AdministrativeArea", "name": "Ikeja" },
    { "@type": "AdministrativeArea", "name": "Lekki" },
    { "@type": "AdministrativeArea", "name": "Victoria Island" },
    { "@type": "AdministrativeArea", "name": "Lagos Island" },
    { "@type": "Country", "name": "Nigeria" }
  ],
  "sameAs": [
    "https://instagram.com/area935fm",
    "https://twitter.com/area935fm",
    "https://facebook.com/area935fm",
    "https://youtube.com/@area935fm",
    "https://tiktok.com/@area935fm"
  ],
  "telephone": "+234800000935",
  "priceRange": "Free"
});

export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${DEFAULT_SITE_URL}/#website`,
  "url": DEFAULT_SITE_URL,
  "name": "Area 93.5 FM Lagos",
  "description": "Listen to Area 93.5 FM live - Lagos' best pidgin radio for news, entertainment, sports & morning shows. Stream online 24/7.",
  "publisher": {
    "@id": `${DEFAULT_SITE_URL}/#radiostation`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${DEFAULT_SITE_URL}/news?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});

export const getBreadcrumbSchema = (crumbs = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": crumbs.map((crumb, idx) => ({
    "@type": "ListItem",
    "position": idx + 1,
    "name": crumb.name,
    "item": crumb.url.startsWith('http') ? crumb.url : `${DEFAULT_SITE_URL}${crumb.url}`
  }))
});

export const getArticleSchema = (article, pageUrl) => ({
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": pageUrl || DEFAULT_SITE_URL
  },
  "headline": article?.title || "Lagos News & Radio Update",
  "description": article?.excerpt || article?.content?.substring(0, 160) || "Breaking entertainment, music, and city news from Area 93.5 FM Lagos.",
  "image": [
    article?.heroImage || article?.image || DEFAULT_OG_IMAGE
  ],
  "datePublished": article?.date ? new Date(article.date).toISOString() : new Date().toISOString(),
  "dateModified": new Date().toISOString(),
  "author": {
    "@type": "Person",
    "name": article?.author || "Area 93.5 FM Editorial Desk"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Area 93.5 FM Lagos",
    "logo": {
      "@type": "ImageObject",
      "url": DEFAULT_OG_IMAGE
    }
  },
  "articleSection": article?.category || "NEWS"
});

export const getShowSchema = (show, pageUrl) => ({
  "@context": "https://schema.org",
  "@type": "RadioSeries",
  "@id": pageUrl,
  "name": show?.title || show?.name,
  "url": pageUrl,
  "description": show?.description || `Listen to ${show?.title || show?.name} live on Area 93.5 FM Lagos.`,
  "genre": show?.category || show?.genre || "Radio Show",
  "actor": {
    "@type": "Person",
    "name": show?.host || show?.dj || show?.presenter || "Area 93.5 FM On-Air Personality"
  },
  "productionCompany": {
    "@id": `${DEFAULT_SITE_URL}/#radiostation`
  }
});

export const getPodcastSchema = (podcast, pageUrl) => ({
  "@context": "https://schema.org",
  "@type": "PodcastEpisode",
  "@id": pageUrl,
  "name": podcast?.title || "Area 93.5 FM Podcast Episode",
  "description": podcast?.description || "Listen to Area 93.5 FM podcasts exploring Nigerian music, street culture, politics, and celebrity talk in Lagos.",
  "url": pageUrl,
  "partOfSeries": {
    "@type": "PodcastSeries",
    "name": "Area 93.5 FM Podcasts",
    "url": `${DEFAULT_SITE_URL}/podcasts`
  },
  "author": {
    "@type": "Person",
    "name": podcast?.host || podcast?.presenter || "Area 93.5 FM"
  }
});

export const getHostSchema = (host, pageUrl) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": pageUrl,
  "name": host?.name,
  "jobTitle": host?.role || "On-Air Personality & Radio Presenter",
  "worksFor": {
    "@id": `${DEFAULT_SITE_URL}/#radiostation`
  },
  "image": host?.photo || DEFAULT_OG_IMAGE,
  "description": host?.bio || `Meet ${host?.name}, on-air host and presenter at Area 93.5 FM Lagos.`,
  "url": pageUrl
});
