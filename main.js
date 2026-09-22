require('dotenv').config();
const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const mysql = require('mysql2/promise');
let pool;

async function initDatabase() {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
  });
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('src/index.html')
  win.webContents.openDevTools();
}

app.whenReady().then(async () => {
  await initDatabase()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('get-blind-tests', async () => {
  const [rows] = await pool.query('SELECT * FROM blind_tests');
  return rows;
});

ipcMain.handle('add-blind-test', async (event, title, d_day) => {
  const [result] = await pool.query(
    'INSERT INTO blind_tests (title, d_day) VALUES (?, ?)',
    [title, d_day]
  );
  return result.insertId;
});


