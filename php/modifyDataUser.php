<?php
    require "connessioneDB.php";

    session_start();
    
    $email = NULL;
    $nome = NULL;
    $cognome = NULL;
    $data_nascita = NULL;
    $password = NULL;
    $empty = false;
    $invalid_mail = false;

    if((isset($_SESSION["email"]) == true) && (isset($_SESSION["password"]) == true)){
        
        if($_SERVER["REQUEST_METHOD"] == "POST"){

            if(($_POST["email"] == NULL) || (filter_var($_POST["email"], FILTER_VALIDATE_EMAIL) == false)){
                $empty = true;
    
                if(filter_var($_POST["email"], FILTER_VALIDATE_EMAIL) == false){
                    $invalid_mail = true;
                }
            }
            else{
                $email = $_POST["email"];
            }
    
            if($_POST["nome"] == NULL){
                $empty = true;
            }
            else{
                $nome = $_POST["nome"];
            }
    
            if($_POST["cognome"] == NULL){
                $empty = true;
            }
            else{
                $cognome = $_POST["cognome"];
            }
    
            if($_POST["dataNascita"] == NULL){
                $empty = true;
            }
            else{
                $data_nascita = $_POST["dataNascita"];
            }
    
            if($_POST["password"] == NULL){
                $empty = true;
            }
            else{
                $password = $_POST["password"];
            }
        }
        
        if($empty == false){
            $stmt = $conn->prepare("UPDATE utente SET E_Mail = :email, Nome = :nome, Cognome = :cognome, Data_Nascita = :dataNascita, Pass = :Pass WHERE E_Mail = :p_email");
            $stmt->bindParam(":p_email", $_SESSION["email"], PDO::PARAM_STR);
            $stmt->bindParam(":email",$email, PDO::PARAM_STR);
            $stmt->bindParam(":nome",$nome, PDO::PARAM_STR);
            $stmt->bindParam(":cognome",$cognome, PDO::PARAM_STR);
            $stmt->bindParam(":dataNascita",$data_nascita);
            $stmt->bindParam(":Pass",$password, PDO::PARAM_STR);
            $stmt->execute();
            $_SESSION["email"] = $email;
            $_SESSION["password"] = $password;
            echo "Ok";
        }
        else{
            if(($invalid_mail == true) && ($_POST["email"] != NULL)){
                echo "ErrMail";
            }
            else{
                echo "Err";
            }
        }    
    }

    $conn = NULL;
?>