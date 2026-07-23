<?php
/**
 * Seed Admin Password Helper
 * ──────────────────────────
 * Run this script ONCE after importing schema.sql to set real Argon2id hashes
 * for both admin users.
 *
 * Usage:
 *   cd c:\xampp\htdocs\Linkaa\api
 *   php database/seed_passwords.php
 *
 * Requires the DB credentials in config/database.php to be filled in.
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

$password = 'password123';
$hash     = password_hash($password, PASSWORD_ARGON2ID);

$pdo = Database::connect();
$stmt = $pdo->prepare(
    "UPDATE admin_users SET password_hash = :hash WHERE email IN ('admin1@livantaa.in', 'admin2@livantaa.in')"
);
$stmt->execute([':hash' => $hash]);

$affected = $stmt->rowCount();
echo "[seed_passwords] Updated {$affected} admin user(s) with a fresh Argon2id hash.\n";
echo "Password : {$password}\n";
echo "Hash     : {$hash}\n";
