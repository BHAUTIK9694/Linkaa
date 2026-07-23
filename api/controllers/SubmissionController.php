<?php
/**
 * SubmissionController — admin CRUD for contact submissions.
 *
 * GET    /api/admin/submissions              list with optional ?status=&page=&limit=
 * GET    /api/admin/submissions/:id          single submission
 * PATCH  /api/admin/submissions/:id          update status and/or admin_notes
 * GET    /api/admin/submissions/stats        summary counts per status
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../helpers/sanitize.php';
require_once __DIR__ . '/../helpers/response.php';

class SubmissionController
{
    private PDO $db;

    /** Valid statuses (must mirror the ENUM in schema.sql). */
    private const VALID_STATUSES = ['new', 'in_progress', 'contacted', 'resolved', 'closed'];

    public function __construct()
    {
        $this->db = Database::connect();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/admin/submissions
    // ─────────────────────────────────────────────────────────────────────────
    public function index(): never
    {
        requireAuth();

        $status = sanitizeString($_GET['status'] ?? '');
        $page   = max(1, (int) ($_GET['page']  ?? 1));
        $limit  = min(100, max(1, (int) ($_GET['limit'] ?? 20)));
        $offset = ($page - 1) * $limit;

        // Build WHERE clause
        $where  = '';
        $params = [];

        if ($status !== '' && in_array($status, self::VALID_STATUSES, true)) {
            $where    = 'WHERE cs.status = :status';
            $params[':status'] = $status;
        }

        // Total count for pagination
        $countSql  = "SELECT COUNT(*) FROM contact_submissions cs {$where}";
        $countStmt = $this->db->prepare($countSql);
        $countStmt->execute($params);
        $total = (int) $countStmt->fetchColumn();

        // Fetch page
        $params[':limit']  = $limit;
        $params[':offset'] = $offset;

        $stmt = $this->db->prepare(
            "SELECT
                cs.id,
                cs.name,
                cs.email,
                cs.phone,
                cs.subject,
                cs.status,
                cs.submitted_at,
                cs.updated_at,
                LEFT(cs.message, 120) AS message_preview
             FROM contact_submissions cs
             {$where}
             ORDER BY cs.submitted_at DESC
             LIMIT :limit OFFSET :offset"
        );

        // PDO requires explicit int binding for LIMIT / OFFSET when
        // ATTR_EMULATE_PREPARES is false.
        foreach ($params as $key => $value) {
            $type = in_array($key, [':limit', ':offset'], true) ? PDO::PARAM_INT : PDO::PARAM_STR;
            $stmt->bindValue($key, $value, $type);
        }
        $stmt->execute();
        $rows = $stmt->fetchAll();

        jsonSuccess([
            'submissions' => $rows,
            'meta'        => [
                'total'  => $total,
                'page'   => $page,
                'limit'  => $limit,
                'pages'  => (int) ceil($total / $limit),
            ],
        ]);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/admin/submissions/stats
    // ─────────────────────────────────────────────────────────────────────────
    public function stats(): never
    {
        requireAuth();

        $stmt = $this->db->query(
            "SELECT status, COUNT(*) AS count FROM contact_submissions GROUP BY status"
        );
        $rows = $stmt->fetchAll();

        // Build a zero-filled map so the frontend always has all statuses.
        $counts = array_fill_keys(self::VALID_STATUSES, 0);
        foreach ($rows as $row) {
            $counts[$row['status']] = (int) $row['count'];
        }
        $counts['total'] = array_sum($counts);

        jsonSuccess(['stats' => $counts]);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/admin/submissions/:id
    // ─────────────────────────────────────────────────────────────────────────
    public function show(int $id): never
    {
        requireAuth();

        $stmt = $this->db->prepare(
            "SELECT
                cs.*,
                au.name AS updated_by_name
             FROM contact_submissions cs
             LEFT JOIN admin_users au ON au.id = cs.updated_by
             WHERE cs.id = :id
             LIMIT 1"
        );
        $stmt->execute([':id' => $id]);
        $submission = $stmt->fetch();

        if (!$submission) {
            jsonError('Submission not found.', 404);
        }

        jsonSuccess(['submission' => $submission]);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PATCH /api/admin/submissions/:id
    // ─────────────────────────────────────────────────────────────────────────
    public function update(int $id): never
    {
        $admin = requireAuth();

        if ($_SERVER['REQUEST_METHOD'] !== 'PATCH' && $_SERVER['REQUEST_METHOD'] !== 'PUT') {
            jsonError('Method not allowed.', 405);
        }

        $body       = getJsonBody();
        $setClauses = [];
        $params     = [':id' => $id];

        // Status update
        if (array_key_exists('status', $body)) {
            $status = sanitizeString($body['status']);
            if (!in_array($status, self::VALID_STATUSES, true)) {
                jsonError(['status' => 'Invalid status value.'], 422);
            }
            $setClauses[]      = 'status = :status';
            $params[':status'] = $status;
        }

        // Admin notes update
        if (array_key_exists('admin_notes', $body)) {
            $setClauses[]           = 'admin_notes = :notes';
            $params[':notes']       = sanitizeString($body['admin_notes'] ?? '');
        }

        if (empty($setClauses)) {
            jsonError('No updatable fields provided.', 422);
        }

        $setClauses[]          = 'updated_by = :updater';
        $params[':updater']    = $admin['id'];

        $sql = 'UPDATE contact_submissions SET ' . implode(', ', $setClauses) . ' WHERE id = :id';
        $this->db->prepare($sql)->execute($params);

        // Return the updated record
        $this->show($id);
    }
}
