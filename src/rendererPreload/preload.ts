import { contextBridge, ipcRenderer, shell } from "electron";
import IpcChannel from "../common/ipc/IpcChannel";
import Ipc from "../common/ipc/IpcHandler";
import { NewsResponsePost } from "../renderer/services/news/NewsResponse";
import { setListener } from "./ipcRendererUtils";

// This file controls access to the Electron and Node methods required by the renderer process
// https://www.electronjs.org/docs/tutorial/context-isolation
const api = {
  platform: process.platform,
  ipcToMain: {
    appVersion: (): Ipc.AppVersion.Response =>
      ipcRenderer.invoke(IpcChannel.APP_VERSION),

    checkCameraAccess: (): Ipc.CheckCameraAccess.Response =>
      ipcRenderer.invoke(IpcChannel.CHECK_CAMERA_ACCESS),

    getUserPreferences: (): Ipc.GetUserPreferences.Response =>
      ipcRenderer.invoke(IpcChannel.GET_USER_PREFERENCES),

    logRenderer: (payload: Ipc.LogRenderer.Payload): Ipc.LogRenderer.Response =>
      ipcRenderer.invoke(IpcChannel.LOG_RENDERER, payload),

    saveSettingsAndClose: (
      payload: Ipc.SaveSettingsAndClose.Payload
    ): Ipc.SaveSettingsAndClose.Response =>
      ipcRenderer.invoke(IpcChannel.SAVE_SETTINGS_AND_CLOSE, payload),

    openConfirmPrompt: (
      payload: Ipc.OpenConfirmPrompt.Payload
    ): Ipc.OpenConfirmPrompt.Response =>
      ipcRenderer.invoke(IpcChannel.OPEN_CONFIRM_PROMPT, payload),

    openDirDialog: (
      payload: Ipc.OpenDirDialog.Payload
    ): Ipc.OpenDirDialog.Response =>
      ipcRenderer.invoke(IpcChannel.OPEN_DIR_DIALOG, payload),
  },
  ipcToRenderer: {
    onCloseButtonClick: (
      callback: (payload: Ipc.OnCloseButtonClick.Payload) => void
    ) => setListener(IpcChannel.ON_CLOSE_BUTTON_CLICK, callback),
  },
  openExternal: {
    discord: () => shell.openExternal("http://discord.boatsanimator.com"),
    newsPost: (post: NewsResponsePost) => shell.openExternal(post.url),
    website: () =>
      shell.openExternal("https://www.charlielee.uk/boats-animator"),
  },
};

export type PreloadApi = typeof api;

contextBridge.exposeInMainWorld("preload", api);
