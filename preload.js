const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
})

contextBridge.exposeInMainWorld('api', {
  getBlindTests: () => ipcRenderer.invoke('get-blind-tests'),
  addBlindTest: (title, d_day) => ipcRenderer.invoke('add-blind-test', title, d_day),
  getBlindTest: (id) => ipcRenderer.invoke('get-blind-test', id),
  getCategories: () => ipcRenderer.invoke('get-categories'),
  getRound: (id) => ipcRenderer.invoke('get-round'),
  addRound: (order, answer, points, category_id, test_id) => ipcRenderer.invoke('add-round', order, answer, points, category_id, test_id)
});