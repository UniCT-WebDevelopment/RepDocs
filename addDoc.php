<?php
    require "php/connessioneDB.php";

    session_start();

    if((isset($_SESSION["email"]) == true) && (isset($_SESSION["password"]) == true)){

        $finalPath = NULL;
        $email = $_SESSION["email"];
        $titolo = NULL;
        $descrizione = NULL;
        $illegal_file = false;    
        $empty = false;
    
        if($_SERVER["REQUEST_METHOD"] == "POST"){
    
            if($_FILES["file"]["name"] == NULL){
                $empty = true;
            }
            else{
                $root = "docs/";
                $finalPath = $root.basename($_FILES["file"]["name"]);
                $startPath = $_FILES["file"]["tmp_name"];
                
                if($_FILES["file"]["type"] == "application/pdf"){
                    if(move_uploaded_file($startPath,$finalPath) == false){
                        die("Errore Caricamento file");
                    }
                }
                else{
                    $illegal_file = true;                                       
                }            
            }
    
            if($_POST["titolo"] == NULL){
                $empty = true;
            }
            else{
                $titolo = $_POST["titolo"];
            }
    
            if($_POST["descrizione"] == NULL){
                $empty = true;
            }
            else{
                $descrizione = $_POST["descrizione"];
            }
        }
    
        if(($empty == false) && ($illegal_file == false)){
            $stmt = $conn->prepare("INSERT INTO documento(Percorso, Titolo, Descrizione, E_Mail) VALUES (:pathfile, :titolo, :descrizione, :email)");
            $stmt->bindParam(":pathfile",$finalPath);
            $stmt->bindParam(":titolo",$titolo);
            $stmt->bindParam(":descrizione",$descrizione);
            $stmt->bindParam(":email",$email);
            $stmt->execute();
            header("location: myRepDocs.html");
        }
        else{
            if($illegal_file == true){
                echo "<h1 style='text-align:center'>Puoi caricare solo file pdf</h1><br><h2 style='text-align:center'>Torna alla pagina Precedente</h2>";
            }
            else{
                echo "<h1 style='text-align:center'>Dati Mancanti</h1><br><h2 style='text-align:center'>Torna alla pagina Precedente</h2>";
            }
        }
    }

    else{
        header("location: index.html");
    }

    $conn = NULL;
?>