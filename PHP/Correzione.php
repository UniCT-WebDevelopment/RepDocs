<?php

    require "ConnessioneDB.php";
    
    session_start();

    $E_Mail = NULL;
    $Invalid_Mail = false;
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
    }

    if($Empty == false){
        $stmt = $conn->prepare("SELECT E_Mail FROM utente WHERE E_Mail = :E_Mail");
        $stmt->bindParam(':E_Mail',$E_Mail);
        $stmt->execute();
        
        if($stmt->setFetchMode(PDO::FETCH_ASSOC) == true){
            $Result = $stmt->fetchAll();

            if($Result[0]["E_Mail"] == $E_Mail){
                $Oggetto = "Recupero Password";
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

                $stmt = $conn->prepare("UPDATE utente SET Pass = :Pass WHERE E_Mail = :E_Mail");
                $stmt->bindParam(':Pass',$mypass);
                $stmt->bindParam(':E_Mail',$E_Mail);
                $stmt->execute();
                $msg = "Password di Recupero: ".$mypass."\n\nNon rispondere a questa Mail\n\n\nRepDocs";
                
                if(mail($E_Mail,$Oggetto,$msg) == true){
                    $_SESSION["R_E_Mail"] = $E_Mail;
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
        if(($Invalid_Mail == true) && ($_POST["E_Mail"] != NULL)){
            echo "ErrMail";
        }
        else{
            echo "Err";
        }
    }

    $conn = NULL;
?>