// Electron entry point — opens index.html inside a desktop window
// and checks for updates from GitHub Releases on launch.
const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: 'Pancake Bunny Clicker',
    autoHideMenuBar: true,
    backgroundColor: '#0e0a1a',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  Menu.setApplicationMenu(null);
  mainWindow.loadFile('index.html');
}

// ===== AUTO-UPDATE =====
// Checks GitHub Releases for a newer version, downloads it in the background,
// and prompts the user to restart when ready. No user action needed.
function setupAutoUpdate() {
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('update-available', (info) => {
    console.log('Update available:', info.version);
  });

  autoUpdater.on('update-not-available', () => {
    console.log('Already on latest version.');
  });

  autoUpdater.on('download-progress', (p) => {
    if (mainWindow) {
      // Show download progress in the taskbar
      mainWindow.setProgressBar(p.percent / 100);
    }
  });

  autoUpdater.on('update-downloaded', (info) => {
    if (mainWindow) mainWindow.setProgressBar(-1);
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Update ready',
      message: `Pancake Bunny Clicker v${info.version} is downloaded. Restart now to install?`,
      buttons: ['Restart now', 'Later'],
      defaultId: 0,
      cancelId: 1,
    }).then((res) => {
      if (res.response === 0) autoUpdater.quitAndInstall();
    });
  });

  autoUpdater.on('error', (err) => {
    console.warn('Updater error (non-fatal):', err && err.message);
  });

  // Check on launch and every 30 minutes thereafter
  autoUpdater.checkForUpdatesAndNotify().catch(() => {});
  setInterval(() => {
    autoUpdater.checkForUpdatesAndNotify().catch(() => {});
  }, 30 * 60 * 1000);
}

app.whenReady().then(() => {
  createWindow();
  // Only check for updates in production builds; skip in `npm start` dev mode
  if (app.isPackaged) setupAutoUpdate();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
