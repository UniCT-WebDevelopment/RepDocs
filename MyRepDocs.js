const ModalAdd = document.getElementById("AddModal");
const ModalModify = document.getElementById("ModifyModal");

document.body.onload = function(){
    LoadMyDocs();  
    VerifyC();
};

function Exit(){
    const Invio = new XMLHttpRequest();
    Invio.onload = function(){

        if(Invio.responseText == 1){
            alert("Ti sei Disconnesso");
        }
        else{
            alert("Non sei connesso");
        }

        location.href = "index.html";
    }

    Invio.open("GET","PHP/Exit.php",true);
    Invio.send();
}

function CloseMod(){
    ModalModify.style.display = "none";
    document.getElementsByClassName("Load")[0].style.display = "none";
    document.getElementById("ModifyErr").innerHTML = "";
    document.getElementById("Riuscito").innerHTML = "";
}

function ShowMenu(){
    const Menu = document.getElementById("MyLinks");
    if(Menu.style.display === "block"){
        Menu.style.display = "none";
    }
    else{
        Menu.style.display = "block";
    }
}

function VerifyC(){
    const Invio = new XMLHttpRequest();
    Invio.onload = function(){

        if(Invio.responseText == 0){
            location.href = "index.html";
        }
    }

    Invio.open("GET", "PHP/Verifica.php", true);
    Invio.send();
}

function Add(){
    ModalAdd.style.display = "block";
}

function CloseAdd(){
    ModalAdd.style.display = "none";
}

function LoadMyDocs(){

    var Img = "Immagini/Doc.jpg";

    const Invio = new XMLHttpRequest();
    
    Invio.onload = function(){

        if(Invio.responseText != "Errore"){
            var MyItem = Invio.responseText;
            var Arr = JSON.parse(MyItem);

            if(Arr.length > 0){
                for(var I=0; I<Arr.length; I++){
                    document.getElementById("MyDocs").innerHTML += "<div><div class='ImgDoc' style='background-image: url(" + Img + ");'></div><div style='width:100%; height: 80px'><p class='TitleDoc'>" + Arr[I].Titolo + "</p></div><div style='width:100%; height:200px; overflow:scroll;'><p class='DocDescr'>" + Arr[I].Descrizione +"</p></div><div style='width:100%; height: auto'><a href='" + Arr[I].Percorso + "' download><input type='button' class='Docbtn' onclick='DownSum(" + Arr[I].ID +")' value='Scarica'></a><input type='button' class='Docbtn' style='background-color: red; margin-top:5px' onclick='Delete(" + Arr[I].ID +")' value='Elimina'></div></div>";
                }    
            }
            else{
                document.getElementById("NOT_FOUNDM").style.display = "block";
            }
        }
        else{
            alert("Errore Caricamento Documenti");         
        }
    }

    Invio.open("GET", "PHP/LoaderMyDocs.php", true);
    Invio.send();
}

function DownSum(ID){

    const Invio = new XMLHttpRequest();

    Invio.onload = function(){
        if(Invio.responseText != "Ok"){
            alert("Errore");
        }
    }

    Invio.open("POST", "PHP/IncrementDownCount.php", true);
    Invio.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Invio.send("ID=" + ID);
}

function Delete(ID){

    const Invio = new XMLHttpRequest();

    Invio.onload = function(){
        if(Invio.responseText == "Errore"){
            alert("Errore Durante l'eliminazione del Documento");
        }
        else{
            alert("Documento Eliminato");
            location.href="MyRepDocs.html";
        }
    }

    Invio.open("POST", "PHP/DeleteDoc.php", true);
    Invio.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Invio.send("ID=" + ID);
}

function Modify(){
    ModalModify.style.display = "block";
    document.getElementsByClassName("Load")[0].style.display = "none";
    document.getElementById("ModifyErr").innerHTML = "";
    document.getElementById("Riuscito").innerHTML = "";

    const Invio = new XMLHttpRequest();

    Invio.onload = function(){
        if(Invio.responseText == "Errore"){
            alert("Errore");
        }
        else{
            var MyItem = Invio.responseText;
            var Arr = JSON.parse(MyItem);

            document.getElementsByName("EMail")[0].value = Arr[0].E_Mail;
            document.getElementsByName("Nome")[0].value = Arr[0].Nome;
            document.getElementsByName("Cognome")[0].value = Arr[0].Cognome;
            document.getElementsByName("DataNascita")[0].value = Arr[0].Data_Nascita;
            document.getElementsByName("Password")[0].value = Arr[0].Pass;            
        }
    }

    Invio.open("GET", "PHP/GetDataUser.php", true);
    Invio.send();
}

