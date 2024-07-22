<?php
session_start();

header('Content-Type: application/json');

// Allow requests from the frontend
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $patientCode = $data['code'];
    $waitTime = $data['wait_time'];

    try {
        $sql = "UPDATE patients SET wait_time ='$waitTime' WHERE code ='$patientCode'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        // Update session data
        $stmt = $pdo->query("SELECT * FROM patients");
        $_SESSION['patients'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'No rows updated.']);
        }
    } catch (PDOException $e) {
        error_log('SQL error: ' . $e->getMessage());
        echo json_encode(['success' => false, 'error' => 'SQL error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
?>
