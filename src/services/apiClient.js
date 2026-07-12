/**
 * Minimal fetch wrapper — the single choke point for all HTTP traffic.
 * Swap the internals for axios/ky here without touching feature code.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

/**
 * @param {string} path
 * @param {RequestInit} [options]
 * @returns {Promise<any>}
 */
async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  return contentType.includes('application/json') ? response.json() : response.text();
}

export const apiClient = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) =>
    request(path, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (path, body, options) =>
    request(path, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
};