function Modifica(){
    document.getElementsByClassName("Load")[0].style.display = "block";
    document.getElementById("ModifyErr").innerHTML = "";
    document.getElementById("Riuscito").innerHTML = "";

    var E_Mail = document.getElementsByName("EMail")[0].value;
    var Nome = document.getElementsByName("Nome")[0].value;
    var Cognome = document.getElementsByName("Cognome")[0].value;
    var Data_Nascita = document.getElementsByName("DataNascita")[0].value;
    var Password = document.getElementsByName("Password")[0].value;

    const Invio = new XMLHttpRequest();
    Invio.onload = function(){
        document.getElementsByClassName("Load")[0].style.display = "none";

        if(Invio.responseText == "Ok"){
            document.getElementById("Riuscito").innerHTML = "I tuoi dati sono stati modificati";
        }
        else if(Invio.responseText == "Err"){
            document.getElementById("ModifyErr").innerHTML = "Dati Mancanti";
        }
        else if(Invio.responseText == "ErrMail"){
            document.getElementById("ModifyErr").innerHTML = "E-Mail Non Valida";
        }
        else{
            document.getElementById("ModifyErr").innerHTML = "Errore";
        }
    }

    Invio.open("POST","PHP/ModifyDataUser.php", true);
    Invio.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Invio.send("E_Mail=" + E_Mail + "&Nome=" + Nome + "&Cognome=" + Cognome + "&DataNascita=" + Data_Nascita + "&Password=" + Password);  
}

function LoadSearchedDoc(){
    var Ricerca;

    if((document.getElementsByName("Ricerca")[0].value != "") && (document.getElementsByName("Ricerca")[1].value == "")){
        Ricerca = document.getElementsByName("Ricerca")[0].value;
    }
    else if((document.getElementsByName("Ricerca")[1].value != "") && (document.getElementsByName("Ricerca")[0].value == "")){
        Ricerca = document.getElementsByName("Ricerca")[1].value;
    }

    document.getElementById("MyDocs").innerHTML = "";
    document.getElementById("NOT_FOUNDM").style.display = "block";
    var Img = "Immagini/Doc.jpg";

    const Invio = new XMLHttpRequest();
    
    Invio.onload = function(){

        if(Invio.responseText != "Errore"){
            if(Invio.responseText == "Vuoto"){
                document.getElementById("NOT_FOUNDM").style.display = "none";
                LoadMyDocs();
            }
            else{
                var MyItem = Invio.responseText;
                var Arr = JSON.parse(MyItem);
    
                if(Arr.length > 0){
                    document.getElementById("NOT_FOUNDM").style.display = "none";
    
                    for(var I=0; I<Arr.length; I++){
                        document.getElementById("MyDocs").innerHTML += "<div><div class='ImgDoc' style='background-image: url(" + Img + ");'></div><div style='width:100%; height: 80px'><p class='TitleDoc'>" + Arr[I].Titolo + "</p></div><div style='width:100%; height:200px; overflow:scroll'><p class='DocDescr'>" + Arr[I].Descrizione +"</p></div><div style='width:100%; height: auto'><a href='" + Arr[I].Percorso + "' download><input type='button' class='Docbtn' onclick='DownSum(" + Arr[I].ID +")' value='Scarica'></a><input type='button' class='Docbtn' style='background-color: red; margin-top:5px' onclick='Delete(" + Arr[I].ID +")' value='Elimina'></div></div>";
                    }    
                }    
            }
        }
        else{
            alert("Errore Caricamento Documenti");
        }
    }

    Invio.open("POST", "PHP/SearcherMyDoc.php", true);
    Invio.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Invio.send("Ricerca=" + Ricerca);
}

function DeleteAccount(){

    const Invio = new XMLHttpRequest();

    Invio.onload = function(){
        alert(Invio.responseText);
        if(Invio.responseText == "Ok"){
            alert("Il tuo Account RepDocs è stato Eliminato");
            location.href="index.html";
        }
        else{
            alert("Errore Durante l'eliminazione dell'Account");
        }
    }

    Invio.open("GET", "PHP/DeleteAccount.php", true);
    Invio.send();
}

function AreaUtenti(){
    location.href="AreaUtenti.html";
}
