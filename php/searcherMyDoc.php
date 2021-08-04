<?php

    require "connessioneDB.php";

    session_start();

    if((isset($_SESSION["email"]) == true) && (isset($_SESSION["password"]) == true)){

        if($_SERVER["REQUEST_METHOD"] == "POST"){
            if($_POST["ricerca"] != NULL){
                $ricerca = $_POST["ricerca"];
                $stmt = $conn->prepare("SELECT ID, Percorso, Titolo, Descrizione FROM documento WHERE (Titolo LIKE '%".$ricerca."%') AND (E_Mail = :email)");
                $stmt->bindParam(":email", $_SESSION["email"]);
                
                if(($stmt->execute()) == true){
                    $stmt->setFetchMode(PDO::FETCH_ASSOC);
                    $result = $stmt->fetchAll();
                    echo json_encode($result);
                    unset($_SESSION["ricerca"]);
                }
                else{
                    echo "Errore";
                }        
            }
            else {
                echo "Vuoto";
            }
        }
    }
    else{
        echo "Errore";
    }

    $conn = NULL;
?>