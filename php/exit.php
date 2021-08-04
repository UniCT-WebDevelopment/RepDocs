<?php
    session_start();
    
    $success = false;
    
    if((isset($_SESSION["email"]) == true) && (isset($_SESSION["password"]) == true)){
        session_destroy();
        $success = true;
    }

    echo $success;
?>