import defaultNewsData from '../data/newsData.json';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
const CLOUDINARY_CLOUD_NAME = 'dgjzsen3g';

/**
 * Base API URL candidate list to handle direct 127.0.0.1, localhost, and proxy seamlessly
 */
const getApiCandidates = () => {
  const list = [API_BASE_URL, 'http://127.0.0.1:8000', 'http://localhost:8000', ''];
  return [...new Set(list.filter(item => item !== undefined))];
};

/**
 * Helper to perform fetch against candidates until one responds with ok
 */
const fetchFromCandidates = async (endpointPath, options = {}) => {
  const candidates = getApiCandidates();
  let lastError = null;

  for (const base of candidates) {
    const cleanBase = base ? base.replace(/\/+$/, '') : '';
    const cleanPath = endpointPath.startsWith('/') ? endpointPath : `/${endpointPath}`;
    const fullUrl = `${cleanBase}${cleanPath}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(fullUrl, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        return res;
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error(`Failed to fetch ${endpointPath} from all API candidates`);
};

/**
 * Ensures image URLs from Django media or Cloudinary are valid, fully accessible URLs
 */
export const getFullImageUrl = (imagePath) => {
  if (!imagePath) {
    return 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80';
  }

  // Already a Cloudinary URL or complete web URL
  if (typeof imagePath === 'string' && (imagePath.startsWith('https://res.cloudinary.com') || imagePath.startsWith('https://images.unsplash.com'))) {
    return imagePath;
  }

  // Specific known Cloudinary media IDs from city backend database
  if (imagePath.includes('1_qgonoh')) {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/media/news/1_qgonoh`;
  }
  if (imagePath.includes('Omah_Lay_eizghq')) {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/media/news/Omah_Lay_eizghq`;
  }
  if (imagePath.includes('Apostle_ebqvvx')) {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/media/news/Apostle_ebqvvx`;
  }

  // Generic Cloudinary public ID stored as media/news/<hash>
  const match = String(imagePath).match(/media\/news\/([a-zA-Z0-9_-]+)/);
  if (match) {
    const filename = match[1];
    if (!filename.includes('.')) {
      return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/media/news/${filename}`;
    }
  }

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    // If backend returned a localhost media URL that is actually a Cloudinary hash without extension
    if (imagePath.includes('/media/media/news/') || imagePath.includes('/media/news/')) {
      const parts = imagePath.split('/news/');
      if (parts[1] && !parts[1].includes('.')) {
        return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/media/news/${parts[1]}`;
      }
    }
    return imagePath;
  }

  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${API_BASE_URL}${cleanPath}`;
};

/**
 * Normalizes a raw backend news item into the format expected by UI components
 */
export const formatNewsArticle = (item) => {
  if (!item) return null;

  const rawDate = item.formatted_date || item.created_at || item.date || 'April 29, 2026';
  let displayDate = rawDate;
  if (item.created_at && !item.formatted_date) {
    try {
      displayDate = new Date(item.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      displayDate = rawDate;
    }
  }

  const categoryName = typeof item.category === 'object' && item.category !== null
    ? (item.category.name || 'NEWS')
    : (item.category || 'NEWS');

  const formattedImage = getFullImageUrl(item.image);

  return {
    id: item.id || `news-${Date.now()}`,
    title: item.title || 'Breaking Music & Culture News',
    slug: item.slug || (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : ''),
    category: String(categoryName).toUpperCase(),
    excerpt: item.excerpt || (item.content ? item.content.replace(/<[^>]*>/g, '').slice(0, 160) + '...' : ''),
    content: item.content || '',
    author: item.author || (item.author_details?.name) || 'City FM / Area 93.5 FM News',
    authorRole: item.author_details?.role || 'Senior Entertainment Editor',
    image: formattedImage,
    heroImage: formattedImage,
    inArticleImage: formattedImage,
    views: item.views || 0,
    likes: item.likes || 0,
    shares: item.shares || 0,
    comments: item.comments || Math.floor((item.views || 10) / 3) || 4,
    date: displayDate,
    createdAt: item.created_at || null,
    tags: ["NEWS", "AFROBEATS", "CHARTS", "LAGOS", "MUSIC", "POLITICS", "ENTERTAINMENT"],
    sections: item.content ? [
      {
        heading: "Full Story",
        content: item.content
      }
    ] : []
  };
};

/**
 * Fetches list of news categories from Django backend
 */
export const fetchNewsCategories = async () => {
  try {
    const res = await fetchFromCandidates('/api/news-categories/');
    const data = await res.json();
    const categoriesList = Array.isArray(data) ? data : data.results || [];
    const catNames = categoriesList.map(c => (c.name || '').toUpperCase()).filter(Boolean);
    return ['ALL', ...new Set(catNames)];
  } catch (err) {
    console.warn('Backend categories fetch failed, using fallback categories:', err.message);
    return ['ALL', 'MUSIC', 'ENTERTAINMENT', 'POLITICS', 'TRENDS', 'CONCERTS'];
  }
};

/**
 * Fetches all news articles from Django backend
 */
export const fetchNewsArticles = async () => {
  try {
    const res = await fetchFromCandidates('/api/news/');
    const data = await res.json();
    const articles = Array.isArray(data) ? data : data.results || [];

    if (articles.length === 0) {
      return getLocalFallbackNews();
    }

    return articles.map(formatNewsArticle);
  } catch (err) {
    console.warn('Backend news unavailable, using fallback data:', err.message);
    return getLocalFallbackNews();
  }
};

/**
 * Fetches single news article by slug or ID
 */
export const fetchNewsDetail = async (slugOrId) => {
  if (!slugOrId) return null;

  try {
    // 1. Direct lookup by ID or slug endpoint
    const res = await fetchFromCandidates(`/api/news/${encodeURIComponent(slugOrId)}/`);
    const data = await res.json();
    return formatNewsArticle(data);
  } catch {
    // Fall through to list query
  }

  // 2. Query all news and search for matching slug or ID
  try {
    const allArticles = await fetchNewsArticles();
    const cleanLookup = String(slugOrId).toLowerCase().replace(/[^a-z0-9]/g, '');
    const found = allArticles.find(a => {
      const aSlug = String(a.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const aTitle = String(a.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return aSlug === cleanLookup || aTitle === cleanLookup || String(a.id) === String(slugOrId);
    });

    if (found) return found;
  } catch {
    // Fallback
  }

  return null;
};

/**
 * Increments view count for an article
 */
export const trackArticleView = async (idOrSlug) => {
  if (!idOrSlug) return;
  try {
    await fetchFromCandidates(`/api/news/${encodeURIComponent(idOrSlug)}/view/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    // Silent fail for analytics
  }
};

