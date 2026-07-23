<?php
/**
 * JSON response helpers.
 * Always sets Content-Type and exits so callers don't need to.
 */

declare(strict_types=1);

/**
 * Send a successful JSON response.
 *
 * @param mixed $data
 * @param int   $statusCode
 */
function jsonSuccess(mixed $data, int $statusCode = 200): never
{
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'data' => $data], JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Send an error JSON response.
 *
 * @param string|array $message  Human-readable description, or field → message map.
 * @param int          $statusCode
 */
function jsonError(string|array $message, int $statusCode = 400): never
{
    http_response_code($statusCode);
    header('Content-Type: application/json');
    $payload = is_array($message)
        ? ['success' => false, 'errors' => $message]
        : ['success' => false, 'error'  => $message];
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Parse and return the JSON request body.
 * Exits with 400 if the body is malformed.
 *
 * @return array
 */
function getJsonBody(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }

    $data = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        jsonError('Invalid JSON in request body.', 400);
    }

    return $data;
}
