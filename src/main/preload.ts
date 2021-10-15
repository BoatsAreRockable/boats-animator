import { contextBridge, ipcRenderer, shell } from "electron";
import { APP_WINDOW_CHANGE_PAGE } from "../common/IpcChannelNames";
import { PreloadApi } from "../common/PreloadApi";

// This file controls access to the Electron and Node methods required by the renderer process
// https://www.electronjs.org/docs/tutorial/context-isolation
const api: PreloadApi = {
  platform: process.platform,
  appVersion: process.env.npm_package_version || "?",
  ipc: {
    [APP_WINDOW_CHANGE_PAGE]: (pathname: string) =>
      ipcRenderer.invoke(APP_WINDOW_CHANGE_PAGE, pathname),
  },
  openExternal: {
    discord: () => shell.openExternal("http://discord.boatsanimator.com"),
    website: () =>
      shell.openExternal("https://www.charlielee.uk/boats-animator"),
  },
};

contextBridge.exposeInMainWorld("preload", api);
