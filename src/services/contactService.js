import { apiClient } from './apiClient';

/**
 * Contact form submission service.
 * Encapsulates the endpoint so components never talk to the API directly.
 */
export const contactService = {
  /**
   * @param {{ name: string, email: string, message: string }} payload
   * @returns {Promise<{ success: boolean }>}
   */
  async submit(payload) {
    // Demo/mock implementation: simulate a network round-trip so the UI flow
    // can be demonstrated without a backend. In production, replace the body
    // below with the real call:
    //   return apiClient.post('/contact', payload);
    if (import.meta.env.DEV) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.info('[contactService] submitted (mock):', payload);
      return { success: true };
    }
    return apiClient.post('/contact', payload);
  },
};
