
const ModalAdd = document.getElementById("AddModal");

document.body.onload = function(){
    LoadLastDocs();
    LoadDownDocs();  
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

function LoadLastDocs(){

    var Img = "Immagini/Doc.jpg";

    const Invio = new XMLHttpRequest();
    
    Invio.onload = function(){

        if(Invio.responseText != "Errore"){
            var MyItem = Invio.responseText;
            var Arr = JSON.parse(MyItem);

            for(var I=0; I<Arr.length; I++){
                document.getElementById("LastDoc").innerHTML += "<div><div class='ImgDoc' style='background-image: url(" + Img + ");'></div><div style='width:100%; height: 80px'><p class='TitleDoc'>" + Arr[I].Titolo + "</p></div><div style='width:100%; height:200px; overflow:scroll;'><p class='DocDescr'>" + Arr[I].Descrizione +"</p></div><div style='width:100%; height: auto'><a href='" + Arr[I].Percorso + "' download><input type='button' class='Docbtn' onclick='DownSum(" + Arr[I].ID +")' value='Scarica'></a></div></div>";
            }
                      
        }
        else{
            alert("Errore Caricamento Documenti");         
        }
    }

    Invio.open("GET", "PHP/LastDocs.php", true);
    Invio.send();
}

function LoadDownDocs(){

    var Img = "Immagini/Doc.jpg";

    const Invio = new XMLHttpRequest();
    
    Invio.onload = function(){

        if(Invio.responseText != "Errore"){
            var MyItem = Invio.responseText;
            var Arr = JSON.parse(MyItem);

            for(var I=0; I<Arr.length; I++){
                document.getElementById("DownDoc").innerHTML += "<div><div class='ImgDoc' style='background-image: url(" + Img + ");'></div><div style='width:100%; height: 80px'><p class='TitleDoc'>" + Arr[I].Titolo + "</p></div><div style='width:100%; height:200px; overflow:scroll'><p class='DocDescr'>" + Arr[I].Descrizione +"</p></div><div style='width:100%; height: auto'><a href='" + Arr[I].Percorso + "' download><input type='button' class='Docbtn' onclick='DownSum(" + Arr[I].ID +")' value='Scarica'></a></div></div>";
            }
            
        }
        else{
            alert("Errore Caricamento Documenti");
        }
    }

    Invio.open("GET", "PHP/DownDocs.php", true);
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

function AreaUtenti(){
    location.href="AreaUtenti.html";
}
