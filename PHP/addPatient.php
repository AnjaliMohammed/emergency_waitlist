<?php
session_start();

header('Content-Type: application/json');

// Allow requests from the frontend
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST");

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $name = $data['name'];
    $code = $data['code'];
    $injury_description = $data['injury_description'];
    $wait_time = $data['wait_time'];
    $errors = [];

    if (empty($name) || !preg_match('/^[a-zA-Z]{2,} [a-zA-Z]{2,}$/', $name)) {
        $errors[] = 'Name must consist of first name and last name.';
    }
    
    if (empty($code) || !preg_match('/^[A-Z]{2}[0-9]$/', $code)) {
        $errors[] = 'Code must consist of exactly 2 uppercase letters followed by a number.';
    }
    
    if (empty($injury_description)) {
        $errors[] = 'Injury description must not be empty.';
    }
    
    if (empty($wait_time)) {
        $errors[] = 'Wait time must not be empty.';
    }
    if (empty($errors)) {
        try {
            $sql = "INSERT INTO patients (name, code, injury_description, wait_time) VALUES ('$name', '$code', '$injury_description', '$wait_time')";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();

            // Update session data
            $stmt = $pdo->query("SELECT * FROM patients");
            $_SESSION['patients'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'No rows added.']);
            }
        } catch (PDOException $e) {
            $errors[] = 'Database error: ' . $e->getMessage();
            echo json_encode(['success' => false, 'errors' => $errors]);
        }
    } else {
        echo json_encode(['success' => false, 'errors' => $errors]);
    }
    exit();
} else {
    echo json_encode(['success' => false, 'errors' => 'Invalid request method.']);
}
?>