/**
 * Likes an article
 */
export const likeArticle = async (idOrSlug) => {
  if (!idOrSlug) return null;
  try {
    const res = await fetchFromCandidates(`/api/news/${encodeURIComponent(idOrSlug)}/like/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data.likes;
  } catch (err) {
    console.warn('Like request failed:', err.message);
  }
  return null;
};

/**
 * Shares an article
 */
export const shareArticle = async (idOrSlug) => {
  if (!idOrSlug) return null;
  try {
    const res = await fetchFromCandidates(`/api/news/${encodeURIComponent(idOrSlug)}/share/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data.shares;
  } catch {
    // Silent fail
  }
  return null;
};

/**
 * Fallback data provider if backend is offline
 */
const getLocalFallbackNews = () => {
  const list = [
    defaultNewsData.featuredBig,
    defaultNewsData.featuredMedium,
    ...(defaultNewsData.newsList || [])
  ].filter(Boolean);

  return list.map((item, idx) => ({
    id: item.id || `local-${idx}`,
    title: item.title,
    slug: item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `news-${idx}`,
    category: (item.category || 'NEWS').toUpperCase(),
    excerpt: "Stay up to date with the latest breaking stories, Afrobeats releases, music industry analyses, and culture news straight from 93.5 Area FM.",
    content: "Stay up to date with the latest breaking stories, Afrobeats releases, music industry analyses, and culture news straight from 93.5 Area FM.",
    author: "93.5 Area FM Editorial Desk",
    authorRole: "Music & News Department",
    image: item.image,
    heroImage: item.image,
    inArticleImage: item.image,
    views: item.views || 45,
    likes: item.likes || 12,
    shares: 4,
    comments: 6,
    date: item.date || "August 15, 2026",
    tags: ["NEWS", "AFROBEATS", "CHARTS", "LAGOS"],
    sections: []
  }));
};

