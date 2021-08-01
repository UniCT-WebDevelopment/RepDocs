<?php

    require "ConnessioneDB.php";

    session_start();

    if((isset($_SESSION["E_Mail"]) == true) && (isset($_SESSION["Password"]) == true)){
        $stmt = $conn->prepare("SELECT ID, Percorso, Titolo, Descrizione FROM documento ORDER BY ID DESC LIMIT 8");
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