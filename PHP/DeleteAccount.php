<?php
    require "connessioneDB.php";

    session_start();

    if((isset($_SESSION["email"]) == true) && (isset($_SESSION["password"]) == true)){
        $email = $_SESSION["email"];
        $stmt = $conn->prepare("DELETE FROM documento WHERE E_Mail = :email");
        $stmt->bindParam(":email", $email, PDO::PARAM_STR);
        $stmt->execute();
        $stmt = $conn->prepare("DELETE FROM utente WHERE E_Mail = :email");
        $stmt->bindParam(":email", $email, PDO::PARAM_STR);
        $stmt->execute();
        session_destroy();
        echo "Ok";    
    }
    else{
        echo "Errore";
    }

    $conn = NULL;
?>