<?php
/**
 * Waysen Ltd — Contact Form Handler
 * cPanel compatible — uses PHP mail()
 */

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Rate limiting via session (basic protection)
session_start();
$now = time();
if (!isset($_SESSION['contact_last'])) {
    $_SESSION['contact_last'] = 0;
    $_SESSION['contact_count'] = 0;
}

// Reset counter every 10 minutes
if ($now - $_SESSION['contact_last'] > 600) {
    $_SESSION['contact_count'] = 0;
}

if ($_SESSION['contact_count'] >= 5) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Too many submissions. Please try again later.']);
    exit;
}

$_SESSION['contact_last'] = $now;
$_SESSION['contact_count']++;

// ---------- Sanitise inputs ----------
function sanitise(string $input): string {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

$name    = sanitise($_POST['name']    ?? '');
$email   = sanitise($_POST['email']   ?? '');
$phone   = sanitise($_POST['phone']   ?? '');
$subject = sanitise($_POST['subject'] ?? '');
$message = sanitise($_POST['message'] ?? '');

// ---------- Validation ----------
$errors = [];

if (empty($name)) {
    $errors[] = 'Please enter your name.';
}

if (empty($email) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address.';
}

if (empty($message)) {
    $errors[] = 'Please enter a message.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// ---------- Honeypot check ----------
// (Add a hidden field called 'website' in the form — bots fill it, humans don't)
if (!empty($_POST['website'])) {
    // Silently succeed — don't let bots know they were caught
    echo json_encode(['success' => true]);
    exit;
}

// ---------- Build email ----------
$to      = 'martin@waysen.co.uk';
$subject = $subject ?: 'New contact form enquiry — Waysen.co.uk';
$from    = 'noreply@waysen.co.uk';

$body  = "New contact form submission from waysen.co.uk\n";
$body .= str_repeat('=', 50) . "\n\n";
$body .= "Name:    {$name}\n";
$body .= "Email:   {$email}\n";
$body .= "Phone:   " . ($phone ?: 'Not provided') . "\n";
$body .= "Subject: {$subject}\n\n";
$body .= "Message:\n{$message}\n\n";
$body .= str_repeat('-', 50) . "\n";
$body .= "Sent: " . date('d/m/Y H:i:s') . "\n";
$body .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n";

$headers  = "From: Waysen Website <{$from}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ---------- Send ----------
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    // Auto-reply to sender
    $replySubject = 'Thank you for contacting Waysen Ltd';
    $replyBody  = "Dear {$name},\n\n";
    $replyBody .= "Thank you for getting in touch with Waysen Ltd. We've received your message and will respond as soon as possible.\n\n";
    $replyBody .= "In the meantime, if your enquiry is urgent you can reach us directly:\n";
    $replyBody .= "Phone: +44(0) 1304 490033\n";
    $replyBody .= "Email: martin@waysen.co.uk\n\n";
    $replyBody .= "Kind regards,\n";
    $replyBody .= "The Waysen Team\n\n";
    $replyBody .= "--\n";
    $replyBody .= "Waysen Ltd\n";
    $replyBody .= "Hammond House, Limeklin Street, Dover, Kent CT17 9EF\n";
    $replyBody .= "Company Registration: 08513851\n";

    $replyHeaders  = "From: Waysen Ltd <{$from}>\r\n";
    $replyHeaders .= "MIME-Version: 1.0\r\n";
    $replyHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($email, $replySubject, $replyBody, $replyHeaders);

    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send. Please email martin@waysen.co.uk directly.']);
}
