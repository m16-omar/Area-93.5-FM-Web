export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://city1051fm.cloud';
const LIVE_BACKEND_URL = 'https://city1051fm.cloud';

// In-memory cache for instant client transitions
let inMemoryArticlesCache = [];

const getCachedArticles = () => {
  if (inMemoryArticlesCache.length > 0) return inMemoryArticlesCache;
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const saved = sessionStorage.getItem('area_fm_news_cache');
      if (saved) {
        inMemoryArticlesCache = JSON.parse(saved);
        return inMemoryArticlesCache;
      }
    } catch {
      // ignore
    }
  }
  return [];
};

const setCachedArticles = (articles) => {
  if (Array.isArray(articles) && articles.length > 0) {
    inMemoryArticlesCache = articles;
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.setItem('area_fm_news_cache', JSON.stringify(articles.slice(0, 50)));
      } catch {
        // ignore
      }
    }
  }
};

/**
 * Base API URL candidate list
 */
const getApiCandidates = () => {
  const list = [
    API_BASE_URL,
    LIVE_BACKEND_URL,
    ''
  ];
  return [...new Set(list.filter(item => typeof item === 'string'))];
};

/**
 * Resilient fetch against backend with safe timeout
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
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(fullUrl, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        return res;
      }
      if (res.status === 404) {
        // Stop retrying other candidates if server affirmatively returned 404
        return res;
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error(`Failed to fetch ${endpointPath}`);
};

export const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80';

/**
 * Ensures image URLs from Django backend are valid, fully accessible URLs
 */
export const getFullImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') {
    return DEFAULT_FALLBACK_IMAGE;
  }

  const trimmed = imagePath.trim();
  if (!trimmed) {
    return DEFAULT_FALLBACK_IMAGE;
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${API_BASE_URL.replace(/\/+$/, '')}${cleanPath}`;
};

/**
 * Normalizes a raw backend news item into the format expected by UI components
 */
export const formatNewsArticle = (item) => {
  if (!item) return null;

  const rawDate = item.formatted_date || item.created_at || item.date;
  let displayDate = rawDate;
  if (item.created_at && !item.formatted_date) {
    try {
      displayDate = new Date(item.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      displayDate = rawDate || 'Recent';
    }
  } else if (!displayDate) {
    displayDate = 'Recent';
  }

  const categoryName = typeof item.category === 'object' && item.category !== null
    ? (item.category.name || 'NEWS')
    : (item.category || 'NEWS');

  const formattedImage = getFullImageUrl(item.image);

  return {
    id: item.id || `news-${Date.now()}`,
    title: item.title || '',
    slug: item.slug || (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : ''),
    category: String(categoryName).toUpperCase(),
    excerpt: item.excerpt || (item.content ? item.content.replace(/<[^>]*>/g, '').slice(0, 160) + '...' : ''),
    content: item.content || '',
    author: item.author || (item.author_details?.name) || '93.5 Area FM News',
    authorRole: item.author_details?.role || 'Editorial Desk',
    image: formattedImage,
    heroImage: formattedImage,
    inArticleImage: formattedImage,
    views: item.views || 0,
    likes: item.likes || 0,
    shares: item.shares || 0,
    comments: item.comments || 0,
    date: displayDate,
    createdAt: item.created_at || null,
    tags: ["NEWS", "AFROBEATS", "CHARTS", "LAGOS", "MUSIC", "ENTERTAINMENT"],
    sections: Array.isArray(item.sections) ? item.sections : []
  };
};

/**
 * Fetches list of news categories from Django backend
 */
export const fetchNewsCategories = async () => {
  try {
    const res = await fetchFromCandidates('/api/news-categories/');
    if (res.ok) {
      const data = await res.json();
      const categoriesList = Array.isArray(data) ? data : data.results || [];
      const catNames = categoriesList.map(c => (c.name || '').toUpperCase()).filter(Boolean);
      return ['ALL', ...new Set(catNames)];
    }
  } catch (err) {
    console.warn('Backend categories fetch failed:', err.message);
  }
  return ['ALL'];
};

/**
 * Fetches all news articles from Django backend
 */
export const fetchNewsArticles = async () => {
  try {
    const res = await fetchFromCandidates('/api/news/');
    if (res.ok) {
      const data = await res.json();
      const rawList = Array.isArray(data) ? data : data.results || [];
      const articles = rawList.map(formatNewsArticle).filter(Boolean);
      if (articles.length > 0) {
        setCachedArticles(articles);
      }
      return articles;
    }
  } catch (err) {
    console.warn('Backend news fetch error:', err.message);
  }
  return getCachedArticles();
};

/**
 * Fetches single news article by slug or ID with cache fallback
 */
export const fetchNewsDetail = async (slugOrId) => {
  if (!slugOrId) return null;

  const cleanLookup = String(slugOrId).toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. Check local cache first for instant response
  const cached = getCachedArticles();
  const cachedMatch = cached.find(a => {
    const aSlug = String(a.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const aTitle = String(a.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    return aSlug === cleanLookup || aTitle === cleanLookup || String(a.id) === String(slugOrId);
  });

  try {
    // 2. Direct lookup endpoint on backend
    const res = await fetchFromCandidates(`/api/news/${encodeURIComponent(slugOrId)}/`);
    if (res.ok) {
      const data = await res.json();
      if (data && (data.title || data.slug || data.id)) {
        return formatNewsArticle(data);
      }
    }
  } catch {
    // Fall through
  }

  // 3. If direct endpoint returned 404 or failed, fetch full list to find matching item
  try {
    const allArticles = await fetchNewsArticles();
    const found = allArticles.find(a => {
      const aSlug = String(a.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const aTitle = String(a.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return aSlug === cleanLookup || aTitle === cleanLookup || String(a.id) === String(slugOrId);
    });

    if (found) return found;
  } catch {
    // ignore
  }

  return cachedMatch || null;
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

