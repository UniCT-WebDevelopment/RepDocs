<?php
    session_start();
    
    $Success = false;
    
    if((isset($_SESSION["E_Mail"]) == true) && (isset($_SESSION["Password"]) == true)){
        session_destroy();
        $Success = true;
    }

    echo $Success;
?>