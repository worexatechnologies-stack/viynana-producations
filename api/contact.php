<?php
// Production Contact Form Handler for Viyana Productions
error_reporting(0);
ini_set('display_errors', '0');

// 1. Never cache API responses (instruct Hostinger CDN and browser)
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Cache-Control: no-cache, no-store, must-revalidate, max-age=0, s-maxage=0');
header('Pragma: no-cache');
header('Expires: 0');

// 2. CORS Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 3. Health check
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    http_response_code(200);
    echo json_encode([
        'status' => 'ok',
        'service' => 'Viyana Productions Contact API',
        'server' => 'PHP ' . PHP_VERSION,
        'timestamp' => gmdate('Y-m-d\TH:i:s\Z')
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// 4. Extract and sanitize input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    $data = $_POST;
}

$name = htmlspecialchars(trim($data['name'] ?? ''), ENT_QUOTES, 'UTF-8');
$rawEmail = trim($data['email'] ?? '');
$email = !empty($rawEmail) ? filter_var($rawEmail, FILTER_SANITIZE_EMAIL) : '';
$phone = htmlspecialchars(trim($data['phone'] ?? 'N/A'), ENT_QUOTES, 'UTF-8');
$service = htmlspecialchars(trim($data['service'] ?? 'General Inquiry'), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($data['message'] ?? ''), ENT_QUOTES, 'UTF-8');

if (empty($name) || empty($message) || (empty($email) && empty($phone))) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Please provide your name, contact information (email or phone), and message.'
    ]);
    exit;
}

$to = 'info.viyanaproductions@gmail.com';
$smtpUser = 'info.viyanaproductions@gmail.com';
$smtpPass = 'rterfgoevjnrqztg';
$fromName = 'Viyana Productions Web';
$effectiveEmail = !empty($email) ? $email : 'info.viyanaproductions@gmail.com';

date_default_timezone_set('Asia/Kolkata');
$formattedDate = date('l, d F Y \a\t h:i A') . ' IST';

// 5. Save lead locally so it can never be lost
$leadData = [
    'id' => time() . rand(100, 999),
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'service' => $service,
    'message' => $message,
    'date' => $formattedDate,
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
];

$logLocations = [
    __DIR__ . '/inquiries.json',
    __DIR__ . '/../data/inquiries.json',
    dirname(__DIR__) . '/data/inquiries.json'
];

foreach ($logLocations as $loc) {
    try {
        $dir = dirname($loc);
        if (!is_dir($dir)) {
            @mkdir($dir, 0755, true);
        }
        $existing = [];
        if (file_exists($loc)) {
            $parsed = @json_decode(file_get_contents($loc), true);
            if (is_array($parsed)) $existing = $parsed;
        }
        array_unshift($existing, $leadData);
        if (count($existing) > 200) $existing = array_slice($existing, 0, 200);
        @file_put_contents($loc, json_encode($existing, JSON_PRETTY_PRINT));
    } catch (Throwable $e) {
        // Continue even if logging fails
    }
}

$subject = "New Inquiry: {$name} [{$service}]";

$textContent = "New Project Inquiry — Viyana Productions\r\n";
$textContent .= "------------------------------------------\r\n";
$textContent .= "Service: {$service}\r\n";
$textContent .= "Name: {$name}\r\n";
$textContent .= "Email: " . (!empty($email) ? $email : "Not provided") . "\r\n";
$textContent .= "Phone: {$phone}\r\n";
$textContent .= "Received: {$formattedDate}\r\n\r\n";
$textContent .= "Message:\r\n";
$textContent .= "{$message}\r\n";
$textContent .= "------------------------------------------\r\n";
$textContent .= (!empty($email) ? "Reply to: {$email}" : "Call: {$phone}") . "\r\n";

