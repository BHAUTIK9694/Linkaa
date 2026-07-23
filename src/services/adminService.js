import { apiClient } from './apiClient';

/**
 * Admin panel service layer.
 * All admin API calls go through here — never call apiClient directly from components.
 */

// ── Auth ──────────────────────────────────────────────────────────────────────

export const authService = {
  /**
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<{ success: boolean, data: { admin: object } }>}
   */
  login: (credentials) => apiClient.post('/admin/auth/login', credentials),

  /** @returns {Promise<{ success: boolean }>} */
  logout: () => apiClient.post('/admin/auth/logout', {}),

  /** @returns {Promise<{ success: boolean, data: { admin: object } }>} */
  me: () => apiClient.get('/admin/auth/me'),

  /** @param {{ email: string }} payload */
  forgotPassword: (payload) => apiClient.post('/admin/auth/forgot-password', payload),

  /** @param {{ token: string, password: string, confirm: string }} payload */
  resetPassword: (payload) => apiClient.post('/admin/auth/reset-password', payload),
};

// ── Submissions ───────────────────────────────────────────────────────────────

export const submissionService = {
  /**
   * @param {{ status?: string, page?: number, limit?: number }} params
   * @returns {Promise<{ success: boolean, data: { submissions: array, meta: object } }>}
   */
  list: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ''))
    ).toString();
    return apiClient.get(`/admin/submissions${qs ? `?${qs}` : ''}`);
  },

  /** @returns {Promise<{ success: boolean, data: { stats: object } }>} */
  stats: () => apiClient.get('/admin/submissions/stats'),

  /**
   * @param {number} id
   * @returns {Promise<{ success: boolean, data: { submission: object } }>}
   */
  get: (id) => apiClient.get(`/admin/submissions/${id}`),

  /**
   * @param {number} id
   * @param {{ status?: string, admin_notes?: string }} payload
   */
  update: (id, payload) => apiClient.put(`/admin/submissions/${id}`, payload),
};
