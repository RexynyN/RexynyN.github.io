let plotta = "";

let xValues = [];
let yValues = [];

function createGraph(exp) {
    var graph = document.getElementById("graph");
    var canvas = document.createElement("canvas");
    console.log(screen.availWidth);
    canvas.width = screen.availWidth - 300;
    canvas.height = screen.availWidth - 300;
    graph.appendChild(canvas);

    plotta = new Plotta(canvas, {
        linedatas: [{
            id: 'Seno',
            type: 'func',
            legend: 'cos',
            color: '#55A8DE',
            visible: true,
            func: exp,
            dotNum: 1000
        }],
        config: {
            font: '',
            legendVisible: true,
            title: {
                location: 'center',
                color: '#000000',
                text: 'Bumbum :3'
            },
            grid: {
                type: '',
                visible: true,
                color: '#000000'
            },
            border: {
                type: '',
                visible: true,
                color: '#000000',
                width: 1
            },
            tics: {
                visible: true,
                color: '#000000',
                value: {
                    x: 1,
                    y: 1
                }
            },
            axis: {
                x: {
                    visible: true,
                    label: 'X',
                    color: '#000000',
                    location: 'center',
                    range: {
                        start: -10,
                        end: 10
                    }
                },
                y: {
                    visible: true,
                    label: 'Y',
                    color: '#000000',
                    location: 'center',
                    range: {
                        start: -10,
                        end: 10
                    }
                }
            },
            table: {
                visible: true
            }
        }
    });
}



function addFunction() {
    try {
        let form = document.getElementById("formula").value;
        var exp = x => eval(form);
        if (plotta == "") {
            createGraph(exp);
        } else {
            plotta.AddLine({
                id: form,
                type: 'func',
                legend: form,
                color: '#55A8DE',
                visible: true,
                func: exp,
                dotNum: 1000
            });
        }
    } catch (e) {
        alert("Expressão Inválida");
    }
}


//Natural log
function log(x) {
    return Math.log(x)
}

//Log of base 10
function log10(x) {
    return Math.log10(x);
}

//Log of base 2
function log2(x) {
    return Math.log2(x);
}

//Power of x
function pow(x, potencia) {
    return Math.pow(x, potencia);
}

//Cubic Root
function cbrt(x) {
    return Math.cbrt(x);
}

//Square Root
function sqrt(x) {
    return Math.sqrt(x);
}

//Absolute Value
function abs(x) {
    return Math.abs(x);
}