/**
 * Cache utility functions for handling Vercel deployment caching issues
 */

// Cache-busting headers for API requests
export const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
} as const;

// Cache-busting headers for API responses
export const NO_CACHE_RESPONSE_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0'
} as const;

/**
 * Creates a fetch request with cache-busting headers and timestamp
 */
export const fetchWithNoCache = async (url: string, options: RequestInit = {}) => {
  const timestamp = Date.now();
  const separator = url.includes('?') ? '&' : '?';
  const urlWithTimestamp = `${url}${separator}v=${timestamp}`;
  
  return fetch(urlWithTimestamp, {
    ...options,
    cache: 'no-store',
    headers: {
      ...NO_CACHE_HEADERS,
      ...options.headers,
    },
  });
};

/**
 * Creates a Response with cache-busting headers
 */
export const createNoCacheResponse = (data: unknown, status: number = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: NO_CACHE_RESPONSE_HEADERS,
  });
};

/**
 * Creates an error Response with cache-busting headers
 */
export const createNoCacheErrorResponse = (message: string, status: number = 500) => {
  return new Response(message, {
    status,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
    },
  });
};

/**
 * Utility for handling API route responses with consistent cache headers
 */
export class ApiResponse {
  static success(data: unknown, status: number = 200) {
    return createNoCacheResponse(data, status);
  }
  
  static error(message: string, status: number = 500) {
    return createNoCacheErrorResponse(message, status);
  }
  
  static notFound(message: string = "Resource not found") {
    return createNoCacheErrorResponse(message, 404);
  }
}

/**
 * Revalidates specific paths after data updates to ensure fresh data
 */
export const revalidatePaths = async (paths: string[]) => {
  try {
    const promises = paths.map(path => 
      fetch(`/api/revalidate?path=${encodeURIComponent(path)}`, {
        method: 'POST'
      })
    );
    await Promise.all(promises);
  } catch (error) {
    console.error('Error revalidating paths:', error);
  }
};

/**
 * List of paths that commonly need revalidation after data changes
 */
export const COMMON_REVALIDATION_PATHS = [
  '/',
  '/admin/dashboard',
  '/api/blogposts',
  '/api/team',
  '/api/services',
  '/api/projects',
  '/api/testimonials'
] as const;