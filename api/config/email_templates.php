<?php
/**
 * Branded transactional email templates for Livantaa.
 */

declare(strict_types=1);

function emailEscape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function livantaaLogoSvg(): string
{
    $logoPath = dirname(__DIR__, 2) . '/src/assets/logos/logo-full.svg';
    if (is_file($logoPath)) {
        $logo = file_get_contents($logoPath);
        if ($logo !== false) {
            return str_replace('#ffffff', '#171717', $logo);
        }
    }

    return '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="38" viewBox="0 0 180 38" role="img" aria-label="Livantaa">'
        . '<text x="0" y="28" font-family="Georgia,serif" font-size="28" fill="#171717">Livantaa</text></svg>';
}

function livantaaEmailTemplate(string $title, string $intro, string $content, string $preheader = ''): string
{
    $logo = livantaaLogoSvg();
    $website = 'https://livantaa.com';
    $email = 'info@livantaa.com';
    $phone = '+91 281 246 0100';
    $footerText = 'Furniture, crafted to endure.';

    return '<!doctype html><html lang="en"><head><meta charset="UTF-8">'
        . '<meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<title>' . emailEscape($title) . '</title></head>'
        . '<body style="margin:0;background:#f4f2ee;color:#272522;font-family:Arial,sans-serif;">'
        . '<div style="display:none;max-height:0;overflow:hidden;opacity:0;">' . emailEscape($preheader) . '</div>'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2ee;padding:32px 12px;">'
        . '<tr><td align="center"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;">'
        . '<tr><td style="padding:28px 36px;border-bottom:1px solid #e6e1d9;">'
        . '<a href="' . $website . '" style="display:inline-block;text-decoration:none;">' . $logo . '</a></td></tr>'
        . '<tr><td style="padding:40px 36px 28px;"><p style="margin:0 0 10px;color:#82796d;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;">Livantaa</p>'
        . '<h1 style="margin:0 0 14px;font-family:Georgia,serif;font-size:30px;line-height:1.2;font-weight:normal;color:#171717;">' . emailEscape($title) . '</h1>'
        . '<p style="margin:0;color:#5f5a53;font-size:16px;line-height:1.7;">' . emailEscape($intro) . '</p></td></tr>'
        . '<tr><td style="padding:0 36px 40px;">' . $content . '</td></tr>'
        . '<tr><td style="padding:26px 36px;background:#171717;color:#fff;">'
        . '<p style="margin:0 0 12px;font-family:Georgia,serif;font-size:18px;">' . $footerText . '</p>'
        . '<p style="margin:0 0 14px;font-size:12px;line-height:1.8;color:#c9c4bb;">'
        . '<a href="' . $website . '" style="color:#fff;text-decoration:none;">livantaa.com</a> · '
        . '<a href="' . $website . '/#collections" style="color:#fff;text-decoration:none;">Collections</a> · '
        . '<a href="' . $website . '/contact" style="color:#fff;text-decoration:none;">Contact</a> · '
        . '<a href="mailto:' . $email . '" style="color:#fff;text-decoration:none;">' . $email . '</a> · '
        . '<a href="tel:' . preg_replace('/[^0-9+]/', '', $phone) . '" style="color:#fff;text-decoration:none;">' . $phone . '</a></p>'
        . '<p style="margin:0;font-size:11px;color:#99938a;">Powered by Nuvlance</p>'
        . '</td></tr></table></td></tr></table></body></html>';
}

function contactAdminEmail(string $name, string $email, string $phone, string $subject, string $message): array
{
    $safeName = emailEscape($name);
    $safeEmail = emailEscape($email);
    $safePhone = emailEscape($phone !== '' ? $phone : 'Not provided');
    $safeSubject = emailEscape($subject !== '' ? $subject : 'Not provided');
    $safeMessage = nl2br(emailEscape($message), false);
    $text = "New website contact enquiry\n\nName: {$name}\nEmail: {$email}\nPhone: "
        . ($phone !== '' ? $phone : 'Not provided') . "\nSubject: " . ($subject !== '' ? $subject : 'Not provided')
        . "\n\nMessage:\n{$message}\n";
    $content = '<div style="border:1px solid #e6e1d9;padding:22px;">'
        . '<p style="margin:0 0 10px;font-size:13px;color:#82796d;">New enquiry via livantaa.com/contact</p>'
        . '<p style="margin:0;line-height:1.9;"><strong>Name:</strong> ' . $safeName . '<br><strong>Email:</strong> '
        . '<a href="mailto:' . $safeEmail . '" style="color:#6a5a42;">' . $safeEmail . '</a><br><strong>Phone:</strong> '
        . $safePhone . '<br><strong>Interest:</strong> ' . $safeSubject . '</p>'
        . '<p style="margin:20px 0 0;padding-top:18px;border-top:1px solid #e6e1d9;line-height:1.8;">' . $safeMessage . '</p></div>';

    return [
        'subject' => 'New website enquiry from ' . $name,
        'text' => $text,
        'html' => livantaaEmailTemplate('New contact enquiry', 'A new visitor has reached out through the Livantaa website.', $content, 'New contact enquiry received through the Livantaa website.'),
    ];
}

function contactVisitorEmail(string $name, string $subject, string $message): array
{
    $safeName = emailEscape($name);
    $safeSubject = emailEscape($subject !== '' ? $subject : 'your enquiry');
    $text = "Hi {$name},\n\nThank you for reaching out to Livantaa about {$subject}. We have received your message and will get back to you shortly.\n\nYour message:\n{$message}\n\nLivantaa\ninfo@livantaa.com\nhttps://livantaa.com\n\nPowered by Nuvlance\n";
    $content = '<p style="font-size:16px;line-height:1.8;margin:0 0 20px;">Hi ' . $safeName . ',</p>'
        . '<p style="font-size:16px;line-height:1.8;margin:0 0 20px;">Thank you for reaching out to Livantaa. We have received your enquiry about <strong>' . $safeSubject . '</strong> and will get back to you shortly.</p>'
        . '<div style="padding:18px 20px;background:#f4f2ee;border-left:3px solid #8d7d63;color:#5f5a53;line-height:1.8;">'
        . nl2br(emailEscape($message), false) . '</div>'
        . '<p style="font-size:14px;line-height:1.8;margin:24px 0 0;color:#5f5a53;">While you wait, explore our <a href="https://livantaa.com/#collections" style="color:#6a5a42;">collections</a>.</p>';

    return [
        'subject' => 'We received your enquiry · Livantaa',
        'text' => $text,
        'html' => livantaaEmailTemplate('We received your enquiry', 'Thank you for getting in touch. Your message is safely with our team.', $content, 'Thank you for contacting Livantaa. We will get back to you shortly.'),
    ];
}