<?php

    require "connessioneDB.php";

    session_start();

    if((isset($_SESSION["email"]) == true) && (isset($_SESSION["password"]) == true)){
        $stmt = $conn->prepare("SELECT ID, Percorso, Titolo, Descrizione FROM documento ORDER BY ID DESC LIMIT 8");
        if(($stmt->execute()) == true){
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            echo json_encode($result);
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