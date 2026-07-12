/**
 * Lightweight, dependency-free validation helpers.
 * For complex forms, prefer a schema library (see STEERING.md → Libraries).
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** @param {string} value */
export const isEmail = (value) => EMAIL_REGEX.test(String(value).trim());

/** @param {string} value */
export const isRequired = (value) => String(value ?? '').trim().length > 0;

/**
 * @param {string} value
 * @param {number} min
 */
export const minLength = (value, min) => String(value ?? '').trim().length >= min;
