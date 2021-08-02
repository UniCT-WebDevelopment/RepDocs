<?php
    require "ConnessioneDB.php";

    $stmt = $conn->prepare("CREATE TABLE IF NOT EXISTS utente (
        E_Mail varchar(255) NOT NULL,
        Nome varchar(255) NOT NULL,
        Cognome varchar(255) NOT NULL,
        Data_Nascita date NOT NULL,
        Pass varchar(255) NOT NULL,
        
        PRIMARY KEY (E_Mail))");

    $stmt->execute();

    $stmt = $conn->prepare("CREATE TABLE IF NOT EXISTS documento (
        ID integer AUTO_INCREMENT NOT NULL,
        Percorso varchar(255) NOT NULL,
        Titolo varchar(255) NOT NULL,
        Descrizione varchar(1500) NOT NULL,
        E_Mail varchar(255) NOT NULL,
        Download int NOT NULL,
        
        PRIMARY KEY (ID),
        FOREIGN KEY (E_Mail) REFERENCES utente(E_Mail))");

    $stmt->execute();

    $conn = NULL;
?>