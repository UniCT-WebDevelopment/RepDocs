<?php
    session_start();

    $connect = false;

    if((isset($_SESSION["E_Mail"]) == true) && (isset($_SESSION["Password"]) == true)){
        $connect = true;
    }
    
    echo $connect;
?>