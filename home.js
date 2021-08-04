let i=0;

const MODALACCESS = document.getElementById("accessModal");
const MODALRESOLVE = document.getElementById("resolveModal");
const MODALREGISTER = document.getElementById("registerModal");

document.body.onload = function(){
    control();
    slideshow();
    verify();
};

function showMenu(){
    const MENU = document.getElementById("myLinks");
    if(MENU.style.display === "block"){
        MENU.style.display = "none";
    }
    else{
        MENU.style.display = "block";
    }
}

function slideshow(){
    var slides = document.getElementsByClassName("mySlides");
    for(let i=0; i<slides.length; i++){
        slides[i].style.display = "none";
    }
    slides[i%3].style.display="block";
    setInterval(function(){
        for(let i=0; i<slides.length; i++){
            slides[i].style.display = "none";
        }    
        slides[i%3].style.display="block";
        i++;
    }, 3000);
}

function control(){
    const INVIO = new XMLHttpRequest();
    INVIO.onload = function(){
        controlTable();
    }

    INVIO.open("GET", "php/automDB.php", true);
    INVIO.send();
}

function controlTable(){
    const INVIO = new XMLHttpRequest();

    INVIO.open("GET", "php/automTable.php", true);
    INVIO.send();
}

function accedi(){
    document.getElementsByClassName("load")[0].style.display = "block";
    document.getElementById("accessErr").innerHTML = "";

    var email = document.getElementsByName("email")[0].value;
    var password = document.getElementsByName("password")[0].value;

    const INVIO = new XMLHttpRequest();
    INVIO.onload = function(){
        document.getElementsByClassName("load")[0].style.display = "none";

        if(INVIO.responseText == "Ok"){
            location.href = "areaUtenti.html";
        }
        else if(INVIO.responseText == "Err"){
            document.getElementById("accessErr").innerHTML = "Credenziali non corrette o Mancanti";
        }
        else if(INVIO.responseText == "ErrMail"){
            document.getElementById("accessErr").innerHTML = "E-Mail Non Valida";
        }
        else{
            document.getElementById("accessErr").innerHTML = "Account Inesistente";
        }
    }

    INVIO.open("POST","php/accesso.php", true);
    INVIO.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    INVIO.send("email=" + email + "&password=" + password);  
}

function registrazione(){
    document.getElementsByClassName("load")[2].style.display = "block";
    document.getElementById("registerErr").innerHTML = "";

    var email = document.getElementsByName("email")[1].value;
    var nome = document.getElementsByName("nome")[0].value;
    var cognome = document.getElementsByName("cognome")[0].value;
    var data_nascitac = new Date(document.getElementsByName("dataNascita")[0].value);
    var data_nascita = document.getElementsByName("dataNascita")[0].value;
    var password = document.getElementsByName("password")[1].value;
    var data_attuale = new Date();
    var dif = data_attuale.getFullYear() - data_nascitac.getFullYear()
    
    if(dif >= 15){
        const INVIO = new XMLHttpRequest();
        INVIO.onload = function(){
            document.getElementsByClassName("load")[2].style.display = "none";

            if(INVIO.responseText == "Ok"){
                location.href = "AreaUtenti.html";
            }
            else if(INVIO.responseText == "Err"){
                document.getElementById("registerErr").innerHTML = "Dati Mancanti";
            }
            else if(INVIO.responseText == "ErrMail"){
                document.getElementById("registerErr").innerHTML = "E-Mail Non Valida";
            }
            else{
                document.getElementById("registerErr").innerHTML = "Errore";
            }
        }
    
        INVIO.open("POST","php/registrazione.php", true);
        INVIO.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        INVIO.send("email=" + email + "&nome=" + nome + "&cognome=" + cognome + "&dataNascita=" + data_nascita + "&password=" + password);      
    }
    else{
        document.getElementsByClassName("load")[2].style.display = "none";
        document.getElementById("registerErr").innerHTML = "Devi avere almeno 15 anni per iscriverti";
    }
}

function accesso(){
    MODALACCESS.style.display = "block";
}

function correggi(){
    document.getElementsByClassName("load")[0].style.display = "block";
    document.getElementById("accessErr").innerHTML = "";
    document.getElementsByName("invpass")[0].value = "";
    document.getElementsByName("nuovapassword")[0].value = "";

    var email = document.getElementsByName("email")[0].value;

    const INVIO = new XMLHttpRequest();
    INVIO.onload = function(){
        document.getElementsByClassName("load")[0].style.display = "none";

        if(INVIO.responseText == "Ok"){
            MODALACCESS.style.display = "none";
            MODALRESOLVE.style.display = "block";
        }

        else if(INVIO.responseText == "NOT_FOUND"){
            document.getElementById("accessErr").innerHTML = "E-Mail Inesistente";
        }
        
        else if(INVIO.responseText == "ErrMail"){
            document.getElementById("accessErr").innerHTML = "E-Mail Non Valida";
        }

        else if(INVIO.responseText == "Err"){
            document.getElementById("accessErr").innerHTML = "E-Mail Mancante";
        }

        else{
            document.getElementById("accessErr").innerHTML = "Account Inesistente";
        }
    }

    INVIO.open("POST", "php/correzione.php", true);
    INVIO.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    INVIO.send("email=" + email);
}

function risoluzione(){
    document.getElementsByClassName("load")[1].style.display = "block";
    document.getElementById("resolveErr").innerHTML = "";
    document.getElementById("success").innerHTML = "";

    var tmp_pass = document.getElementsByName("invpass")[0].value;
    var new_pass = document.getElementsByName("nuovapassword")[0].value;

    const INVIO = new XMLHttpRequest();
    INVIO.onload = function(){
        document.getElementsByClassName("load")[1].style.display = "none";

        if(INVIO.responseText == "Ok"){
            document.getElementById("success").innerHTML = "Password Cambiata";
        }
        else if(INVIO.responseText == "ErrPass"){
            document.getElementById("resolveErr").innerHTML = "Password inviata incorretta";
        }
        else if(INVIO.responseText == "NOT_Pass"){
            document.getElementById("resolveErr").innerHTML = "Dati Mancanti";
        }
        else{
            document.getElementById("resolveErr").innerHTML = "Errore";
        }
    }

    INVIO.open("POST", "php/risoluzione.php", true);
    INVIO.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    INVIO.send("tmp_pass=" + tmp_pass + "&new_pass=" + new_pass);
}

function closeA(){
    MODALACCESS.style.display = "none";
    document.getElementById("accessErr").innerHTML = "";
    document.getElementsByClassName("load")[0] = "none";
    document.getElementsByName("email")[0].value = "";
    document.getElementsByName("password")[0].value = "";
}

function closeR(){
    MODALREGISTER.style.display = "none";
    document.getElementById("registerErr").innerHTML = "";
    document.getElementsByClassName("load")[2] = "none";
}

function closeResolve(){
    MODALRESOLVE.style.display = "none";
    document.getElementById("success").innerHTML = "";
    document.getElementsByClassName("load")[1] = "none";
    document.getElementById("resolveErr").innerHTML = "";
}

function registrati(){
    MODALREGISTER.style.display = "block";
}

function verify(){
    const INVIO = new XMLHttpRequest();

    INVIO.onload = function(){
        if(INVIO.responseText == 1){
            location.href = "AreaUtenti.html";
        }
    }

    INVIO.open("GET", "php/verifica.php", true);
    INVIO.send();
}