//Array of "objImg" objects created in the handleFileSelect function, which store information about the image files
var urls = [];

//Suppor variable to handle the files
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

//Button which opens the cancels the operation
var btnCancel = document.getElementById("myBtnCancel");

//Span that closes the configuration modal
var span = document.getElementById("close");

//Span that closes the confirmation modal
var span2 = document.getElementById("close2");

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

//Ready banner element
var pronto = document.getElementById("pronto");

//Image Container
var container = document.getElementById('container');

// ****Event Listeners****

// Drag n' Drop Zone
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', setFilesDrag, false);

//File Input
document.getElementById('imgs').addEventListener('change', setFilesInput, false);

// ****Event Functions****

// When the user clicks on <span> (x), close the configuration modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks on <span> (x), close the confirmation modal
span2.onclick = function() {
    modal2.style.display = "none";
}

//Changes de Sheet Size information with the selected value
sizeSheet.onchange = function() {
    var sheet = getSheetSize(sizeSheet.value);
    document.getElementById("labelFormat").innerHTML = "Você selecionou o formato " + sizeSheet.value.toUpperCase();
    document.getElementById("labelWidth").innerHTML = "Largura do Formato: " + sheet.width + "mm";
    document.getElementById("labelHeight").innerHTML = "Altura do Formato: " + sheet.height + "mm";
}

//
check.onchange = function() {
    if (!check.checked) {
        divDim.style.display = "block";
    } else {
        divDim.style.display = "none";
    }
}

// When the user clicks anywhere outside of the modals, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }

    if (event.target == modal2) {
        modal2.style.display = "none"
    }
}

function fecharModal() {
    modal2.style.display = "none";
}

// When the user clicks the button, open the modal 
btn.onclick = function() {
    if (files == "") {
        alert("Nenhuma imagem encontrada!");
    } else {
        modal.style.display = "block";
    }
}

btnCancel.onclick = function() {
    urls = new Array;
    modal.style.display = "none";
    quanto.innerHTML = " ";
    dropS.style.display = "block";
    quantoS.style.display = "none";
    pronto.hidden = true;
    btn.hidden = true;
    btnCancel.hidden = true;
}

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
    quantoS.style.display = "block";
    //files = evt.target.files;

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
                    container.appendChild(pic);

                    var objImg = {
                        link: link,
                        file: theFile.name,
                        width: pic.width,
                        height: pic.height
                    }
                    urls.push(objImg);
                    //console.log(objImg.height + " x " + objImg.width + " " + objImg.file);
                    if (files.length > 1)
                        quanto.innerHTML = count + "/" + files.length + " Imagens carregadas";
                    else
                        quanto.innerHTML = "1/1 Imagem carregada";

                    count++;
                    if (count >= files.length) {
                        btn.hidden = false;
                        btnCancel.hidden = false;
                        pronto.hidden = false;
                    }
                };
            })(f);

            fr.readAsDataURL(f);
        }
    }
}



//Criador de PDF
function createPDF() {
    var orientation = document.getElementById("orientationPDF").value;
    var format = sizeSheet.value;
    var doc;
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

    console.log(marginL + " " + marginU + " " + widthM + " " + heightM + " ")

    getMeasure();

    if (document.getElementById("check1").checked) {
        urls.sort(naturalCompare);
    }

    for (var x = 0; x < urls.length; x++) {
        console.log(urls[x].file + "  " + urls[x].width + " x " + urls[x].height);
    }

    switch (orientation) {
        case "auto":
            if (all.checked) {
                if (urls[0].width > urls[0].height)
                    doc = new jsPDF("landscape", "mm", format);
                else
                    doc = new jsPDF("portrait", "mm", format);
            }

            for (var i = 0; i < urls.length; i++) {
                if (urls[i].link != null && urls[i].link != "" && urls[i].link != undefined) {
                    if (!all.checked) {
                        var dec;
                        if (urls[i].width > urls[i].height) {
                            dec = new jsPDF("landscape", "mm", format);
                            dec.addImage(urls[i].link, 'PNG', marginL, marginU, (heightM - (marginL * 2)), (widthM - (marginL * 2)));
                            dec.save(document.getElementById('namePDF').value + " - " + (i + 1) + '.pdf');
                        } else {
                            dec = new jsPDF("portrait", "mm", format);
                            dec.addImage(urls[i].link, 'PNG', marginL, marginU, (widthM - (marginL * 2)), (heightM - (marginL * 2)));
                            dec.save(document.getElementById('namePDF').value + " - " + (i + 1) + '.pdf');
                        }

                    } else {
                        if (urls[i].width > urls[i].height) {
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
                    var dec = new jsPDF(orientation, "mm", format);
                    dec.addImage(urls[i].link, 'PNG', marginL, marginU, (x - (marginL * 2)), (y - (marginL * 2)));
                    dec.save(document.getElementById('namePDF').value + " - " + (i + 1) + '.pdf')

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

    if (all.checked)
        doc.save(document.getElementById('namePDF').value + '.pdf');

    for (var t = 0; t < urls.length; t++) {
        document.getElementById(urls[t].file).remove();
    }
    urls = new Array;
    modal.style.display = "none";
    modal2.style.display = "block";
    quanto.innerHTML = " ";
    dropS.style.display = "block";
    quantoS.style.display = "none";
    pronto.hidden = true;
    btn.hidden = true;
    btnCancel.hidden = true;
}


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

function getMeasure() {
    for (var o = 0; o < urls.length; o++) {
        var pic = document.getElementById(urls[o].file);
        urls[o].width = pic.width;
        urls[o].height = pic.height;
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