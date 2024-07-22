<?php
session_start();

header('Content-Type: application/json');

// Allow requests from the frontend
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    error_log("GET request received");
    if (isset($_SESSION['patientName']) && isset($_SESSION['patientCode']) && isset($_SESSION['waitTime'])) {
        echo json_encode([
            'success' => true,
            'state' => [
                'patientName' => $_SESSION['patientName'],
                'patientCode' => $_SESSION['patientCode'],
                'waitTime' => $_SESSION['waitTime']
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'errors' => "No patient data found."]);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $fullName = $data['name'];
    $code = $data['code'];
    $errors = [];

    if (empty($fullName) || !preg_match('/^[a-zA-Z]{2,} [a-zA-Z]{2,}$/', $fullName)) {
        $errors[] = 'Name must consist of first name and last name.';
    }

    if (empty($code) || !preg_match('/^[A-Z]{2}[0-9]$/', $code)) {
        $errors[] = 'Code must consist of exactly 2 uppercase letters followed by a number.';
    }

    if (empty($errors)) {
        try {
            $stmt = $pdo->prepare("SELECT wait_time FROM patients WHERE name = :name AND code = :code");
            $stmt->bindParam(':name', $fullName);
            $stmt->bindParam(':code', $code);
            $stmt->execute();
            $patient = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($patient) {
                $waitTime = $patient['wait_time'];

                // Store the data in the session
                $_SESSION['patientName'] = $fullName;
                $_SESSION['patientCode'] = $code;
                $_SESSION['waitTime'] = $waitTime;

                echo json_encode([
                    'success' => true,
                    'patientName' => $fullName,
                    'patientCode' => $code,
                    'waitTime' => $waitTime
                ]);
            } else {
                $errors[] = 'Patient not found.';
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