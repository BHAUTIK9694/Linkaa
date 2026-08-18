<?php
/**
 * Load simple KEY=VALUE settings from the project .env file.
 */

declare(strict_types=1);

function loadEnvironment(string $path): void
{
    if (!is_file($path)) {
        return;
    }

    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
            continue;
        }

        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);

        if ($key === '') {
            continue;
        }

        if (strlen($value) >= 2 && $value[0] === $value[strlen($value) - 1]) {
            $quote = $value[0];
            if ($quote === '"' || $quote === "'") {
                $value = substr($value, 1, -1);
            }
        }

        $_ENV[$key] = $value;
        putenv($key . '=' . $value);
    }
}

loadEnvironment(dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . '.env');
