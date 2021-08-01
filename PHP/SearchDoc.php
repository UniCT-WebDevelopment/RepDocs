<?php
    session_start();

    if((isset($_SESSION["E_Mail"]) == true) && (isset($_SESSION["Password"]) == true)){
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            if($_POST["Ricerca"] != NULL){
                $_SESSION["Ricerca"] = $_POST["Ricerca"];
                header("location: ../SearchDoc.html");
            }
            else{
                header("location: ../AreaUtenti.html");
            }
        }
    }
    else{
        header("location: ../index.html");
    }
?>