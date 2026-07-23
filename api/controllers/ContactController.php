<?php
/**
 * ContactController — handles public contact form submissions.
 *
 * POST /api/contact
 * Body: { name, email, phone?, subject?, message }
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/sanitize.php';
require_once __DIR__ . '/../helpers/response.php';

class ContactController
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::connect();
    }

    /**
     * Store a new contact submission.
     * Validates all fields server-side. Returns 201 on success.
     */
    public function store(): never
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            jsonError('Method not allowed.', 405);
        }

        $body    = getJsonBody();
        $errors  = [];

        // ── Sanitise ─────────────────────────────────────────────────────────
        $name    = sanitizeString($body['name']    ?? '');
        $email   = sanitizeEmail($body['email']    ?? '');
        $phone   = sanitizePhone($body['phone']    ?? '');
        $subject = sanitizeString($body['subject'] ?? '');
        $message = sanitizeString($body['message'] ?? '');

        // ── Validate ──────────────────────────────────────────────────────────
        if ($name === '') {
            $errors['name'] = 'Name is required.';
        } elseif (mb_strlen($name) > 120) {
            $errors['name'] = 'Name must be 120 characters or fewer.';
        }

        if ($email === '') {
            $errors['email'] = 'Email address is required.';
        } elseif (!isValidEmail($email)) {
            $errors['email'] = 'Please enter a valid email address.';
        }

        if ($phone !== '' && !preg_match('/^[\d\+\-\s\(\)]{6,20}$/', $phone)) {
            $errors['phone'] = 'Please enter a valid phone number.';
        }

        if ($subject !== '' && mb_strlen($subject) > 255) {
            $errors['subject'] = 'Subject must be 255 characters or fewer.';
        }

        if ($message === '') {
            $errors['message'] = 'Message is required.';
        } elseif (mb_strlen($message) < 10) {
            $errors['message'] = 'Message must be at least 10 characters.';
        }

        if (!empty($errors)) {
            jsonError($errors, 422);
        }

        // ── Persist ────────────────────────────────────────────────────────────
        $stmt = $this->db->prepare(
            'INSERT INTO contact_submissions (name, email, phone, subject, message)
             VALUES (:name, :email, :phone, :subject, :message)'
        );

        $stmt->execute([
            ':name'    => $name,
            ':email'   => $email,
            ':phone'   => $phone,
            ':subject' => $subject,
            ':message' => $message,
        ]);

        jsonSuccess(['message' => 'Thank you. We will be in touch within one business day.'], 201);
    }
}
