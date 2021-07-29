<?php
    require "ConnessioneDB.php";

    session_start();

    if((isset($_SESSION["E_Mail"]) == true) && (isset($_SESSION["Password"]) == true)){

        $FinalPath = NULL;
        $E_Mail = $_SESSION["E_Mail"];
        $Titolo = NULL;
        $Descrizione = NULL;
        $Illegal_File = false;    
        $Empty = false;
    
        if($_SERVER["REQUEST_METHOD"] == "POST"){
    
            if($_FILES["File"]["name"] == NULL){
                $Empty = true;
            }
            else{
                $Root = "Docs/";
                $FinalPath = $Root.basename($_FILES["File"]["name"]);
                $StartPath = $_FILES["File"]["tmp_name"];
                
                if($_FILES["File"]["type"] == "application/pdf"){
                    if(move_uploaded_file($StartPath,$FinalPath) == false){
                        die("Errore Caricamento File");
                    }
                }
                else{
                    $Illegal_File = true;                                       
                }            
            }
    
            if($_POST["Titolo"] == NULL){
                $Empty = true;
            }
            else{
                $Titolo = $_POST["Titolo"];
            }
    
            if($_POST["Descrizione"] == NULL){
                $Empty = true;
            }
            else{
                $Descrizione = $_POST["Descrizione"];
            }
        }
    
        if(($Empty == false) && ($Illegal_File == false)){
            $stmt = $conn->prepare("INSERT INTO documento(Percorso, Titolo, Descrizione, E_Mail) VALUES (:PathFile, :Titolo, :Descrizione, :E_Mail)");
            $stmt->bindParam(":PathFile",$FinalPath);
            $stmt->bindParam(":Titolo",$Titolo);
            $stmt->bindParam(":Descrizione",$Descrizione);
            $stmt->bindParam(":E_Mail",$E_Mail);
            $stmt->execute();
            header("location: AreaUtenti.html");
        }
        else{
            if($Illegal_File == true){
                echo "<h1 style='text-align:center'>Puoi caricare solo file pdf</h1><br><h2 style='text-align:center'>Torna alla pagina Precedente</h2>";
            }
            else{
                echo "<h1 style='text-align:center'>Puoi caricare solo file pdf</h1><br><h2 style='text-align:center'>Torna alla pagina Precedente</h2>";
            }
        }
    }

    else{
        header("location: Home.html");
    }
?>