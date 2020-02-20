//Array of "objImg" objects created in the handleFileSelect function, which store information about the image files
var urls = [];

//Support variable to handle the files and PDF
var files = "";

var grid;

var doc;

var pdfURL;

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

//Leitor de Imagens
function handleFileSelect() {
    dropS.style.display = "none";
    modalL.style.display = "block";
    loading.style.display = "block";

    var count = 1;
    if (FileReader && files && files.length) {
        console.log("Lendo as Imagens... ");

        for (var i = 0, f; f = files[i]; i++) {

            if (!f.type.match('image.*')) {
                continue;
            }

            var fr = new FileReader();
            fr.onload = (function(theFile) {
                return function(e) {
                    var pic = document.createElement('img');
                    var link = e.target.result;
                    pic.src = link;
                    pic.setAttribute("id", theFile.name);
                    hiddenContainer.appendChild(pic);

                    var objImg = {
                        link: link,
                        file: theFile.name,
                        width: 0,
                        height: 0,
                        stance: ""
                    }

                    urls.push(objImg);

                    if (files.length > 1)
                        quanto.innerHTML = count + "/" + files.length + " Imagens carregadas";
                    else
                        quanto.innerHTML = "1/1 Imagem carregada";

                    count++;
                    if (count >= files.length) {
                        loading.style.display = "none";
                        btn.hidden = false;
                    }
                };
            })(f);

            fr.readAsDataURL(f);
        }
    }
}

function setImgs() {
    for (var x = 0; x < urls.length; x++) {
        var pic = document.getElementById(urls[x].file);
        urls[x].width = pic.width;
        urls[x].height = pic.height;
        console.log(pic.height + " x " + pic.width);
    }
}

function getMeasure() {
    for (var x = 0; x < urls.length; x++) {
        if (urls[x].width > urls[x].height)
            urls[x].stance = "l";
        else
            urls[x].stance = "p";
    }
}

function removeHiddenContainer() {
    hiddenContainer.remove();
    hiddenContainer = document.createElement("div");
    hiddenContainer.id = "container";
    document.getElementsByTagName("body")[0].appendChild(hiddenContainer);
}

btn.onclick = function() {
    if (files == "") {
        alert("Nenhuma imagem encontrada!");
    } else {
        modalL.style.display = "none";
        passo1.hidden = true;
        container.hidden = false;
        passo2.style.display = "block";
        setImgs();
        getMeasure();
        removeHiddenContainer();
        grid = new Muuri(container, {
            dragEnabled: true,
            items: createImgOrganizer()
        });
    }
}



// ****2nd Step:Image Organization****

function createImgOrganizer() {
    var divs = [];
    console.log("Criando Grid de Imagens...");

    for (var x = 0; x < urls.length; x++) {
        var div1 = document.createElement("DIV");
        div1.setAttribute("class", "item");

        var div2 = document.createElement("DIV");
        div2.setAttribute("class", "item-content");


        var pic = document.createElement('IMG');
        pic.src = urls[x].link;
        pic.setAttribute("id", urls[x].file);
        pic.setAttribute("name", "pics");
        pic.setAttribute("stance", urls[x].stance);

        div2.appendChild(pic);
        div1.appendChild(div2);
        divs.push(div1);
    }
    return divs;
}

//Alphabetical order
alpha.onclick = function() {
    console.log("Ordenando...");
    grid.destroy(true);
    urls.sort(naturalCompare);
    grid = new Muuri(container, {
        dragEnabled: true,
        items: createImgOrganizer()
    });
}

//Random order
random.onclick = function() {
    console.log("Randomizando...");
    grid.destroy(true);
    shuffleArray(urls);
    grid = new Muuri(container, {
        dragEnabled: true,
        items: createImgOrganizer()
    });
}



// ****3rd Step: PDF configuration****

//Open modal
btnModal.onclick = function() {
    grid.synchronize();
    var pics = document.getElementsByName("pics");

    for (var x = 0; x < urls.length; x++) {
        console.log(urls[x].link);
        urls[x].link = pics[x].src;
        urls[x].stance = pics[x].getAttribute("stance");
    }
    modal.style.display = "block";
}

//Close modal from (x) button
span.onclick = function() {
    modal.style.display = "none";
}


//Dimension block of modal confirmation
check.onchange = function() {
    if (!check.checked) {
        divDim.style.display = "block";
    } else {
        divDim.style.display = "none";
    }
}

//Changes de Sheet Size information with the selected value
sizeSheet.onchange = function() {
    var sheet = getSheetSize(sizeSheet.value);
    document.getElementById("labelFormat").innerHTML = "Você selecionou o formato " + sizeSheet.value.toUpperCase();
    document.getElementById("labelWidth").innerHTML = "Largura do Formato: " + sheet.width + "mm";
    document.getElementById("labelHeight").innerHTML = "Altura do Formato: " + sheet.height + "mm";
}

// When the user clicks anywhere outside of the modals, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }

    if (event.target == modal2) {
        location.reload();
    }

    if (event.target == modalL) {
        location.reload();
    }
}

