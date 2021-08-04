<?php
    session_start();

    if((isset($_SESSION["email"]) == true) && (isset($_SESSION["password"]) == true)){
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            if($_POST["ricerca"] != NULL){
                $_SESSION["ricerca"] = $_POST["ricerca"];
                header("location: ../searchDoc.html");
            }
            else{
                header("location: ../areaUtenti.html");
            }
        }
    }
    else{
        header("location: ../index.html");
    }
?>