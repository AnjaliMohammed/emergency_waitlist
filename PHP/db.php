<?php
$dsn = 'mysql:host=hospital-triage.cxqqky0kc5os.us-east-1.rds.amazonaws.com;dbname=hospital_triage';
$username = 'triage_user';
$password = 'csi3104$';

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>