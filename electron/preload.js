const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('pepoleAPI',{
  getPepole: () => ipcRenderer.invoke('event')
})