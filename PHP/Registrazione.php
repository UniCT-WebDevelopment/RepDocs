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
        $stmt = $conn->prepare("INSERT INTO utente(E_Mail, Nome, Cognome, Data_Nascita, Pass) VALUES (:E_Mail, :Nome, :Cognome, :Data_Nascita, :Pass)");
        $stmt->bindParam(":E_Mail",$E_Mail);
        $stmt->bindParam(":Nome",$Nome);
        $stmt->bindParam(":Cognome",$Cognome);
        $stmt->bindParam(":Data_Nascita",$Data_Nascita);
        $stmt->bindParam(":Pass",$Password);
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

    $conn = NULL;
?>