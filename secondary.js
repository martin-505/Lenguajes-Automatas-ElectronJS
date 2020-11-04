const { BrowserWindow, dialog } = require('electron').remote;
const path = require('path');

//crear otra  ventana precionando un boton
const buttonWin = document.getElementById('nueva-ventana');

buttonWin.addEventListener("click", (event) => {
    const modalPath = path.join("file://", __dirname, '/windows/modal.html');

    let modal = new BrowserWindow({
        width: 400,
        height: 300
    });

    modal.on("close", () => { modal = null });
    modal.loadURL(modalPath);
    modal.show();
});

//cramos el boton para verificar el automata
const button = document.getElementById('verificar');
const automata = {
    estadoInicial: 1,
    estadoFinal: 2,
    transiciones: [{
            estado: 1,
            simbolo: 0,
            al_estado: 2
        },
        {
            estado: 2,
            simbolo: 0,
            al_estado: 2
        },
        {
            estado: 2,
            simbolo: 1,
            al_estado: 2
        }
    ]
};

button.addEventListener("click", (event) => {
    let cadena = document.getElementById('txtCadena').value;
    let estadoActual = automata.estadoInicial;
    let error = false;

    cadena.split('').forEach(simbolo => {
        console.log(simbolo);
        let encuentraTransicion = false;

        automata.transiciones.forEach(transicion => {
            if (transicion.estado == estadoActual && transicion.simbolo == simbolo) {
                estadoActual = transicion.al_estado;
                encuentraTransicion = true;
                return;
            }
        });

        if (!encuentraTransicion) {
            error = true;
            dialog.showErrorBox('Error', 'La cadena no es válida');
            return;
        }

    });

    if (!error && automata.estadoFinal == estadoActual) {

        let options = {
            buttons: ["Aceptar"],
            message: "Cadena correcta"
        }
        dialog.showMessageBox(options);
    }
});