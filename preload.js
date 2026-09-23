const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
})

contextBridge.exposeInMainWorld('api', {
  getBlindTests: () => ipcRenderer.invoke('get-blind-tests'),
  addBlindTest: (title, d_day) => ipcRenderer.invoke('add-blind-test', title, d_day),
  getBlindTest: (id) => ipcRenderer.invoke('get-blind-test', id)
});