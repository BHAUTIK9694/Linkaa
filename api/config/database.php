<?php
/**
 * Database connection — single factory, PDO + MySQL/MariaDB.
 * All credentials are read from environment variables; hard-code them below
 * only for local development if you don't have a .env loader.
 */

declare(strict_types=1);

class Database
{
    private static ?PDO $instance = null;

    /** Returns a shared PDO instance (singleton). */
    public static function connect(): PDO
    {
        if (self::$instance !== null) {
            return self::$instance;
        }

        $host    = $_ENV['DB_HOST']    ?? getenv('DB_HOST')    ?: 'localhost';
        $port    = $_ENV['DB_PORT']    ?? getenv('DB_PORT')    ?: '3306';
        $dbname  = $_ENV['DB_NAME']    ?? getenv('DB_NAME')    ?: 'livantaa';
        $user    = $_ENV['DB_USER']    ?? getenv('DB_USER')    ?: 'root';
        $pass    = $_ENV['DB_PASS']    ?? getenv('DB_PASS')    ?: '';
        $charset = 'utf8mb4';

        $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset={$charset}";

        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            self::$instance = new PDO($dsn, $user, $pass, $options);
        } catch (PDOException $e) {
            // Never leak credentials in a response.
            error_log('DB connection failed: ' . $e->getMessage());
            http_response_code(503);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Service unavailable. Please try again later.']);
            exit;
        }

        return self::$instance;
    }
}
