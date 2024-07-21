<?php
session_start();

header('Content-Type: application/json');

// Allow requests from the frontend
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

error_log("Session ID: " . session_id());
error_log("Session Data: " . print_r($_SESSION, true));

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    error_log("GET request received");
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
        // TODO: Implement actual fetching of name and list of patients from database
        
        // Simulate fetching info from a database
        $adminName = "Dr. Isaac Newton";
        $patients = [
            [
                "name" => "John Doe",
                "code" => "ABC",
                "injuryDescription" => "Fracture",
                "waitTime" => "2 hours",
            ],
            [
                "name" => "Jane Smith",
                "code" => "DEF",
                "injuryDescription" => "Burn",
                "waitTime" => "1 hour",
            ],
        ];

        // Store the data in the session
        $_SESSION['adminName'] = $adminName;
        $_SESSION['patients'] = $patients;

        error_log("Session Data after setting: " . print_r($_SESSION, true));

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'errors' => $errors]);
    }
    exit();
}
?>
