<?php
    require "ConnessioneDB.php";

    session_start();

    if((isset($_SESSION["E_Mail"]) == true) && (isset($_SESSION["Password"]) == true)){
        $stmt = $conn->prepare("SELECT * FROM utente WHERE E_Mail = :E_Mail");
        $stmt->bindParam(":E_Mail", $_SESSION["E_Mail"]);
        $stmt->execute();

        if($stmt->setFetchMode(PDO::FETCH_ASSOC) == true){
            $Result = $stmt->fetchAll();
            echo json_encode($Result);
        }
        else{
            echo "Errore";
        }
    }
    else{
        echo "Errore";
    }

    $conn = NULL;
?>