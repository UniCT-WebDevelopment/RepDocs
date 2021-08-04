<?php
    require "connessioneDB.php";

    session_start();

    if((isset($_SESSION["email"]) == true) && (isset($_SESSION["password"]) == true)){
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $id = $_POST["id"];
            $stmt = $conn->prepare("UPDATE documento SET Download = Download + 1 WHERE ID = :id");
            $stmt->bindParam(":id",$id);
            $stmt->execute();
            echo "Ok";
        }
    }
    else{
        echo "Errore";
    }

    $conn = NULL;
?>