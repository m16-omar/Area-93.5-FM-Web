import defaultNewsData from '../data/newsData.json';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

/**
 * Ensures image URLs from Django media are fully qualified URLs
 */
export const getFullImageUrl = (imagePath) => {
  if (!imagePath) {
    return 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80';
  }
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
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

  const rawDate = item.formatted_date || item.created_at || item.date || 'January 8, 2026';
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

  return {
    id: item.id || `news-${Date.now()}`,
    title: item.title || 'Breaking Music & Culture News',
    slug: item.slug || (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : ''),
    category: String(categoryName).toUpperCase(),
    excerpt: item.excerpt || (item.content ? item.content.replace(/<[^>]*>/g, '').slice(0, 160) + '...' : ''),
    content: item.content || '',
    author: item.author || (item.author_details?.name) || '93.5 Area FM Editorial Desk',
    authorRole: item.author_details?.role || 'Music & News Department',
    image: getFullImageUrl(item.image),
    heroImage: getFullImageUrl(item.image),
    inArticleImage: getFullImageUrl(item.image),
    views: item.views || 0,
    likes: item.likes || 0,
    shares: item.shares || 0,
    comments: item.comments || Math.floor((item.views || 10) / 4) || 8,
    date: displayDate,
    createdAt: item.created_at || null,
    tags: ["NEWS", "AFROBEATS", "CHARTS", "LAGOS", "MUSIC", "ENTERTAINMENT"],
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
    const res = await fetch(`${API_BASE_URL}/api/news-categories/`);
    if (!res.ok) throw new Error(`Categories API returned ${res.status}`);
    const data = await res.json();
    const categoriesList = Array.isArray(data) ? data : data.results || [];
    const catNames = categoriesList.map(c => c.name.toUpperCase());
    return ['ALL', ...new Set(catNames)];
  } catch (err) {
    console.warn('Backend categories unavailable, using local default:', err.message);
    return defaultNewsData.categories || ['ALL', 'CONCERTS', 'TRENDS', 'ARTISTS', 'POLITICS'];
  }
};

/**
 * Fetches all news articles from Django backend
 */
export const fetchNewsArticles = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/news/`);
    if (!res.ok) throw new Error(`News API returned ${res.status}`);
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
    const res = await fetch(`${API_BASE_URL}/api/news/${encodeURIComponent(slugOrId)}/`);
    if (res.ok) {
      const data = await res.json();
      return formatNewsArticle(data);
    }
  } catch {
    // Fall through to list search
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
    await fetch(`${API_BASE_URL}/api/news/${encodeURIComponent(idOrSlug)}/view/`, {
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
    const res = await fetch(`${API_BASE_URL}/api/news/${encodeURIComponent(idOrSlug)}/like/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      const data = await res.json();
      return data.likes;
    }
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
    const res = await fetch(`${API_BASE_URL}/api/news/${encodeURIComponent(idOrSlug)}/share/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      const data = await res.json();
      return data.shares;
    }
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
