<?php
    session_start();

    $connect = false;

    if((isset($_SESSION["email"]) == true) && (isset($_SESSION["password"]) == true)){
        $connect = true;
    }
    
    echo $connect;
?>