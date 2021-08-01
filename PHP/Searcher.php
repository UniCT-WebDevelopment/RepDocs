<?php

    require "ConnessioneDB.php";

    session_start();

    if((isset($_SESSION["E_Mail"]) == true) && (isset($_SESSION["Password"]) == true)){

        if(isset($_SESSION["Ricerca"]) == true){
            $Ricerca = $_SESSION["Ricerca"];
            $stmt = $conn->prepare("SELECT ID, Percorso, Titolo, Descrizione FROM documento WHERE Titolo LIKE '%".$Ricerca."%'");
            $stmt->execute();
            
            if($stmt->setFetchMode(PDO::FETCH_ASSOC) == true){
                $Result = $stmt->fetchAll();
                echo json_encode($Result);
                unset($_SESSION["Ricerca"]);
            }
            else{
                echo "Errore";
            }    
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