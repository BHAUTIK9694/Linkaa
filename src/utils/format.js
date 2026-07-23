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

/**
 * Format a date string as a short human-readable date.
 * e.g. "16 Jul 2026"
 *
 * @param {string|Date} value
 * @param {string} [locale='en-IN']
 */
export const formatDate = (value, locale = 'en-IN') => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
};

/**
 * Format a date string with time for detail views.
 * e.g. "16 Jul 2026, 14:30"
 *
 * @param {string|Date} value
 * @param {string} [locale='en-IN']
 */
export const formatDateLong = (value, locale = 'en-IN') => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
