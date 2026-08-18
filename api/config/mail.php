<?php
/**
 * Minimal SMTP client for transactional email.
 * Configuration is read from environment variables and never hard-coded.
 */

declare(strict_types=1);

require_once __DIR__ . '/env.php';

function mailConfig(string $key, string $default = ''): string
{
    return (string) ($_ENV[$key] ?? getenv($key) ?: $default);
}

function sendMail(
    string $to,
    string $subject,
    string $textBody,
    ?string $replyTo = null,
    ?string $htmlBody = null
): void
{
    $host = mailConfig('MAIL_HOST', 'smtp.hostinger.com');
    $port = (int) mailConfig('MAIL_PORT', '465');
    $username = mailConfig('MAIL_USERNAME');
    $password = mailConfig('MAIL_PASSWORD');
    $from = mailConfig('MAIL_FROM', $username);
    $fromName = mailConfig('MAIL_FROM_NAME', 'Livantaa');

    if ($username === '' || $password === '' || $from === '') {
        throw new RuntimeException('Mail configuration is incomplete.');
    }

    $transport = $port === 465 ? 'ssl://' . $host : $host;
    $socket = @stream_socket_client(
        $transport . ':' . $port,
        $errorCode,
        $errorMessage,
        15,
        STREAM_CLIENT_CONNECT
    );

    if (!$socket) {
        throw new RuntimeException('SMTP connection failed: ' . $errorMessage);
    }

    stream_set_timeout($socket, 15);

    try {
        smtpExpect($socket, 220);
        smtpCommand($socket, 'EHLO localhost', 250);
        smtpCommand($socket, 'AUTH LOGIN', 334);
        smtpCommand($socket, base64_encode($username), 334);
        smtpCommand($socket, base64_encode($password), 235);
        smtpCommand($socket, 'MAIL FROM:<' . $from . '>', 250);
        smtpCommand($socket, 'RCPT TO:<' . $to . '>', 250);
        smtpCommand($socket, 'DATA', 354);

        $headers = [
            'From: ' . formatMailbox($fromName, $from),
            'To: ' . formatMailbox('', $to),
            'Subject: ' . encodeHeader($subject),
            'Date: ' . date(DATE_RFC2822),
            'MIME-Version: 1.0',
        ];

        if ($replyTo !== null && $replyTo !== '') {
            $headers[] = 'Reply-To: ' . formatMailbox('', $replyTo);
        }

        if ($htmlBody === null) {
            $headers[] = 'Content-Type: text/plain; charset=UTF-8';
            $headers[] = 'Content-Transfer-Encoding: 8bit';
            $body = $textBody;
        } else {
            $boundary = 'livantaa_' . bin2hex(random_bytes(12));
            $headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';
            $body = '--' . $boundary . "\r\n"
                . "Content-Type: text/plain; charset=UTF-8\r\n"
                . "Content-Transfer-Encoding: 8bit\r\n\r\n"
                . $textBody . "\r\n"
                . '--' . $boundary . "\r\n"
                . "Content-Type: text/html; charset=UTF-8\r\n"
                . "Content-Transfer-Encoding: 8bit\r\n\r\n"
                . $htmlBody . "\r\n"
                . '--' . $boundary . "--";
        }

        $body = preg_replace('/\r?\n/', "\r\n", $body) ?? $body;
        $body = preg_replace('/^\./m', '..', $body) ?? $body;
        fwrite($socket, implode("\r\n", $headers) . "\r\n\r\n" . $body . "\r\n.\r\n");
        smtpExpect($socket, 250);
        smtpCommand($socket, 'QUIT', 221);
    } finally {
        fclose($socket);
    }
}

function smtpCommand($socket, string $command, int $expectedCode): void
{
    fwrite($socket, $command . "\r\n");
    smtpExpect($socket, $expectedCode);
}

function smtpExpect($socket, int $expectedCode): void
{
    $response = '';
    do {
        $line = fgets($socket);
        if ($line === false) {
            throw new RuntimeException('SMTP server closed the connection.');
        }
        $response .= $line;
    } while (isset($line[3]) && $line[3] === '-');

    $actualCode = (int) substr($response, 0, 3);
    if ($actualCode !== $expectedCode) {
        throw new RuntimeException('SMTP error ' . $actualCode . '.');
    }
}

function formatMailbox(string $name, string $email): string
{
    return $name === '' ? '<' . $email . '>' : '=?UTF-8?B?' . base64_encode($name) . '?= <' . $email . '>';
}

function encodeHeader(string $value): string
{
    $value = str_replace(["\r", "\n"], '', $value);
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}
