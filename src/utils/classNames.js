/**
 * Tiny className combiner. Filters out falsy values so you can do:
 *   cn(styles.base, isActive && styles.active, className)
 *
 * @param {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
