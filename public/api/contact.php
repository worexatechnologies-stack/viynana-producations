<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON input']);
    exit;
}

$name = htmlspecialchars(trim($data['name'] ?? ''), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($data['phone'] ?? 'N/A'), ENT_QUOTES, 'UTF-8');
$service = htmlspecialchars(trim($data['service'] ?? 'General Inquiry'), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($data['message'] ?? ''), ENT_QUOTES, 'UTF-8');

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please fill in all required fields (Name, Email, Message).']);
    exit;
}

$to = 'info.viyanaproductions@gmail.com';
$subject = "New Inquiry from {$name} - Viyana Productions";

$body = "New Contact Inquiry from Viyana Productions Website:\n\n";
$body .= "Name: {$name}\n";
$body .= "Email: {$email}\n";
$body .= "Phone: {$phone}\n";
$body .= "Service: {$service}\n\n";
$body .= "Message:\n{$message}\n\n";
$body .= "--\nSent from viyanaproductions.com";

// Function to send via Gmail SMTP over SSL
function send_via_smtp($to, $subject, $body, $fromEmail, $fromName) {
    $host = 'ssl://smtp.gmail.com';
    $port = 465;
    $user = 'info.viyanaproductions@gmail.com';
    $pass = 'rterfgoevjnrqztg'; // Gmail App Password

    $socket = @fsockopen($host, $port, $errno, $errstr, 15);
    if (!$socket) {
        return false;
    }

    $read = function() use ($socket) {
        $data = '';
        while ($str = fgets($socket, 515)) {
            $data .= $str;
            if (substr($str, 3, 1) === ' ') break;
        }
        return $data;
    };

    $send = function($cmd) use ($socket, $read) {
        fputs($socket, $cmd . "\r\n");
        return $read();
    };

    $read();
    $send("EHLO localhost");
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

    $headers  = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$user}>\r\n";
    $headers .= "Reply-To: <{$fromEmail}>\r\n";
    $headers .= "To: <{$to}>\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";

    $res = $send($headers . "\r\n" . $body . "\r\n.");
    $send("QUIT");
    fclose($socket);

    return strpos($res, '250') !== false;
}

$sent = false;

// 1. Try direct Gmail SMTP
try {
    $sent = send_via_smtp($to, $subject, $body, $email, $name);
} catch (Exception $e) {
    $sent = false;
}

// 2. Fallback to PHP mail()
if (!$sent) {
    $headers = "From: Viyana Productions <info.viyanaproductions@gmail.com>\r\n" .
               "Reply-To: {$email}\r\n" .
               "X-Mailer: PHP/" . phpversion();
    $sent = @mail($to, $subject, $body, $headers);
}

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent.']);
} else {
    // If mail server cannot connect, return clear instructions
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Unable to send message via automated server. Please contact us directly at info.viyanaproductions@gmail.com or via WhatsApp.'
    ]);
}
