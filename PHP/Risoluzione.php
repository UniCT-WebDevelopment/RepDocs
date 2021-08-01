<?php

    require 'ConnessioneDB.php';

    session_start();

    if(isset($_SESSION["R_E_Mail"]) == true){
        $Tmp_Pass = NULL;
        $New_Pass = NULL;
        $Empty = false;
        $E_Mail = $_SESSION["R_E_Mail"];

        if($_SERVER["REQUEST_METHOD"] == "POST"){
            if($_POST["Tmp_Pass"] == NULL){
                $Empty = true;
            }
            else{
                $Tmp_Pass = $_POST["Tmp_Pass"];
            }
    
            if($_POST["New_Pass"] == NULL){
                $Empty = true;
            }
            else{
                $New_Pass = $_POST["New_Pass"];
            }
        }
    
        if($Empty == false){
            $stmt = $conn->prepare("SELECT Pass FROM utente WHERE E_Mail = :E_Mail");
            $stmt->bindParam(':E_Mail', $E_Mail);
            $stmt->execute();
    
            if($stmt->setFetchMode(PDO::FETCH_ASSOC) == true){
                $Result = $stmt->fetchAll();
                if($Result[0]["Pass"] == $Tmp_Pass){
                    $stmt = $conn->prepare("UPDATE utente SET Pass = :Pass WHERE E_Mail = :E_Mail");
                    $stmt->bindParam(':E_Mail', $E_Mail);
                    $stmt->bindParam(':Pass', $New_Pass);
                    $stmt->execute();
                    echo "Ok";
                    unset($_SESSION["R_E_Mail"]);
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