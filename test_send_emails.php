<?php
require_once __DIR__ . '/api/config/env.php';
require_once __DIR__ . '/api/config/email_templates.php';
require_once __DIR__ . '/api/config/mail.php';

// Prepare test data
$name = 'Bhautik Kotadiya';
$email = 'bhautikkotadiya9694@gmail.com';
$phone = '+91 99999 99999';
$subject = 'Website testing';
$message = 'This is a sample enquiry to review both email layouts.';

echo "Sending Admin notification email...\n";
try {
    $adminMailData = contactAdminEmail($name, $email, $phone, $subject, $message);
    sendMail(
        $email,
        $adminMailData['subject'],
        $adminMailData['text'],
        $email,
        $adminMailData['html']
    );
    echo "Admin email sent successfully!\n";
} catch (Exception $e) {
    echo "Admin email failed: " . $e->getMessage() . "\n";
}

echo "Sending Visitor receipt email...\n";
try {
    $visitorMailData = contactVisitorEmail($name, $subject, $message);
    sendMail(
        $email,
        $visitorMailData['subject'],
        $visitorMailData['text'],
        $email,
        $visitorMailData['html']
    );
    echo "Visitor email sent successfully!\n";
} catch (Exception $e) {
    echo "Visitor email failed: " . $e->getMessage() . "\n";
}
