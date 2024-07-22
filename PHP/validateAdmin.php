<?php
session_start();

header('Content-Type: application/json');

// Allow requests from the frontend
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_SESSION['adminName']) && isset($_SESSION['patients'])) {
        echo json_encode([
            'success' => true,
            'state' => [
                'adminName' => $_SESSION['adminName'],
                'patients' => $_SESSION['patients'],
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'errors' => "No admin data found."]);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
        try {
            $stmt = $pdo->prepare("SELECT name, password FROM admins WHERE email = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $admin = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($admin) {
                if ($admin['password'] === $password) {
                    $stmt = $pdo->query("SELECT name, code, injury_description, wait_time FROM patients");
                    $patients = $stmt->fetchAll(PDO::FETCH_ASSOC);

                    // Store the data in the session
                    $_SESSION['adminName'] = $admin['name'];
                    $_SESSION['patients'] = $patients;

                    echo json_encode(['success' => true]);
                } else {
                    $errors[] = 'Invalid password.';
                    echo json_encode(['success' => false, 'errors' => $errors]);
                }
            } else {
                $errors[] = 'Admin not found.';
                echo json_encode(['success' => false, 'errors' => $errors]);
            }
        } catch (PDOException $e) {
            $errors[] = 'Database error: ' . $e->getMessage();
            echo json_encode(['success' => false, 'errors' => $errors]);
        }
    } else {
        echo json_encode(['success' => false, 'errors' => $errors]);
    }
    exit();
}
?>