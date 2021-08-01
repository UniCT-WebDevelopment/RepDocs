<?php
    require "ConnessioneDB.php";

    session_start();

    if((isset($_SESSION["E_Mail"]) == true) && (isset($_SESSION["Password"]) == true)){
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $ID = $_POST["ID"];
            $stmt = $conn->prepare("UPDATE documento SET Download = Download + 1 WHERE ID = :ID");
            $stmt->bindParam(":ID",$ID);
            $stmt->execute();
            echo "Ok";
        }
    }
    else{
        echo "Errore";
    }

    $conn = NULL;
?>