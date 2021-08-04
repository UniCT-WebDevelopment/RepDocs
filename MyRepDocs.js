const MODALADD = document.getElementById("addModal");
const MODALMODIFY = document.getElementById("modifyModal");

document.body.onload = function(){
    loadMyDocs();  
    verifyC();
};

function exit(){
    const INVIO = new XMLHttpRequest();
    INVIO.onload = function(){

        if(INVIO.responseText == 1){
            alert("Ti sei Disconnesso");
        }
        else{
            alert("Non sei connesso");
        }

        location.href = "index.html";
    }

    INVIO.open("GET","php/exit.php",true);
    INVIO.send();
}

function closeMod(){
    MODALMODIFY.style.display = "none";
    document.getElementsByClassName("load")[0].style.display = "none";
    document.getElementById("modifyErr").innerHTML = "";
    document.getElementById("riuscito").innerHTML = "";
}

function showMenu(){
    const MENU = document.getElementById("myLinks");
    if(MENU.style.display === "block"){
        MENU.style.display = "none";
    }
    else{
        MENU.style.display = "block";
    }
}

function verifyC(){
    const INVIO = new XMLHttpRequest();
    INVIO.onload = function(){

        if(INVIO.responseText == 0){
            location.href = "index.html";
        }
    }

    INVIO.open("GET", "php/verifica.php", true);
    INVIO.send();
}

function add(){
    MODALADD.style.display = "block";
}

function closeAdd(){
    MODALADD.style.display = "none";
}

function loadMyDocs(){

    var img = "img/Doc.jpg";

    const INVIO = new XMLHttpRequest();
    
    INVIO.onload = function(){

        if(INVIO.responseText != "Errore"){
            var myItem = INVIO.responseText;
            var arr = JSON.parse(myItem);

            if(arr.length > 0){
                for(var i=0; i<arr.length; i++){
                    document.getElementById("myDocs").innerHTML += "<div><div class='imgDoc' style='background-image: url(" + img + ")'></div><div style='width:100%; height: 80px'><p class='titleDoc'>" + arr[i].Titolo + "</p></div><div style='width:100%; height:200px; overflow:scroll'><p class='docDescr'>" + arr[i].Descrizione + "</p></div><div style='width:100%; height: auto'><a href='" + arr[i].Percorso + "' download><input type='button' class='docbtn' onclick='downSum(" + arr[i].ID + ")' value='Scarica'></a><input type='button' class='docbtn' style='background-color: red; margin-top:5px' onclick='deleteD(" + arr[i].ID +")' value='Elimina'></div></div>";
                }    
            }
            else{
                document.getElementById("not_foundm").style.display = "block";
            }
        }
        else{
            alert("Errore Caricamento Documenti");         
        }
    }

    INVIO.open("GET", "php/loaderMyDocs.php", true);
    INVIO.send();
}

function downSum(id){

    const INVIO = new XMLHttpRequest();

    INVIO.onload = function(){
        if(INVIO.responseText != "Ok"){
            alert("Errore");
        }
    }

    INVIO.open("POST", "php/incrementDownCount.php", true);
    INVIO.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    INVIO.send("id=" + id);
}

function deleteD(id){

    const INVIO = new XMLHttpRequest();

    INVIO.onload = function(){
        if(INVIO.responseText == "Errore"){
            alert("Errore Durante l'eliminazione del Documento");
        }
        else{
            alert("Documento Eliminato");
            location.href="MyRepDocs.html";
        }
    }

    INVIO.open("POST", "php/deleteDoc.php", true);
    INVIO.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    INVIO.send("id=" + id);
}

function modify(){
    MODALMODIFY.style.display = "block";
    document.getElementsByClassName("load")[0].style.display = "none";
    document.getElementById("modifyErr").innerHTML = "";
    document.getElementById("riuscito").innerHTML = "";

    const INVIO = new XMLHttpRequest();

    INVIO.onload = function(){
        if(INVIO.responseText == "Errore"){
            alert("Errore");
        }
        else{
            var myItem = INVIO.responseText;
            var arr = JSON.parse(myItem);

            document.getElementsByName("email")[0].value = arr[0].E_Mail;
            document.getElementsByName("nome")[0].value = arr[0].Nome;
            document.getElementsByName("cognome")[0].value = arr[0].Cognome;
            document.getElementsByName("dataNascita")[0].value = arr[0].Data_Nascita;
            document.getElementsByName("password")[0].value = arr[0].Pass;            
        }
    }

    INVIO.open("GET", "php/getDataUser.php", true);
    INVIO.send();
}

