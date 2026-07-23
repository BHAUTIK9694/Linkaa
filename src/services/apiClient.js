/**
 * Minimal fetch wrapper — the single choke point for all HTTP traffic.
 *
 * The API base URL is driven entirely by the VITE_API_BASE_URL environment
 * variable, which Vite inlines at build time:
 *
 *   .env.development  →  http://localhost/Linkaa/api   (XAMPP)
 *   .env.production   →  https://yourdomain.com/api    (live server)
 *
 * Never hardcode a URL here — always go through the env var.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL && import.meta.env.DEV) {
  console.warn(
    '[apiClient] VITE_API_BASE_URL is not set. ' +
    'Create a .env.development file — see .env.example for instructions.'
  );
}

/**
 * @param {string} path  — endpoint path, e.g. "/contact" or "/admin/auth/login"
 * @param {RequestInit} [options]
 * @returns {Promise<any>}
 */
async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include', // always send the session cookie
    ...options,
  });

  if (!response.ok) {
    const raw = await response.text().catch(() => response.statusText);

    // Try to parse a structured JSON error from the PHP backend.
    try {
      const parsed = JSON.parse(raw);
      const message =
        parsed.error ??
        (parsed.errors ? Object.values(parsed.errors).join(' ') : null) ??
        `Request failed (${response.status})`;

      throw Object.assign(new Error(message), {
        status: response.status,
        errors: parsed.errors ?? null,
      });
    } catch (e) {
      if (e.status) throw e; // already our structured error
      throw new Error(raw || `Request failed (${response.status})`);
    }
  }

  const contentType = response.headers.get('content-type') ?? '';
  return contentType.includes('application/json') ? response.json() : response.text();
}

export const apiClient = {
  get:    (path, options)       => request(path, { ...options, method: 'GET' }),
  post:   (path, body, options) => request(path, { ...options, method: 'POST',  body: JSON.stringify(body) }),
  put:    (path, body, options) => request(path, { ...options, method: 'PUT',   body: JSON.stringify(body) }),
  patch:  (path, body, options) => request(path, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path, options)       => request(path, { ...options, method: 'DELETE' }),
};