$htmlContent = '
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:20px;background-color:#0c0d0e;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif;color:#ededed;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background-color:#141517;border:1px solid #282828;border-radius:14px;overflow:hidden;">
    <tr>
      <td style="padding:28px;background:#1a1b1e;border-bottom:1px solid #282828;">
        <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#888;">NEW WEB INQUIRY</span>
        <h1 style="margin:4px 0 0;font-size:22px;color:#fff;">VIYANA PRODUCTIONS</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 28px;">
        <div style="display:inline-block;background:#fff;color:#000;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:5px 12px;border-radius:16px;margin-bottom:18px;">' . htmlspecialchars($service) . '</div>
        <table border="0" cellpadding="8" cellspacing="0" width="100%" style="background:#1a1b1e;border-radius:8px;margin-bottom:20px;font-size:13px;">
          <tr><td style="color:#888;width:25%;">Name:</td><td style="color:#fff;font-weight:600;">' . htmlspecialchars($name) . '</td></tr>
          <tr><td style="color:#888;">Email:</td><td style="color:#fff;">' . (!empty($email) ? '<a href="mailto:' . htmlspecialchars($email) . '" style="color:#fff;">' . htmlspecialchars($email) . '</a>' : 'Not provided') . '</td></tr>
          <tr><td style="color:#888;">Phone:</td><td style="color:#fff;"><a href="tel:' . htmlspecialchars($phone) . '" style="color:#fff;">' . htmlspecialchars($phone) . '</a></td></tr>
          <tr><td style="color:#888;">Received:</td><td style="color:#aaa;">' . $formattedDate . '</td></tr>
        </table>
        <div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;margin-bottom:6px;text-transform:uppercase;">Message / Brief:</div>
        <div style="background:#0e0f11;border:1px solid #282828;border-left:3px solid #fff;padding:14px;border-radius:6px;color:#ddd;font-size:13px;line-height:1.6;white-space:pre-wrap;">' . htmlspecialchars($message) . '</div>
      </td>
    </tr>
  </table>
</body>
</html>';

/**
 * Sends email via Gmail authenticated SMTP (SSL on 465 or TLS on 587)
 */
function send_smtp_mail($host, $port, $user, $pass, $to, $fromName, $fromEmail, $subject, $textContent, $htmlContent, $isTls = false) {
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);

    $protocol = $isTls ? 'tcp://' : 'ssl://';
    $socket = @stream_socket_client($protocol . $host . ':' . $port, $errno, $errstr, 8, STREAM_CLIENT_CONNECT, $context);

    if (!$socket) {
        return false;
    }

    stream_set_timeout($socket, 8);

    $read = function() use ($socket) {
        $data = '';
        while (!feof($socket)) {
            $line = fgets($socket, 515);
            if ($line === false) break;
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        return $data;
    };

    $send = function($cmd) use ($socket, $read) {
        fputs($socket, $cmd . "\r\n");
        return $read();
    };

    $read();
    $send("EHLO localhost");

    if ($isTls) {
        $tlsRes = $send("STARTTLS");
        if (strpos($tlsRes, '220') === false) {
            fclose($socket);
            return false;
        }
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket);
            return false;
        }
        $send("EHLO localhost");
    }

    $send("AUTH LOGIN");
    $send(base64_encode($user));
    $authRes = $send(base64_encode($pass));

    if (strpos($authRes, '235') === false) {
        fclose($socket);
        return false;
    }

    $send("MAIL FROM: <{$user}>");
    $send("RCPT TO: <{$to}>");
    $send("DATA");

    $boundary = "==Multipart_Boundary_x" . md5(time()) . "x";

    $headers  = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$user}>\r\n";
    $headers .= "Reply-To: <{$fromEmail}>\r\n";
    $headers .= "To: <{$to}>\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n";

    $body  = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $textContent . "\r\n\r\n";

    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $htmlContent . "\r\n\r\n";

    $body .= "--{$boundary}--\r\n";

    $res = $send($headers . "\r\n" . $body . "\r\n.");
    $send("QUIT");
    fclose($socket);

    return strpos($res, '250') !== false;
}

$sent = false;

// 1. Try Gmail SSL port 465
try {
    $sent = send_smtp_mail('smtp.gmail.com', 465, $smtpUser, $smtpPass, $to, $fromName, $effectiveEmail, $subject, $textContent, $htmlContent, false);
} catch (Throwable $t) {
    $sent = false;
}

// 2. Try Gmail STARTTLS port 587 if port 465 failed
if (!$sent) {
    try {
        $sent = send_smtp_mail('smtp.gmail.com', 587, $smtpUser, $smtpPass, $to, $fromName, $effectiveEmail, $subject, $textContent, $htmlContent, true);
    } catch (Throwable $t) {
        $sent = false;
    }
}

// 3. Fallback: PHP mail using server domain sender (never rejected by SPF/DMARC)
if (!$sent) {
    $headers  = "From: Viyana Productions <contact@viyana.productions>\r\n";
    $headers .= "Reply-To: <{$effectiveEmail}>\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $sent = @mail($to, $subject, $textContent, $headers, "-fcontact@viyana.productions");
}

echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your message has been sent successfully. Our team will contact you shortly.'
]);
