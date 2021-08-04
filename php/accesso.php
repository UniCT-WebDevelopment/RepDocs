<?php
    require 'connessioneDB.php';
    
    session_start();
    
    $email = NULL;
    $invalid_mail = false;
    $password = NULL;
    $empty = false;

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

        if($_POST["password"] == NULL){
            $empty = true;
        }
        else{
            $password = $_POST["password"];
        }
    }

    if($empty == false){ 
        $stmt = $conn->prepare("SELECT Pass FROM utente WHERE E_Mail = :email");
        $stmt->bindParam(':email',$email);
        $stmt->execute();
        if($stmt->setFetchMode(PDO::FETCH_ASSOC) == true){
            $Result = $stmt->fetchAll();
            if($Result[0]["Pass"] == $password){
                $_SESSION["email"] = $email;
                $_SESSION["password"] = $password;
                echo "Ok";
            }
            else{
                echo "Err";
            }
        }
    }

    else{
        if(($invalid_mail == true) && ($_POST["email"] != NULL)){
            echo "ErrMail";
        }
        else{
            echo "Err";
        }
    }

    $conn = NULL;
?>