//PDF creator
function createPDF() {
    var orientation = document.getElementById("orientationPDF").value;
    var format = sizeSheet.value;
    var size = getSheetSize(format);
    var all = document.getElementById("check3");


    var marginL;
    var marginU;
    var widthM;
    var heightM;

    if (document.getElementById("check2").checked) {
        marginL = Number.parseFloat(document.getElementById("border").value);
        marginU = Number.parseFloat(document.getElementById("border").value);
        widthM = size.width;
        heightM = size.height;
    } else {
        marginL = Number.parseFloat(document.getElementById("marginLft").value);
        marginU = Number.parseFloat(document.getElementById("marginUp").value);
        widthM = Number.parseFloat(document.getElementById("widthMM").value);
        heightM = Number.parseFloat(document.getElementById("heightMM").value);
    }

    console.log(marginL + " " + marginU + " " + widthM + " " + heightM + " ");

    for (var x = 0; x < urls.length; x++) {
        console.log(urls[x].file + "  " + urls[x].stance);
    }

    switch (orientation) {
        case "auto":
            if (all.checked) {
                if (urls[0].stance == "l")
                    doc = new jsPDF("landscape", "mm", format);
                else
                    doc = new jsPDF("portrait", "mm", format);
            }

            for (var i = 0; i < urls.length; i++) {
                if (urls[i].link != null && urls[i].link != "" && urls[i].link != undefined) {
                    if (!all.checked) {
                        var dec;
                        if (urls[i].stance == "l") {
                            dec = new jsPDF("landscape", "mm", format);
                            dec.addImage(urls[i].link, 'PNG', marginL, marginU, (heightM - (marginL * 2)), (widthM - (marginL * 2)));
                            dec.save(document.getElementById('namePDF').value + " - " + (i + 1) + '.pdf');
                        } else {
                            dec = new jsPDF("portrait", "mm", format);
                            dec.addImage(urls[i].link, 'PNG', marginL, marginU, (widthM - (marginL * 2)), (heightM - (marginL * 2)));
                            dec.save(document.getElementById('namePDF').value + " - " + (i + 1) + '.pdf');
                        }

                    } else {
                        if (urls[i].stance == "l") {
                            if (i == 0)
                                doc.addImage(urls[0].link, 'PNG', marginL, marginU, (heightM - (marginL * 2)), (widthM - (marginL * 2)));
                            else {
                                doc.addPage(format, "l");
                                doc.addImage(urls[i].link, 'PNG', marginL, marginU, (heightM - (marginL * 2)), (widthM - (marginL * 2)));
                            }
                        } else {
                            if (i == 0)
                                doc.addImage(urls[0].link, 'PNG', marginL, marginU, (widthM - (marginL * 2)), (heightM - (marginL * 2)));
                            else {
                                doc.addPage(format, "p");
                                doc.addImage(urls[i].link, 'PNG', marginL, marginU, (widthM - (marginL * 2)), (heightM - (marginL * 2)));
                            }
                        }
                    }
                }
            }
            break;
        case "l":
        case "p":
            if (orientation == "l") {
                x = heightM;
                y = widthM;
            } else {
                x = widthM;
                y = heightM;
            }

            doc = new jsPDF(orientation, "mm", format);
            for (var i = 0; i < urls.length; i++) {
                if (!all.checked) {
                    doc = new jsPDF(orientation, "mm", format);
                    doc.addImage(urls[i].link, 'PNG', marginL, marginU, (x - (marginL * 2)), (y - (marginL * 2)));
                    doc.save(document.getElementById('namePDF').value + " - " + (i + 1) + '.pdf');

                } else {
                    if (urls[i].link != null && urls[i].link != "" && urls[i].link != undefined) {
                        if (i == 0)
                            doc.addImage(urls[i].link, 'PNG', marginL, marginU, (x - (marginL * 2)), (y - (marginL * 2)));
                        else {
                            doc.addPage(format, orientation);
                            doc.addImage(urls[i].link, 'PNG', marginL, marginU, (x - (marginL * 2)), (y - (marginL * 2)));
                        }
                    }
                }
            }
            break;
    }

    if (all.checked) {
        console.log("Salvando PDF...");
        doc.save(document.getElementById("namePDF").value + '.pdf');
    }
    modal2.style.display = "block";
    modal.style.display = "none";
}



// ****4th Step: Confirmation****

// When the user clicks on <span> (x), close the configuration modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks on <span> (x), close the confirmation modal
span2.onclick = function() {
    location.reload();
}

span3.onclick = function() {
    location.reload();
}


function fecharModal() {
    location.reload();
}

pdfCreate.onclick = function() {
    createPDF();
    console.log();
}



// ****Support Functions****

//Sort do Array de URLS
var chunkRgx = /(_+)|([0-9]+)|([^0-9_]+)/g;

function naturalCompare(a, b) {
    var ax = [],
        bx = [];

    a.file.replace(chunkRgx, function(_, $1, $2, $3) {
        ax.push([$1 || "0", $2 || Infinity, $3 || ""])
    });
    b.file.replace(chunkRgx, function(_, $1, $2, $3) {
        bx.push([$1 || "0", $2 || Infinity, $3 || ""])
    });

    while (ax.length && bx.length) {
        var an = ax.shift();
        var bn = bx.shift();
        var nn = an[0].localeCompare(bn[0]) ||
            (an[1] - bn[1]) ||
            an[2].localeCompare(bn[2]);
        if (nn) return nn;
    }

    return ax.length - bx.length;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


function getSheetSize(sheet) {
    switch (sheet) {
        case "a0":
            return { width: 841, height: 1189 };

        case "a1":
            return { width: 594, height: 841 };

        case "a2":
            return { width: 420, height: 594 };

        case "a3":
            return { width: 297, height: 420 };

        case "a4":
            return { width: 210, height: 297 };

        case "a5":
            return { width: 148, height: 210 };

        case "a6":
            return { width: 105, height: 148 };

        case "a7":
            return { width: 74, height: 105 };

        case "a8":
            return { width: 52, height: 74 };

        case "a9":
            return { width: 37, height: 52 };

        case "a10":
            return { width: 26, height: 37 };
    }
}