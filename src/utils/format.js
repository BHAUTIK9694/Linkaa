/**
 * Formatting helpers.
 */

/**
 * Format a number with locale-aware thousands separators.
 * @param {number} value
 * @param {string} [locale='en-US']
 */
export const formatNumber = (value, locale = 'en-US') =>
  new Intl.NumberFormat(locale).format(value);

/**
 * Format a value as currency.
 * @param {number} value
 * @param {string} [currency='USD']
 * @param {string} [locale='en-US']
 */
export const formatCurrency = (value, currency = 'USD', locale = 'en-US') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
