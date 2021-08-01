<?php
    require "ConnessioneDB.php";

    session_start();

    if((isset($_SESSION["E_Mail"]) == true) && (isset($_SESSION["Password"]) == true)){
        $E_Mail = $_SESSION["E_Mail"];
        $stmt = $conn->prepare("DELETE FROM documento WHERE E_Mail = :E_Mail");
        $stmt->bindParam(":E_Mail", $E_Mail, PDO::PARAM_STR);
        $stmt->execute();
        $stmt = $conn->prepare("DELETE FROM utente WHERE E_Mail = :E_Mail");
        $stmt->bindParam(":E_Mail", $E_Mail, PDO::PARAM_STR);
        $stmt->execute();
        session_destroy();
        echo "Ok";    
    }
    else{
        echo "Errore";
    }

    $conn = NULL;
?>