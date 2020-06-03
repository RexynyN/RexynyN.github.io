//Array of "objImg" objects created in the handleFileSelect function, which store information about the image files
var urls = [];

//Support variable to handle the files and PDF
var files = "";


// ****HTML elements gathering****  

//Drag n' Drop zone Element
var dropZone = document.getElementById('drop_zone');

//Configurations Modal
var modal = document.getElementById("myModal");

//Confirmation Modal
var modal2 = document.getElementById("myModal2");

//Button which opens the configuration modal
var btn = document.getElementById("myBtn");

//Span that closes the configuration modal
var span = document.getElementById("close");

//Span that closes the confirmation modal
var span2 = document.getElementById("close2");

//Span that closes the loading modal
var span3 = document.getElementById("close3");

//Check button of image dimension
var check = document.getElementById("check2");

//Div that contains the dimensions values
var divDim = document.getElementById("dimensions");

//Select with the Sheet Size
var sizeSheet = document.getElementById("sizeSheet");

//Counter of read files
var quanto = document.getElementById('quanto');

//Drag n' Drop div
var dropS = document.getElementById("dropSwitch");

//Counter of read Files div 
var quantoS = document.getElementById("quantoSwitch");

//Hidden Image Container
var hiddenContainer = document.getElementById('container');

//Image Organizer 
var container = document.getElementById('imgOrganizer');

//Passo 1 div
var passo1 = document.getElementById("passo1");

//Passo 2 txt
var passo2 = document.getElementById("passo2");

//Alphabetical order
var alpha = document.getElementById("alpha");

//Modal 
var btnModal = document.getElementById("btnModal");

//Random button
var btnRandom = document.getElementById("random");

//File Input tag
var imgInput = document.getElementById('imgs');

//Pdf iframe
var pdfViewer = document.getElementById("pdfViewer");

//PDF form
var form = document.getElementById("formPDF");

//Create PDf Button
var pdfCreate = document.getElementById("pdfCreate");

//Modal Loading
var modalL = document.getElementById("myModalLoading");

//Loading animation
var loading = document.getElementById("loading");

// ****Event Listeners****

// Drag n' Drop Zone
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', setFilesDrag, false);

//File Input
imgInput.addEventListener('change', setFilesInput, false);


// ****Functions****



// ****1st Step: File Reading****

function setFilesInput(evt) {
    files = evt.target.files;
    if (files != "") {
        handleFileSelect();
    }
}

function setFilesDrag(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    files = evt.dataTransfer.files; // FileList object.
    handleFileSelect();
}


function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

//Leitor de Txt
function handleFileSelect() {
    dropS.style.display = "none";
    modalL.style.display = "block";
    loading.style.display = "block";

    var count = 1;
    if (FileReader && files && files.length) {
        console.log("Lendo as Imagens... ");

        for (var i = 0, f; f = files[i]; i++) {
            
            var fr=new FileReader(); 
            fr.onload = function(){ 
                var links = fr.result.split('@');

                console.log(links.length);

                    for(var i = 0; i < links.length; i++){
                        document.getElementById('teste1').src = links[i];
                        console.log(links[i]);
                        urls[i] = links[i];
                    }
                
                if (files.length > 1)
                        quanto.innerHTML = count + "/" + files.length + " Imagens carregadas";
                    else
                        quanto.innerHTML = "1/1 Imagem carregada";

                    count++;
                    
                    if (count >= files.length) {
                        loading.style.display = "none";
                        btn.hidden = false;
                    }
            } 
              
            fr.readAsText(this.files[0]); 
        }
    }
}

function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
  
    // create a view into the buffer
    var ia = new Uint8Array(ab);
  
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  }


btn.onclick = function() {
    if (files == "") {
        alert("Nenhuma imagem encontrada!");
    } else {
        modalL.style.display = "none";
        passo1.hidden = false;

        for(var i = 0; i < urls.length; i++){
            saveAs(dataURItoBlob(urls[i]));
        }
    }
}


