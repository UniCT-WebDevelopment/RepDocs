<?php
    $servername = "localhost";
    $username = "root";
    $password = NULL;

    try {
        $conn = new PDO("mysql:host=$servername;dbname=repdocs", $username, $password);

        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch(PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
?>