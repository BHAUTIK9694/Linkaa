<?php
/**
 * Session bootstrap.
 * Call startSession() before any output and before reading $_SESSION.
 */

declare(strict_types=1);

function startSession(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    session_set_cookie_params([
        'lifetime' => 0,           // session cookie (expires when browser closes)
        'path'     => '/',
        'domain'   => '',
        'secure'   => false,       // set to true in production behind HTTPS
        'httponly' => true,        // JS cannot read the session cookie
        'samesite' => 'Lax',
    ]);

    session_start();
}

/**
 * Check whether the current request carries a valid admin session.
 *
 * @return array|null Admin row from session, or null if unauthenticated.
 */
function getAuthAdmin(): ?array
{
    startSession();

    if (!isset($_SESSION['admin_id'], $_SESSION['admin_email'])) {
        return null;
    }

    return [
        'id'    => (int) $_SESSION['admin_id'],
        'name'  => $_SESSION['admin_name']  ?? '',
        'email' => $_SESSION['admin_email'],
    ];
}

/**
 * Require authentication — sends 401 and exits if not logged in.
 *
 * @return array Admin session data.
 */
function requireAuth(): array
{
    $admin = getAuthAdmin();
    if ($admin === null) {
        http_response_code(401);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Unauthorised. Please log in.']);
        exit;
    }
    return $admin;
}
