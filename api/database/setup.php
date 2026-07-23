<?php
/**
 * One-click database setup script
 * ────────────────────────────────
 * Creates the database, runs schema.sql, and verifies the admin credentials.
 *
 * Run from the command line:
 *   php c:\xampp\htdocs\Linkaa\api\database\setup.php
 *
 * Or visit in a browser (XAMPP only — remove after setup):
 *   http://localhost/Linkaa/api/database/setup.php
 *
 * ⚠  DELETE or move this file after running it in production.
 */

declare(strict_types=1);

// ── Configuration — edit these if your XAMPP uses different credentials ──────
$host    = 'localhost';
$port    = '3306';
$user    = 'root';
$pass    = '';          // XAMPP default is blank; change if you set a root password
$dbname  = 'livantaa';
$charset = 'utf8mb4';
// ─────────────────────────────────────────────────────────────────────────────

header('Content-Type: text/plain; charset=utf-8');

echo "=== Livantaa Database Setup ===\n\n";

// 1. Connect without selecting a database first so we can CREATE DATABASE
try {
    $dsn = "mysql:host={$host};port={$port};charset={$charset}";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
    echo "[OK] Connected to MySQL as '{$user}'.\n";
} catch (PDOException $e) {
    echo "[FAIL] Cannot connect to MySQL: " . $e->getMessage() . "\n";
    echo "\nCheck that:\n";
    echo "  1. XAMPP MySQL is running.\n";
    echo "  2. The \$host / \$user / \$pass at the top of this file are correct.\n";
    exit(1);
}

// 2. Read and split the schema file into individual statements
$schemaFile = __DIR__ . '/schema.sql';
if (!file_exists($schemaFile)) {
    echo "[FAIL] schema.sql not found at: {$schemaFile}\n";
    exit(1);
}

$sql = file_get_contents($schemaFile);

// Split on semicolons, skip empty / comment-only lines
$statements = array_filter(
    array_map('trim', explode(';', $sql)),
    fn($s) => $s !== '' && !preg_match('/^--/', $s)
);

echo "[OK] Read schema.sql (" . count($statements) . " statements).\n";

// 3. Execute each statement
$errors = 0;
foreach ($statements as $statement) {
    if (trim($statement) === '') continue;
    try {
        $pdo->exec($statement);
    } catch (PDOException $e) {
        // Ignore "already exists" errors on tables and databases
        $code = (string) $e->getCode();
        if (in_array($code, ['42S01', '42000'], true) && str_contains($e->getMessage(), 'already exists')) {
            continue;
        }
        echo "[WARN] Statement failed: " . $e->getMessage() . "\n";
        echo "       SQL: " . substr($statement, 0, 80) . "...\n";
        $errors++;
    }
}

if ($errors === 0) {
    echo "[OK] Schema applied successfully.\n";
} else {
    echo "[WARN] {$errors} statement(s) had issues (see above).\n";
}

// 4. Verify the seed users and their passwords
echo "\n--- Verifying admin seed users ---\n";

$pdo->exec("USE `{$dbname}`");

$stmt  = $pdo->query("SELECT id, name, email, password_hash, is_active FROM admin_users");
$users = $stmt->fetchAll();

if (empty($users)) {
    echo "[FAIL] No admin users found in the database.\n";
    echo "       The INSERT statements may have been skipped.\n";
    echo "       Try re-importing schema.sql via phpMyAdmin.\n";
    exit(1);
}

$password     = 'password123';
$allVerified  = true;

foreach ($users as $u) {
    $ok = password_verify($password, $u['password_hash']);
    $status = $ok ? 'OK' : 'FAIL — hash mismatch';
    echo sprintf(
        "  [%s] id=%d  %s  <%s>  active=%s\n",
        $ok ? 'OK' : 'FAIL',
        $u['id'],
        str_pad($u['name'], 12),
        $u['email'],
        $u['is_active'] ? 'yes' : 'no'
    );
    if (!$ok) {
        $allVerified = false;
    }
}

// 5. If any hash is wrong, fix it automatically
if (!$allVerified) {
    echo "\n[FIX] Hash mismatch detected — regenerating hashes now...\n";
    $newHash = password_hash($password, PASSWORD_ARGON2ID);
    $fix = $pdo->prepare(
        "UPDATE admin_users SET password_hash = :hash WHERE email IN ('admin1@livantaa.in', 'admin2@livantaa.in')"
    );
    $fix->execute([':hash' => $newHash]);
    echo "[OK] Updated {$fix->rowCount()} admin user(s) with a fresh hash.\n";
    echo "     New hash: {$newHash}\n";

    // Verify once more
    $stmt  = $pdo->query("SELECT email, password_hash FROM admin_users");
    foreach ($stmt->fetchAll() as $u) {
        $ok = password_verify($password, $u['password_hash']);
        echo "  [" . ($ok ? 'OK' : 'FAIL') . "] {$u['email']}\n";
    }
}

echo "\n=== Setup complete ===\n";
echo "You can now log in at: http://localhost:5173/admin/login\n";
echo "  Email    : admin1@livantaa.in\n";
echo "  Password : password123\n";
echo "\n⚠  Delete or restrict access to this file before going to production.\n";
