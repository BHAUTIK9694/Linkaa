<?php
/**
 * Input sanitisation helpers.
 * These strip XSS vectors from string inputs before they are validated or stored.
 */

declare(strict_types=1);

/**
 * Trim whitespace and strip HTML/script tags from a scalar value.
 *
 * @param mixed $value
 * @return string
 */
function sanitizeString(mixed $value): string
{
    return htmlspecialchars(trim((string) ($value ?? '')), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/**
 * Sanitise an email address: trim, lowercase, and filter through PHP's email filter.
 * Returns an empty string if the value is not a valid email format.
 *
 * @param mixed $value
 * @return string
 */
function sanitizeEmail(mixed $value): string
{
    $clean = strtolower(trim((string) ($value ?? '')));
    return filter_var($clean, FILTER_SANITIZE_EMAIL) ?: '';
}

/**
 * Sanitise a phone number: keep only digits, +, -, spaces, and parentheses.
 *
 * @param mixed $value
 * @return string
 */
function sanitizePhone(mixed $value): string
{
    return preg_replace('/[^\d\+\-\s\(\)]/', '', (string) ($value ?? ''));
}

/**
 * Validate an email address (strict).
 *
 * @param string $email
 * @return bool
 */
function isValidEmail(string $email): bool
{
    return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
}
