<?php
    $servername = "localhost";
    $username = "root";
    $password = NULL;
    
    try {
        $conn = new PDO("mysql:host=$servername", $username, $password);
    
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch(PDOException $e) {
            die("Connection failed: " . $e->getMessage());
    }

    $stmt = $conn->prepare("CREATE DATABASE IF NOT EXISTS repdocs");
    $stmt->execute();

    $conn =NULL;
?>