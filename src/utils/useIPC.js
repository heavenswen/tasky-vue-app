/*
 * @Author: qiuwt
 * @Email: 423822728@qq.com
 * @Date: 2022-06-10 16:28:44
 * @Description: 客户端控制，打通渲染程序和主程序
 * @Route: Route
 */

import { ref } from 'vue';
const electron = window.require('electron');
const { ipcRenderer } = electron;

export function closeMain () {
    ipcRenderer.send('mainWindow:close');
}

export function setTaskTimer (time, name) {
    ipcRenderer.send('setTaskTimer', time, encodeURIComponent(name));
}

export function closeRemind () {
    ipcRenderer.send('remindWindow:close');
}

export function setRemindMsg () {
    const remindMsg = ref('');
    ipcRenderer.on('setTask', (event, task) => {
        remindMsg.value = decodeURIComponent(task);
    });
    return remindMsg;
}

export function watchLog (cb) {
    ipcRenderer.on('log', (e, task) => {
        console.log('log:', decodeURIComponent(task))
        if (cb) cb(e, task)
    });
}
