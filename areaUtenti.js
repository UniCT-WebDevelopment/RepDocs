const MODALADD = document.getElementById("addModal");

document.body.onload = function() {
    loadLastDocs();
    loadDownDocs();
    verifyC();
};

function exit() {
    const INVIO = new XMLHttpRequest();
    INVIO.onload = function() {

        if (INVIO.responseText == 1) {
            alert("Ti sei Disconnesso");
        } else {
            alert("Non sei connesso");
        }

        location.href = "index.html";
    }

    INVIO.open("GET", "php/exit.php", true);
    INVIO.send();
}

function showMenu() {
    const MENU = document.getElementById("myLinks");
    if (MENU.style.display === "block") {
        MENU.style.display = "none";
    } else {
        MENU.style.display = "block";
    }
}

function verifyC() {
    const INVIO = new XMLHttpRequest();
    INVIO.onload = function() {

        if (INVIO.responseText == 0) {
            location.href = "index.html";
        }
    }

    INVIO.open("GET", "php/verifica.php", true);
    INVIO.send();
}

function add() {
    MODALADD.style.display = "block";
}

function closeAdd() {
    MODALADD.style.display = "none";
}

function loadLastDocs() {

    var img = "img/Doc.jpg";

    const INVIO = new XMLHttpRequest();

    INVIO.onload = function() {

        if (INVIO.responseText != "Errore") {
            var myItem = INVIO.responseText;
            var arr = JSON.parse(myItem);

            for (var i = 0; i < arr.length; i++) {
                document.getElementById("lastDoc").innerHTML += "<div title='Caricato da " + arr[i].E_Mail + "'><div class='imgDoc' style='background-image: url(" + img + ")'></div><div style='width:100%; height: 80px'><p class='titleDoc'>" + arr[i].Titolo + "</p></div><div style='width:100%; height:200px; overflow:scroll'><p class='docDescr'>" + arr[i].Descrizione + "</p></div><div style='width:100%; height: auto'><a href='" + arr[i].Percorso + "' download><input type='button' class='docbtn' onclick='downSum(" + arr[i].ID + ")' value='Scarica'></a></div></div>";
            }

        } else {
            alert("Errore Caricamento Documenti");
        }
    }

    INVIO.open("GET", "php/lastDocs.php", true);
    INVIO.send();
}

function loadDownDocs() {

    var img = "img/Doc.jpg";

    const INVIO = new XMLHttpRequest();

    INVIO.onload = function() {

        if (INVIO.responseText != "Errore") {
            var myItem = INVIO.responseText;
            var arr = JSON.parse(myItem);

            for (var i = 0; i < arr.length; i++) {
                document.getElementById("downDoc").innerHTML += "<div title='Caricato da " + arr[i].E_Mail + "'><div class='imgDoc' style='background-image: url(" + img + ")'></div><div style='width:100%; height: 80px'><p class='titleDoc'>" + arr[i].Titolo + "</p></div><div style='width:100%; height:200px; overflow:scroll'><p class='docDescr'>" + arr[i].Descrizione + "</p></div><div style='width:100%; height: auto'><a href='" + arr[i].Percorso + "' download><input type='button' class='docbtn' onclick='downSum(" + arr[i].ID + ")' value='Scarica'></a></div></div>";
            }

        } else {
            alert("Errore Caricamento Documenti");
        }
    }

    INVIO.open("GET", "php/downDocs.php", true);
    INVIO.send();
}

function downSum(id) {

    const INVIO = new XMLHttpRequest();

    INVIO.onload = function() {
        if (INVIO.responseText != "Ok") {
            alert("Errore");
        }
    }

    INVIO.open("POST", "php/incrementDownCount.php", true);
    INVIO.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    INVIO.send("id=" + id);
}

function areaUtenti() {
    location.href = "areaUtenti.html";
}