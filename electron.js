const { app, Menu, MenuItem, BrowserWindow, ipcMain } = require('electron');
const { Configuration, OpenAIApi } = require("openai");
const { encode } = require('gpt-3-encoder');
const isDev = require('electron-is-dev');
const path = require('path');

const max_tokens = 8170;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      devTools: false,
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "./preload.js")
    },
    icon: path.join(__dirname, './icons/png/64x64.png')
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, './client/build/index.html')}`
  );

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', () => {
  createWindow(); 

  const menu = Menu.getApplicationMenu();
  const fileMenuItem = menu.items.find((item) => item.label === 'File');

  if (fileMenuItem) {
    fileMenuItem.submenu.append(
      new MenuItem({
        label: 'New Window',
        accelerator: 'CmdOrCtrl+N',
        click: () => {
          createWindow();
        },
      })
    );
  }

  Menu.setApplicationMenu(menu);
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.handle('quit', async () => {
  app.quit();
});


// -- OpenAI API
ipcMain.handle('createChatCompletion', async (event, arg) => {
  const { apiKey, model, temperature, top_p, n, messages } = arg.body;

  console.log(':::arg', arg);

  return new Promise(async resolve => {
    try {
      const response = await new OpenAIApi(new Configuration({ apiKey })).createChatCompletion({
        model, temperature, top_p, n, messages,
        max_tokens: max_tokens - encode(JSON.stringify(messages)).length
      });

      console.log(':::response', response);

      resolve({ data: response.data.choices[0].message.content });
    } catch (e) {
      console.log(':::error', e);

      resolve({ error: e });
    }
  });  
});