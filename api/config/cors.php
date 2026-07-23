<?php
/**
 * CORS headers.
 *
 * During local development the React app runs on Vite's dev server
 * (http://localhost:5173) while the PHP API runs on XAMPP (http://localhost).
 * Both are "localhost" but different ports, which counts as cross-origin, so
 * we must emit the correct CORS headers.
 *
 * In production, if the React build is served from the same domain/port as PHP
 * (e.g. http://localhost/Linkaa/), the request is same-origin and these headers
 * are ignored by the browser — no harm done.
 *
 * Add any extra allowed origins to the $allowed array below.
 */

declare(strict_types=1);

function sendCorsHeaders(): void
{
    $allowed = [
        'http://localhost:5173',   // Vite dev server (default port)
        'http://127.0.0.1:5173',
        'http://localhost:5174',   // Vite second instance / fallback port
        'http://localhost',        // XAMPP same-origin (port 80)
        'http://127.0.0.1',
        'http://localhost:80',
        'http://127.0.0.1:80',
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, $allowed, true)) {
        header("Access-Control-Allow-Origin: {$origin}");
    } elseif ($origin === '') {
        // Same-origin request (no Origin header) — no CORS header needed.
    } else {
        // Unknown origin: reflect nothing (browser will block the request).
        // Change to header("Access-Control-Allow-Origin: {$origin}") only
        // if you intentionally want to allow all origins.
    }

    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Max-Age: 86400');

    // Respond immediately to preflight requests.
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}
