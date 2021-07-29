let i=0;

const ModalAccess = document.getElementById("AccessModal");
const ModalResolve = document.getElementById("ResolveModal");
const ModalRegister = document.getElementById("RegisterModal");

document.body.onload = function(){
    SlideShow();
    Verify();
};

function SlideShow(){
    var Slides = document.getElementsByClassName("mySlides");
    for(let i=0; i<Slides.length; i++){
        Slides[i].style.display = "none";
    }
    Slides[i%3].style.display="block";
    setInterval(function(){
        for(let i=0; i<Slides.length; i++){
            Slides[i].style.display = "none";
        }    
        Slides[i%3].style.display="block";
        i++;
    }, 3000);
}

function Accedi(){
    document.getElementsByClassName("Load")[0].style.display = "block";
    document.getElementById("AccessErr").innerHTML = "";

    var E_Mail = document.getElementsByName("EMail")[0].value;
    var Password = document.getElementsByName("Password")[0].value;

    const Invio = new XMLHttpRequest();
    Invio.onload = function(){
        document.getElementsByClassName("Load")[0].style.display = "none";

        if(Invio.responseText == "Ok"){
            location.href = "AreaUtenti.html";
        }
        else if(Invio.responseText == "Err"){
            document.getElementById("AccessErr").innerHTML = "Credenziali non corrette o Mancanti";
        }
        else if(Invio.responseText == "ErrMail"){
            document.getElementById("AccessErr").innerHTML = "E-Mail Non Valida";
        }
    }

    Invio.open("POST","Accesso.php", true);
    Invio.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Invio.send("E_Mail=" + E_Mail + "&Password=" + Password);  
}

function Registrazione(){
    document.getElementsByClassName("Load")[2].style.display = "block";
    document.getElementById("RegisterErr").innerHTML = "";

    var E_Mail = document.getElementsByName("EMail")[1].value;
    var Nome = document.getElementsByName("Nome")[0].value;
    var Cognome = document.getElementsByName("Cognome")[0].value;
    var Data_Nascita = document.getElementsByName("DataNascita")[0].value;
    var Password = document.getElementsByName("Password")[1].value;

    const Invio = new XMLHttpRequest();
    Invio.onload = function(){
        document.getElementsByClassName("Load")[2].style.display = "none";

        if(Invio.responseText == "Ok"){
            location.href = "AreaUtenti.html";
        }
        else if(Invio.responseText == "Err"){
            document.getElementById("RegisterErr").innerHTML = "Errore";
        }
        else if(Invio.responseText == "ErrMail"){
            document.getElementById("RegisterErr").innerHTML = "E-Mail Non Valida";
        }
    }

    Invio.open("POST","Registrazione.php", true);
    Invio.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Invio.send("E_Mail=" + E_Mail + "&Nome=" + Nome + "&Cognome=" + Cognome + "&DataNascita=" + Data_Nascita + "&Password=" + Password);  
}

function Accesso(){
    ModalAccess.style.display = "block";
}

function Correggi(){
    document.getElementsByClassName("Load")[0].style.display = "block";
    document.getElementById("AccessErr").innerHTML = "";
    document.getElementsByName("Inv_Pass")[0].value = "";
    document.getElementsByName("Nuova_Password")[0].value = "";

    var E_Mail = document.getElementsByName("EMail")[0].value;

    const Invio = new XMLHttpRequest();
    Invio.onload = function(){
        document.getElementsByClassName("Load")[0].style.display = "none";

        if(Invio.responseText == "Ok"){
            ModalAccess.style.display = "none";
            ModalResolve.style.display = "block";
        }

        else if(Invio.responseText == "NOT_FOUND"){
            document.getElementById("AccessErr").innerHTML = "E-Mail Inesistente";
        }
        
        else if(Invio.responseText == "ErrMail"){
            document.getElementById("AccessErr").innerHTML = "E-Mail Non Valida";
        }

        else{
            document.getElementById("AccessErr").innerHTML = "Errore";
        }
    }

    Invio.open("POST", "Correzione.php", true);
    Invio.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Invio.send("E_Mail=" + E_Mail);
}

function Risoluzione(){
    document.getElementsByClassName("Load")[1].style.display = "block";
    document.getElementById("ResolveErr").innerHTML = "";
    document.getElementById("Success").innerHTML = "";

    var Tmp_Pass = document.getElementsByName("Inv_Pass")[0].value;
    var New_Pass = document.getElementsByName("Nuova_Password")[0].value;

    const Invio = new XMLHttpRequest();
    Invio.onload = function(){
        document.getElementsByClassName("Load")[1].style.display = "none";

        if(Invio.responseText == "Ok"){
            document.getElementById("Success").innerHTML = "Password Cambiata";
        }
        else if(Invio.responseText == "ErrPass"){
            document.getElementById("ResolveErr").innerHTML = "Password inviata incorretta o mancante";
        }
        else if(Invio.responseText == "NOT_Pass"){
            document.getElementById("ResolveErr").innerHTML = "Dati Mancanti";
        }
        else{
            document.getElementById("ResolveErr").innerHTML = "Errore";
        }
    }

    Invio.open("POST", "Risoluzione.php", true);
    Invio.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Invio.send("Tmp_Pass=" + Tmp_Pass + "&New_Pass=" + New_Pass);
}

function CloseA(){
    ModalAccess.style.display = "none";
    document.getElementById("AccessErr").innerHTML = "";
    document.getElementsByClassName("Load")[0] = "none";
}

function CloseR(){
    ModalRegister.style.display = "none";
    document.getElementById("RegisterErr").innerHTML = "";
    document.getElementsByClassName("Load")[2] = "none";
}

function CloseResolve(){
    ModalResolve.style.display = "none";
    document.getElementById("Success").innerHTML = "";
    document.getElementsByClassName("Load")[1] = "none";
    document.getElementById("ResolveErr").innerHTML = "";
}

function Registrati(){
    ModalRegister.style.display = "block";
}

function Verify(){
    const Invio = new XMLHttpRequest();

    Invio.onload = function(){
        if(Invio.responseText == 1){
            location.href = "AreaUtenti.html";
        }
    }

    Invio.open("GET", "Verifica.php", true);
    Invio.send();
}