<?php

    require "connessioneDB.php";
    
    session_start();

    $email = NULL;
    $invalid_mail = false;
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
    }

    if($empty == false){
        $stmt = $conn->prepare("SELECT E_Mail FROM utente WHERE E_Mail = :email");
        $stmt->bindParam(':email',$email);
        $stmt->execute();
        
        if($stmt->setFetchMode(PDO::FETCH_ASSOC) == true){
            $result = $stmt->fetchAll();

            if($result[0]["E_Mail"] == $email){
                $oggetto = "Recupero password";
                $lung_pass = 16;
                $mypass = "";

                for ($x=0; $x<$lung_pass; $x++){
  
                    if (($x % 2) == 0){
                      $mypass = $mypass.chr(rand(65,90));
                    }
    
                    else if(($x % 3) == 0){  
                      $mypass = $mypass.chr(rand(97,122));
                    }

                    else{
                        $mypass = $mypass.rand(0,9);
                    }
                }

                $stmt = $conn->prepare("UPDATE utente SET Pass = :pass WHERE E_Mail = :email");
                $stmt->bindParam(':pass',$mypass);
                $stmt->bindParam(':email',$email);
                $stmt->execute();
                $msg = "password di Recupero: ".$mypass."\n\nNon rispondere a questa Mail\n\n\nRepDocs";
                
                if(mail($email,$oggetto,$msg) == true){
                    $_SESSION["r_email"] = $email;
                    echo "Ok";
                }
                else{
                    die ("Invio non riuscito");
                }
            }
            else{
                echo "NOT_FOUND";
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