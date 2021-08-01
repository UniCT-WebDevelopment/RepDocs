<?php
    require "ConnessioneDB.php";

    session_start();
    
    $E_Mail = NULL;
    $Nome = NULL;
    $Cognome = NULL;
    $Data_Nascita = NULL;
    $Password = NULL;
    $Empty = false;
    $Invalid_Mail = false;

    if((isset($_SESSION["E_Mail"]) == true) && (isset($_SESSION["Password"]) == true)){
        
        if($_SERVER["REQUEST_METHOD"] == "POST"){

            if(($_POST["E_Mail"] == NULL) || (filter_var($_POST["E_Mail"], FILTER_VALIDATE_EMAIL) == false)){
                $Empty = true;
    
                if(filter_var($_POST["E_Mail"], FILTER_VALIDATE_EMAIL) == false){
                    $Invalid_Mail = true;
                }
            }
            else{
                $E_Mail = $_POST["E_Mail"];
            }
    
            if($_POST["Nome"] == NULL){
                $Empty = true;
            }
            else{
                $Nome = $_POST["Nome"];
            }
    
            if($_POST["Cognome"] == NULL){
                $Empty = true;
            }
            else{
                $Cognome = $_POST["Cognome"];
            }
    
            if($_POST["DataNascita"] == NULL){
                $Empty = true;
            }
            else{
                $Data_Nascita = $_POST["DataNascita"];
            }
    
            if($_POST["Password"] == NULL){
                $Empty = true;
            }
            else{
                $Password = $_POST["Password"];
            }
        }
        
        if($Empty == false){
            $stmt = $conn->prepare("UPDATE utente SET E_Mail = :E_Mail, Nome = :Nome, Cognome = :Cognome, Data_Nascita = :DataNascita, Pass = :Pass WHERE E_Mail = :P_E_Mail");
            $stmt->bindParam(":P_E_Mail", $_SESSION["E_Mail"], PDO::PARAM_STR);
            $stmt->bindParam(":E_Mail",$E_Mail, PDO::PARAM_STR);
            $stmt->bindParam(":Nome",$Nome, PDO::PARAM_STR);
            $stmt->bindParam(":Cognome",$Cognome, PDO::PARAM_STR);
            $stmt->bindParam(":DataNascita",$Data_Nascita);
            $stmt->bindParam(":Pass",$Password, PDO::PARAM_STR);
            $stmt->execute();
            $_SESSION["E_Mail"] = $E_Mail;
            $_SESSION["Password"] = $Password;
            echo "Ok";
        }
        else{
            if(($Invalid_Mail == true) && ($_POST["E_Mail"] != NULL)){
                echo "ErrMail";
            }
            else{
                echo "Err";
            }
        }    
    }

    $conn = NULL;
?>