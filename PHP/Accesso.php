<?php
    require 'ConnessioneDB.php';
    
    session_start();
    
    $E_Mail = NULL;
    $Invalid_Mail = false;
    $Password = NULL;
    $Empty = false;

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

        if($_POST["Password"] == NULL){
            $Empty = true;
        }
        else{
            $Password = $_POST["Password"];
        }
    }

    if($Empty == false){ 
        $stmt = $conn->prepare("SELECT Pass FROM utente WHERE E_Mail = :E_Mail");
        $stmt->bindParam(':E_Mail',$E_Mail);
        $stmt->execute();
        if($stmt->setFetchMode(PDO::FETCH_ASSOC) == true){
            $Result = $stmt->fetchAll();
            if($Result[0]["Pass"] == $Password){
                $_SESSION["E_Mail"] = $E_Mail;
                $_SESSION["Password"] = $Password;
                echo "Ok";
            }
            else{
                echo "Err";
            }
        }
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