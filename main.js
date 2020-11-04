const { app, BrowserWindow } = require('electron');

//Diseño de la interfaz (De que archivos va a tomer la interfaz)
function createWindow() {
    //Creamos la ventana y las caracteristicas
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    //se pone la ruta de donde se pondria la interfaz
    win.loadFile('index.html');

}

app.whenReady().then(createWindow);
//Cerrar todas los procesos en multiplataforma
app.on("window-all-closed", () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
//Crear una ventana si no hay ninguna creada
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});