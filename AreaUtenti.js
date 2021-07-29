var Z=0;
var Y=0;
const ModalAdd = document.getElementById("AddModal");

document.body.onload = function(){
    LoadDocs();
    LoadMyDocs();
    window.setInterval(LoadMyDocs, 3000);
    window.setInterval(LoadDocs, 3000);    
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

        location.href = "Home.html";
    }

    Invio.open("GET","Exit.php",true);
    Invio.send();
}

function VerifyC(){
    const Invio = new XMLHttpRequest();
    Invio.onload = function(){

        if(Invio.responseText == 0){
            location.href = "Home.html";
        }
    }

    Invio.open("GET", "Verifica.php", true);
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

            for(var I=0; I<(Arr.length - Z); I++){
                document.getElementById("myDoc").innerHTML += "<div><div class='ImgDoc' style='background-image: url(" + Img + ");'></div><p class='TitleDoc'>" + Arr[I].Titolo + "</p><p class='DocDescr'>" + Arr[I].Descrizione +"</p><a href='" + Arr[I].Percorso + "' download><input type='button' class='Docbtn' value='Scarica'></a><input type='button' class='Docbtn' onclick='Delete(" + Arr[I].ID +")' style='background-color: red; margin-top: 5px;' value='Elimina'></div>";
            }
            
            Z = Arr.length;           
        }
        else{
            alert("Errore Caricamento Documenti");         
        }
    }

    Invio.open("GET", "MyDoc.php", true);
    Invio.send();
}

function LoadDocs(){

    var Img = "Immagini/Doc.jpg";

    const Invio = new XMLHttpRequest();
    
    Invio.onload = function(){

        if(Invio.responseText != "Errore"){
            var MyItem = Invio.responseText;
            var Arr = JSON.parse(MyItem);

            for(var I=0; I<(Arr.length - Y); I++){
                document.getElementById("OtherDoc").innerHTML += "<div><div class='ImgDoc' style='background-image: url(" + Img + ");'></div><p class='TitleDoc'>" + Arr[I].Titolo + "</p><p class='DocDescr'>" + Arr[I].Descrizione +"</p><a href='" + Arr[I].Percorso + "' download><input type='button' class='Docbtn' value='Scarica'></a></div>";
            }
            
            Y = Arr.length;
        }
        else{
            alert("Errore Caricamento Documenti");
        }
    }

    Invio.open("GET", "OtherDoc.php", true);
    Invio.send();
}

function Delete(ID){

    const Invio = new XMLHttpRequest();

    Invio.onload = function(){
        alert(Invio.responseText);
        if(Invio.responseText == "Errore"){
            alert("Errore Durante l'eliminazione del Documento");
        }
        else{
            alert("Documento Eliminato");
            location.href="AreaUtenti.html";
        }
    }

    Invio.open("POST", "Delete.php", true);
    Invio.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Invio.send("ID=" + ID);
}