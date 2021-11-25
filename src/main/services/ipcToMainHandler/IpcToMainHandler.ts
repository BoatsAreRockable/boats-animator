import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import IpcChannel from "../../../common/ipc/IpcChannel";
import Ipc from "../../../common/ipc/IpcHandler";
import { UserPreferences } from "../../../common/UserPreferences";
import { WindowSize } from "../../../common/WindowSize";
import { getWindowSize } from "../../windowUtils";
import AppWindow from "../appWindow/AppWindow";
import SettingsFileStore from "../fileStore/SettingsFileStore";

class IpcToMainHandler {
  constructor(private settingsFileStore: SettingsFileStore) {}

  appVersion = async (e: IpcMainInvokeEvent): Ipc.AppVersion.Response =>
    app.getVersion();

  getUserPreferences = async (
    e: IpcMainInvokeEvent
  ): Ipc.GetUserPreferences.Response =>
    this.settingsFileStore.get().userPreferences;

  saveSettingsAndClose = async (
    e: IpcMainInvokeEvent,
    win: BrowserWindow,
    ...args: Ipc.SaveSettingsAndClose.Args
  ): Ipc.SaveSettingsAndClose.Response => {
    const [userPreferences] = args;

    this.settingsFileStore.save({
      appWindowSize: getWindowSize(win),
      userPreferences,
    });
    win.destroy();
  };

  openConfirmPrompt = (
    e: IpcMainInvokeEvent,
    win: BrowserWindow,
    args: Ipc.OpenConfirmPrompt.Args
  ): Ipc.OpenConfirmPrompt.Response => win.openConfirmPrompt(message);

  openDirDialog = (
    e: IpcMainInvokeEvent,
    win: BrowserWindow,
    args: Ipc.OpenDirDialog.Args
  ): Ipc.OpenDirDialog.Response => win.openDirDialog(currentDir, title);

  static handleIfWindow = (
    channel: IpcChannel,
    listener: (
      event: IpcMainInvokeEvent,
      win: BrowserWindow,
      ...args: any[]
    ) => any
  ) => {
    ipcMain.handle(channel, (event: IpcMainInvokeEvent, ...args: any[]) => {
      const win = BrowserWindow.fromWebContents(event.sender);
      return win ? listener(event, win, ...args) : undefined;
    });
  };
}

export const addIpcToMainHandlers = (settingsFileStore: SettingsFileStore) => {
  const ipcHandler = new IpcToMainHandler(settingsFileStore);

  ipcMain.handle(IpcChannel.APP_VERSION, ipcHandler.appVersion);

  ipcMain.handle(
    IpcChannel.GET_USER_PREFERENCES,
    ipcHandler.getUserPreferences
  );

  IpcToMainHandler.handleIfWindow(
    IpcChannel.SAVE_SETTINGS_AND_CLOSE,
    ipcHandler.saveSettingsAndClose
  );

  IpcToMainHandler.handleIfWindow(
    IpcChannel.OPEN_CONFIRM_PROMPT,
    ipcHandler.openConfirmPrompt
  );

  IpcToMainHandler.handleIfWindow(
    IpcChannel.OPEN_DIR_DIALOG,
    ipcHandler.openDirDialog
  );
};
