import { apiClient } from './apiClient';

/**
 * Contact form submission service.
 * Encapsulates the endpoint so components never talk to the API directly.
 */
export const contactService = {
  /**
   * @param {{ name: string, email: string, phone?: string, subject?: string, message: string }} payload
   * @returns {Promise<{ success: boolean, data: { message: string } }>}
   */
  async submit(payload) {
    return apiClient.post('/contact', payload);
  },
};