function modifica(){
    document.getElementsByClassName("load")[0].style.display = "block";
    document.getElementById("modifyErr").innerHTML = "";
    document.getElementById("riuscito").innerHTML = "";

    var email = document.getElementsByName("email")[0].value;
    var nome = document.getElementsByName("nome")[0].value;
    var cognome = document.getElementsByName("cognome")[0].value;
    var data_nascitaC = new Date(document.getElementsByName("dataNascita")[0].value);
    var data_nascita = document.getElementsByName("dataNascita")[0].value;
    var password = document.getElementsByName("password")[0].value;
    var data_attuale = new Date();
    var dif = data_attuale.getFullYear() - data_nascitaC.getFullYear()

    if(dif >= 15){
        const INVIO = new XMLHttpRequest();
        INVIO.onload = function(){
            document.getElementsByClassName("load")[0].style.display = "none";

            if(INVIO.responseText == "Ok"){
                document.getElementById("riuscito").innerHTML = "I tuoi dati sono stati modificati";
            }
            else if(INVIO.responseText == "Err"){
                document.getElementById("modifyErr").innerHTML = "Dati Mancanti";
            }
            else if(INVIO.responseText == "ErrMail"){
                document.getElementById("modifyErr").innerHTML = "E-Mail Non Valida";
            }
            else{
                document.getElementById("modifyErr").innerHTML = "Errore";
            }
        }
    
        INVIO.open("POST","php/modifyDataUser.php", true);
        INVIO.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        INVIO.send("email=" + email + "&nome=" + nome + "&cognome=" + cognome + "&dataNascita=" + data_nascita + "&password=" + password);      
    }
    else{
        document.getElementsByClassName("load")[0].style.display = "none";
        alert("Devi avere almeno 15 anni per usare RepDocs");
        deleteAccount();
    }
}

function loadSearchedDoc(){
    var ricerca;

    if((document.getElementsByName("ricerca")[0].value != "") && (document.getElementsByName("ricerca")[1].value == "")){
        ricerca = document.getElementsByName("ricerca")[0].value;
    }
    else if((document.getElementsByName("ricerca")[1].value != "") && (document.getElementsByName("ricerca")[0].value == "")){
        ricerca = document.getElementsByName("ricerca")[1].value;
    }

    document.getElementById("myDocs").innerHTML = "";
    document.getElementById("not_foundm").style.display = "block";
    var img = "img/Doc.jpg";

    const INVIO = new XMLHttpRequest();
    
    INVIO.onload = function(){

        if(INVIO.responseText != "Errore"){
            if(INVIO.responseText == "Vuoto"){
                document.getElementById("not_foundm").style.display = "none";
                loadMyDocs();
            }
            else{
                var myItem = INVIO.responseText;
                var arr = JSON.parse(myItem);
    
                if(arr.length > 0){
                    document.getElementById("not_foundm").style.display = "none";
    
                    for(var i=0; i<arr.length; i++){
                        document.getElementById("myDocs").innerHTML += "<div><div class='imgDoc' style='background-image: url(" + img + ")'></div><div style='width:100%; height: 80px'><p class='titleDoc'>" + arr[i].Titolo + "</p></div><div style='width:100%; height:200px; overflow:scroll'><p class='docDescr'>" + arr[i].Descrizione + "</p></div><div style='width:100%; height: auto'><a href='" + arr[i].Percorso + "' download><input type='button' class='docbtn' onclick='downSum(" + arr[i].ID + ")' value='Scarica'></a><input type='button' class='docbtn' style='background-color: red; margin-top:5px' onclick='deleteD(" + arr[i].ID +")' value='Elimina'></div></div>";
                    }    
                }    
            }
        }
        else{
            alert("Errore Caricamento Documenti");
        }
    }

    INVIO.open("POST", "php/searcherMyDoc.php", true);
    INVIO.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    INVIO.send("ricerca=" + ricerca);
}

function deleteAccount(){

    const INVIO = new XMLHttpRequest();

    INVIO.onload = function(){

        if(INVIO.responseText == "Ok"){
            alert("Il tuo Account RepDocs e' stato Eliminato");
            location.href="index.html";
        }
        else{
            alert("Errore Durante l'eliminazione dell'Account");
        }
    }

    INVIO.open("GET", "php/deleteAccount.php", true);
    INVIO.send();
}

function areaUtenti(){
    location.href="areaUtenti.html";
}
