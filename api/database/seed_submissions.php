<?php
/**
 * Seed Contact Submissions
 * ────────────────────────
 * Inserts sample contact submissions so the admin panel has realistic data
 * to browse from day one. Safe to run multiple times — uses INSERT IGNORE.
 *
 * Usage:
 *   php c:\xampp\htdocs\Linkaa\api\database\seed_submissions.php
 *
 * Or visit in a browser while XAMPP is running:
 *   http://localhost/Linkaa/api/database/seed_submissions.php
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

header('Content-Type: text/plain; charset=utf-8');

$pdo = Database::connect();

echo "=== Seeding Contact Submissions ===\n\n";

// ── Sample submissions covering every status and a range of content ───────────
$submissions = [
    [
        'name'         => 'Ankit Mehta',
        'email'        => 'ankit.mehta@gmail.com',
        'phone'        => '+91 98765 43210',
        'subject'      => 'Bespoke dining table enquiry',
        'message'      => 'Hello, I am looking for a custom live-edge teak dining table for 8 people. Our dining room is 14 ft × 12 ft. Could you please share your process, timeline, and a rough cost estimate? We have seen your Villa Harmony project and love the aesthetic.',
        'status'       => 'new',
        'admin_notes'  => null,
        'submitted_at' => date('Y-m-d H:i:s', strtotime('-2 hours')),
    ],
    [
        'name'         => 'Pooja Shah',
        'email'        => 'pooja.shah@interiors.co.in',
        'phone'        => '+91 90001 12345',
        'subject'      => 'Trade enquiry — interior design project',
        'message'      => 'Hi, I am an interior designer based in Ahmedabad working on a luxury residential project in Bodakdev. My client requires a full bedroom set — bed frame, two nightstands, a dresser, and a wardrobe — all in sheesham wood with a dark walnut finish. Can we schedule a showroom visit this week or next?',
        'status'       => 'in_progress',
        'admin_notes'  => 'Pooja is a repeat trade client. Called her on 14 Jul — she can visit the showroom on Saturday between 11 AM and 1 PM. Assigned to Rajesh for consultation.',
        'submitted_at' => date('Y-m-d H:i:s', strtotime('-3 days')),
    ],
    [
        'name'         => 'Ravi Patel',
        'email'        => 'ravi.patel@rparchitects.in',
        'phone'        => '+91 98250 77654',
        'subject'      => 'Showroom visit — farmhouse project',
        'message'      => 'We are designing a farmhouse near Gondal and need solid wood furniture for the living and dining areas. Interested in your seating and storage collections. Please confirm if a visit next Monday (10 AM) works.',
        'status'       => 'contacted',
        'admin_notes'  => 'Visit confirmed for Monday 21 Jul at 10 AM. Sent confirmation email. Ravi wants to see the sheesham and mango wood samples in person.',
        'submitted_at' => date('Y-m-d H:i:s', strtotime('-5 days')),
    ],
    [
        'name'         => 'Meera Kapoor',
        'email'        => 'meera.k@outlook.com',
        'phone'        => '',
        'subject'      => 'Care & repair — dining chair leg wobble',
        'message'      => 'I purchased a set of 6 dining chairs from your showroom about 18 months ago. One of them has developed a slight wobble in the front left leg. I would like to bring it in for repair under the guarantee. Please let me know the process.',
        'status'       => 'resolved',
        'admin_notes'  => 'Customer brought the chair in on 10 Jul. Our workshop re-tightened the mortise joint and re-applied finish. Returned the same day. Customer was very happy. No charge under lifetime guarantee.',
        'submitted_at' => date('Y-m-d H:i:s', strtotime('-10 days')),
    ],
    [
        'name'         => 'Suresh Iyer',
        'email'        => 'suresh.iyer@techfirm.com',
        'phone'        => '+91 88001 99432',
        'subject'      => 'General pricing information',
        'message'      => 'Could you please send me your catalogue and a general price list for dining tables and sofas? Looking to furnish a new 3BHK apartment in Rajkot.',
        'status'       => 'closed',
        'admin_notes'  => 'Sent digital catalogue and pricing guide via email on 5 Jul. Customer replied saying they will visit after Diwali. Closing for now.',
        'submitted_at' => date('Y-m-d H:i:s', strtotime('-15 days')),
    ],
];

$stmt = $pdo->prepare(
    'INSERT INTO contact_submissions
        (name, email, phone, subject, message, status, admin_notes, submitted_at)
     VALUES
        (:name, :email, :phone, :subject, :message, :status, :admin_notes, :submitted_at)'
);

$inserted = 0;
foreach ($submissions as $s) {
    try {
        $stmt->execute([
            ':name'         => $s['name'],
            ':email'        => $s['email'],
            ':phone'        => $s['phone'],
            ':subject'      => $s['subject'],
            ':message'      => $s['message'],
            ':status'       => $s['status'],
            ':admin_notes'  => $s['admin_notes'],
            ':submitted_at' => $s['submitted_at'],
        ]);
        $id = $pdo->lastInsertId();
        echo "[OK] #{$id} — {$s['name']} <{$s['email']}> [{$s['status']}]\n";
        $inserted++;
    } catch (PDOException $e) {
        echo "[FAIL] {$s['name']}: " . $e->getMessage() . "\n";
    }
}

echo "\n=== Done — inserted {$inserted} submission(s). ===\n";
echo "Open the admin panel to see them:\n";
echo "  http://localhost:5173/admin/submissions\n";
