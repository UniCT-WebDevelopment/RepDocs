<?php

    require 'connessioneDB.php';

    session_start();

    if(isset($_SESSION["r_email"]) == true){
        $tmp_pass = NULL;
        $new_pass = NULL;
        $empty = false;
        $email = $_SESSION["r_email"];

        if($_SERVER["REQUEST_METHOD"] == "POST"){
            if($_POST["tmp_pass"] == NULL){
                $empty = true;
            }
            else{
                $tmp_pass = $_POST["tmp_pass"];
            }
    
            if($_POST["new_pass"] == NULL){
                $empty = true;
            }
            else{
                $new_pass = $_POST["new_pass"];
            }
        }
    
        if($empty == false){
            $stmt = $conn->prepare("SELECT Pass FROM utente WHERE E_Mail = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();
    
            if($stmt->setFetchMode(PDO::FETCH_ASSOC) == true){
                $Result = $stmt->fetchAll();
                if($Result[0]["Pass"] == $tmp_pass){
                    $stmt = $conn->prepare("UPDATE utente SET Pass = :pass WHERE E_Mail = :email");
                    $stmt->bindParam(':email', $email);
                    $stmt->bindParam(':pass', $new_pass);
                    $stmt->execute();
                    echo "Ok";
                    unset($_SESSION["r_email"]);
                }
                else{
                    echo "ErrPass";
                }
            }
        }
        else{
            echo "NOT_Pass";
        }    
    }
    else{
        echo "Err";
    }

    $conn = NULL;

?>