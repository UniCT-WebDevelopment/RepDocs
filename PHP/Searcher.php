<?php

    require "connessioneDB.php";

    session_start();

    if((isset($_SESSION["email"]) == true) && (isset($_SESSION["password"]) == true)){

        if(isset($_SESSION["ricerca"]) == true){
            $ricerca = $_SESSION["ricerca"];
            $stmt = $conn->prepare("SELECT ID, Percorso, Titolo, Descrizione FROM documento WHERE Titolo LIKE '%".$ricerca."%'");
            $stmt->execute();
            
            if($stmt->setFetchMode(PDO::FETCH_ASSOC) == true){
                $result = $stmt->fetchAll();
                echo json_encode($result);
                unset($_SESSION["ricerca"]);
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