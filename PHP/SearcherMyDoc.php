<?php

    require "ConnessioneDB.php";

    session_start();

    if((isset($_SESSION["E_Mail"]) == true) && (isset($_SESSION["Password"]) == true)){

        if($_SERVER["REQUEST_METHOD"] == "POST"){
            if($_POST["Ricerca"] != NULL){
                $Ricerca = $_POST["Ricerca"];
                $stmt = $conn->prepare("SELECT ID, Percorso, Titolo, Descrizione FROM documento WHERE (Titolo LIKE '%".$Ricerca."%') AND (E_Mail = :E_Mail)");
                $stmt->bindParam(":E_Mail", $_SESSION["E_Mail"]);
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
            else {
                echo "Vuoto";
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