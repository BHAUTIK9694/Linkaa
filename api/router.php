<?php
/**
 * API Router
 * ──────────
 * Maps incoming URL paths to the correct controller action.
 * Every response is JSON; HTML is never emitted from this directory.
 *
 * The router auto-detects the subfolder it lives in (e.g. /Linkaa/api) so
 * it works without any hardcoded paths — on XAMPP, on a VPS, anywhere.
 *
 * Route table:
 *
 *   POST   /contact                          → ContactController::store
 *
 *   POST   /admin/auth/login                 → AuthController::login
 *   POST   /admin/auth/logout                → AuthController::logout
 *   GET    /admin/auth/me                    → AuthController::me
 *   POST   /admin/auth/forgot-password       → AuthController::forgotPassword
 *   POST   /admin/auth/reset-password        → AuthController::resetPassword
 *
 *   GET    /admin/submissions                → SubmissionController::index
 *   GET    /admin/submissions/stats          → SubmissionController::stats
 *   GET    /admin/submissions/:id            → SubmissionController::show
 *   PATCH  /admin/submissions/:id            → SubmissionController::update
 */

declare(strict_types=1);

require_once __DIR__ . '/config/cors.php';
require_once __DIR__ . '/config/session.php';
require_once __DIR__ . '/controllers/ContactController.php';
require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/SubmissionController.php';

sendCorsHeaders();
header('Content-Type: application/json');

// ─────────────────────────────────────────────────────────────────────────────
// Determine the base path dynamically.
//
// SCRIPT_NAME is the path to router.php as Apache sees it, e.g.
//   /Linkaa/api/router.php   →  base = /Linkaa/api
//
// We strip that prefix from REQUEST_URI so the route logic only ever
// sees clean paths like /contact, /admin/auth/login, etc.
// ─────────────────────────────────────────────────────────────────────────────
$scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/'); // e.g. /Linkaa/api
$rawUri    = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$rawUri    = rawurldecode($rawUri);

// Strip the base directory prefix to get a clean route path.
if ($scriptDir !== '' && str_starts_with($rawUri, $scriptDir)) {
    $uri = substr($rawUri, strlen($scriptDir));
} else {
    $uri = $rawUri;
}

$uri    = '/' . ltrim(rtrim($uri, '/'), '/'); // normalise: always starts with /
$method = $_SERVER['REQUEST_METHOD'];

// ── Public contact form ───────────────────────────────────────────────────────
if ($uri === '/contact' && $method === 'POST') {
    (new ContactController())->store();
}

// ── Auth ──────────────────────────────────────────────────────────────────────
if ($uri === '/admin/auth/login' && $method === 'POST') {
    (new AuthController())->login();
}

if ($uri === '/admin/auth/logout' && $method === 'POST') {
    (new AuthController())->logout();
}

if ($uri === '/admin/auth/me' && $method === 'GET') {
    (new AuthController())->me();
}

if ($uri === '/admin/auth/forgot-password' && $method === 'POST') {
    (new AuthController())->forgotPassword();
}

if ($uri === '/admin/auth/reset-password' && $method === 'POST') {
    (new AuthController())->resetPassword();
}

// ── Submissions ───────────────────────────────────────────────────────────────
// Stats must be matched BEFORE the /:id pattern.
if ($uri === '/admin/submissions/stats' && $method === 'GET') {
    (new SubmissionController())->stats();
}

if ($uri === '/admin/submissions' && $method === 'GET') {
    (new SubmissionController())->index();
}

// Match /admin/submissions/:id
if (preg_match('#^/admin/submissions/(\d+)$#', $uri, $m)) {
    $id   = (int) $m[1];
    $ctrl = new SubmissionController();
    if ($method === 'GET') {
        $ctrl->show($id);
    }
    if ($method === 'PATCH' || $method === 'PUT') {
        $ctrl->update($id);
    }
}

// ── Fallback ──────────────────────────────────────────────────────────────────
http_response_code(404);
echo json_encode([
    'success' => false,
    'error'   => 'Endpoint not found.',
    'path'    => $uri,   // helpful for debugging; remove in production
]);
exit;
