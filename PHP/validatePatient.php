<?php
session_start();


header('Content-Type: application/json');

// Allow requests from the frontend
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents('php://input'), true);

$fullName = $data['name'];
$code = $data['code'];
$errors = [];

if (empty($fullName) || !preg_match('/^[a-zA-Z]{2,} [a-zA-Z]{2,}$/', $fullName)) {
    $errors[] = 'Name must consist of first name and last name.';
}

if (empty($code) || !preg_match('/^[A-Z]{3}$/', $code)) {
    $errors[] = '3-letter code must consist of exactly 3 uppercase letters.';
}

if (empty($errors)) {
    echo json_encode(['success' => true, 'name' => $fullName, 'code' => $code]);
} else {
    echo json_encode(['success' => false, 'errors' => $errors]);
}
?>
