const {  app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const Person =  require("../models/Person");
const Area = require("../models/Area");
const Virus = require("../models/Virus");
const personUtils = require("../utils/personUtils");

let tlv = new Area(100);

let coronaAlpha = new Virus("Corona" , 0.5, 0.1, 5, {r: 120, g: 45, b: 78});
let coronaOmicron = new Virus("Corona" , 0.7, 0.2, 6, {r: 15, g: 45, b: 180});

const pepole = [];

let manyak = personUtils.createPerson(0, coronaAlpha);
manyak.jumpToArea(tlv);
pepole.push(manyak);

let manyak2 = personUtils.createPerson(0, coronaOmicron);
manyak2.jumpToArea(tlv);
pepole.push(manyak2);

for(let i = 0; i < 300; i++) {
    const person = personUtils.createPerson(i + 1);
    person.jumpToArea(tlv);
    pepole.push(person);
}


const createWindow = () => {
    
    ipcMain.handle('event', () => {
        let result = [];

        for(let k = 0; k < pepole.length; k++) {
            pepole[k].iteration();
            result.push({
                currentPosition: pepole[k].currentPosition,
                infection: pepole[k].infection 
            });
        }

        return result;
    })

    const win = new BrowserWindow({
        width: 1000,
        height: 1000,
        icon: path.join(__dirname, "icon.png"),
        webPreferences:{
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js")
        }
    })
    // win.webContents.openDevTools();
    win.loadFile('electron/index.html');

}

app.whenReady().then(createWindow);