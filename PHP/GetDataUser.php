<?php
    require "connessioneDB.php";

    session_start();

    if((isset($_SESSION["email"]) == true) && (isset($_SESSION["password"]) == true)){
        $stmt = $conn->prepare("SELECT * FROM utente WHERE E_Mail = :email");
        $stmt->bindParam(":email", $_SESSION["email"]);
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