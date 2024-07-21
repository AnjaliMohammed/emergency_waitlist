<?php
session_start();

header('Content-Type: application/json');

// Allow requests from the frontend
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$password = $data['password'];
$errors = [];

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email must be valid and not empty.';
}

if (empty($password)) {
    $errors[] = 'Password must not be empty.';
}

if (empty($errors)) {
    // For the sake of example, assume the email and password are correct
    echo json_encode(['success' => true, 'email' => $email]);
} else {
    echo json_encode(['success' => false, 'errors' => $errors]);
}
?>
