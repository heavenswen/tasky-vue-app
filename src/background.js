import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import { app, BrowserWindow, ipcMain, Tray, Menu, screen } from 'electron';

const path = require('path');
// eslint-disable-next-line
 const iconPath = path.join(__static, 'icon.png');

let mainWindow;
let tray;
let remindWindow;

app.on('ready', async () => {
    // 初始化一个应用
    mainWindow = new BrowserWindow({
        // frame: false, // 创建无边框窗口,将看不到默认窗口按钮
        // 控制是否允许用户改变窗口
        // resizable: false, 
        width: 800,
        height: 600,
        icon: iconPath, // 应用运行时的标题栏图标
        webPreferences: {
            backgroundThrottling: false, // 设置应用在后台正常运行
            nodeIntegration: true, // 设置能在页面使用nodejs的API
            contextIsolation: false
        }
    });
    if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
        await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/main.html');
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        mainWindow.loadURL(`file://${__dirname}/main.html`);
    }
    /**
     * 删除默认的菜单
     */
    // mainWindow.removeMenu();
    setTray();
    // 打开控制台
    mainWindow.webContents.openDevTools();
});

app.on('activate', () => {
    // eslint-disable-next-line
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on('mainWindow:close', () => {
    mainWindow.hide();
});
/**
 * 监听渲染进程
 * 关闭渲染窗口
 */
ipcMain.on('remindWindow:close', () => {
    remindWindow.close();
});

/**
 * 监听渲染进程
 * 创建弹窗，后端激活的弹窗
 */
ipcMain.on('setTaskTimer', (event, time, task) => {
    const now = new Date();
    const date = new Date();
    date.setHours(time.slice(0, 2), time.slice(3), 0);
    const timeout = date.getTime() - now.getTime();
    setTimeout(() => {
        createRemindWindow(task);
    }, timeout);
});

/**
 * 实现点击图标的显示隐藏切换
 */
function setTray () {
    tray = new Tray(iconPath);
    // 设置此托盘图标的悬停文本
    tray.setToolTip('Tasky ！！');
    tray.on('click', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
        }
    });
    tray.on('right-click', () => {
        // 定制自定义菜单
        const menuConfig = Menu.buildFromTemplate([
            {
                label: 'Quit',
                submenu: [{
                    label: 'quit',
                    accelerator: 'CmdOrCtrl+Q', // 快捷键
                    click: () => app.quit()
                }]
            }
        ]);
        tray.popUpContextMenu(menuConfig);
    });
}
/**
 * 创建一个提醒窗口
 * @param {*} task 
 */
function createRemindWindow (task) {
    if (remindWindow) remindWindow.close();
    remindWindow = new BrowserWindow({
        height: 450,
        width: 360,
        resizable: false,
        frame: false,
        icon: iconPath,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
            // webSecurity:false // 同源策略
        },
        webContents: {
            openDevtools: true
        }
    });
    remindWindow.removeMenu();

    const size = screen.getPrimaryDisplay().workAreaSize;
    const { y } = tray.getBounds();
    const { height, width } = remindWindow.getBounds();
    const yPosition = process.platform === 'darwin' ? y : y - height;
    remindWindow.setBounds({
        x: size.width - width,
        y: yPosition,
        height,
        width
    });

    remindWindow.setAlwaysOnTop(true);

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        remindWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/remind.html');
    } else {
        createProtocol('app');
        /**
         * 加载本地
         */
        remindWindow.loadURL(`file://${__dirname}/remind.html`);
    }

    remindWindow.webContents.on('did-finish-load', () => {
        remindWindow.webContents.send('setTask', task);
    });

    remindWindow.show();
    remindWindow.on('closed', () => { remindWindow = null; });
    setTimeout(() => {
        remindWindow && remindWindow.close();
    }, 50 * 1000);
}
