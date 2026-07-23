<?php
/**
 * AuthController — admin authentication.
 *
 * POST /api/admin/auth/login
 * POST /api/admin/auth/logout
 * GET  /api/admin/auth/me
 * POST /api/admin/auth/forgot-password
 * POST /api/admin/auth/reset-password
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../helpers/sanitize.php';
require_once __DIR__ . '/../helpers/response.php';

class AuthController
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::connect();
        startSession();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/admin/auth/login
    // ─────────────────────────────────────────────────────────────────────────
    public function login(): never
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            jsonError('Method not allowed.', 405);
        }

        $body     = getJsonBody();
        $email    = sanitizeEmail($body['email']    ?? '');
        $password = trim((string) ($body['password'] ?? ''));

        $errors = [];
        if ($email === '' || !isValidEmail($email)) {
            $errors['email'] = 'Please enter a valid email address.';
        }
        if ($password === '') {
            $errors['password'] = 'Password is required.';
        }
        if (!empty($errors)) {
            jsonError($errors, 422);
        }

        $stmt = $this->db->prepare(
            'SELECT id, name, email, password_hash, is_active FROM admin_users WHERE email = :email LIMIT 1'
        );
        $stmt->execute([':email' => $email]);
        $admin = $stmt->fetch();

        // Constant-time comparison to prevent user-enumeration timing attacks.
        $hashToCheck = $admin ? $admin['password_hash'] : '$argon2id$v=19$m=65536,t=4,p=1$dummy$dummyhashfordummycheck';
        $valid        = password_verify($password, $hashToCheck);

        if (!$admin || !$valid || !(bool) $admin['is_active']) {
            jsonError('Invalid email or password.', 401);
        }

        // Regenerate session ID on privilege elevation to prevent fixation.
        session_regenerate_id(true);

        $_SESSION['admin_id']    = $admin['id'];
        $_SESSION['admin_name']  = $admin['name'];
        $_SESSION['admin_email'] = $admin['email'];

        jsonSuccess([
            'admin' => [
                'id'    => (int) $admin['id'],
                'name'  => $admin['name'],
                'email' => $admin['email'],
            ],
        ]);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/admin/auth/logout
    // ─────────────────────────────────────────────────────────────────────────
    public function logout(): never
    {
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $p = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $p['path'],
                $p['domain'],
                $p['secure'],
                $p['httponly']
            );
        }
        session_destroy();
        jsonSuccess(['message' => 'Logged out successfully.']);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/admin/auth/me
    // ─────────────────────────────────────────────────────────────────────────
    public function me(): never
    {
        $admin = requireAuth();
        jsonSuccess(['admin' => $admin]);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/admin/auth/forgot-password
    // ─────────────────────────────────────────────────────────────────────────
    public function forgotPassword(): never
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            jsonError('Method not allowed.', 405);
        }

        $body  = getJsonBody();
        $email = sanitizeEmail($body['email'] ?? '');

        if ($email === '' || !isValidEmail($email)) {
            jsonError(['email' => 'Please enter a valid email address.'], 422);
        }

        $stmt = $this->db->prepare(
            'SELECT id FROM admin_users WHERE email = :email AND is_active = 1 LIMIT 1'
        );
        $stmt->execute([':email' => $email]);
        $admin = $stmt->fetch();

        // Always return success — never confirm whether an email exists.
        if (!$admin) {
            jsonSuccess(['message' => 'If that address is registered, a reset link has been sent.']);
        }

        // Generate a cryptographically secure token.
        $token     = bin2hex(random_bytes(32)); // 64 hex chars
        $expiresAt = date('Y-m-d H:i:s', time() + 3600); // 1 hour

        // Invalidate any existing unused tokens for this admin.
        $this->db->prepare(
            'UPDATE password_reset_tokens SET used = 1 WHERE admin_id = :id AND used = 0'
        )->execute([':id' => $admin['id']]);

        $this->db->prepare(
            'INSERT INTO password_reset_tokens (admin_id, token, expires_at) VALUES (:id, :token, :exp)'
        )->execute([':id' => $admin['id'], ':token' => $token, ':exp' => $expiresAt]);

        // In production, send this token via email.
        // For development we return it in the response so you can test the flow.
        $isDev = ($_ENV['APP_ENV'] ?? getenv('APP_ENV') ?: 'development') === 'development';

        $responseData = ['message' => 'If that address is registered, a reset link has been sent.'];
        if ($isDev) {
            $responseData['dev_token'] = $token; // Remove this in production
        }

        jsonSuccess($responseData);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/admin/auth/reset-password
    // ─────────────────────────────────────────────────────────────────────────
    public function resetPassword(): never
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            jsonError('Method not allowed.', 405);
        }

        $body        = getJsonBody();
        $token       = sanitizeString($body['token']    ?? '');
        $newPassword = (string) ($body['password']      ?? '');
        $confirm     = (string) ($body['confirm']       ?? '');

        $errors = [];
        if ($token === '') {
            $errors['token'] = 'Reset token is missing.';
        }
        if (strlen($newPassword) < 8) {
            $errors['password'] = 'Password must be at least 8 characters.';
        }
        if ($newPassword !== $confirm) {
            $errors['confirm'] = 'Passwords do not match.';
        }
        if (!empty($errors)) {
            jsonError($errors, 422);
        }

        $stmt = $this->db->prepare(
            'SELECT t.id, t.admin_id FROM password_reset_tokens t
             WHERE t.token = :token AND t.used = 0 AND t.expires_at > NOW()
             LIMIT 1'
        );
        $stmt->execute([':token' => $token]);
        $row = $stmt->fetch();

        if (!$row) {
            jsonError('This reset link is invalid or has expired.', 400);
        }

        $newHash = password_hash($newPassword, PASSWORD_ARGON2ID);

        $this->db->prepare(
            'UPDATE admin_users SET password_hash = :hash WHERE id = :id'
        )->execute([':hash' => $newHash, ':id' => $row['admin_id']]);

        $this->db->prepare(
            'UPDATE password_reset_tokens SET used = 1 WHERE id = :id'
        )->execute([':id' => $row['id']]);

        jsonSuccess(['message' => 'Password updated successfully. You can now log in.']);
    }
}
