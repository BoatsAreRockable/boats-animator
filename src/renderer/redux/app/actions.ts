import { AppMode } from "../../../common/AppMode";
import { ImagingDevice } from "../../services/imagingDevice/ImagingDevice";

export enum AppActionType {
  SET_APP_MODE = "app/SET_APP_MODE",
  SET_DEVICE_LIST = "app/SET_DEVICE_LIST",
  START_LOADING = "app/START_LOADING",
  STOP_LOADING = "app/STOP_LOADING",
}

interface SetAppModeAppAction {
  type: AppActionType.SET_APP_MODE;
  payload: { appMode: AppMode };
}

interface SetDeviceListAppAction {
  type: AppActionType.SET_DEVICE_LIST;
  payload: { deviceList: ImagingDevice[] };
}

interface StartLoadingAppAction {
  type: AppActionType.START_LOADING;
  payload: { message: string };
}

interface StopLoadingAppAction {
  type: AppActionType.STOP_LOADING;
}

export type AppAction =
  | SetAppModeAppAction
  | SetDeviceListAppAction
  | StartLoadingAppAction
  | StopLoadingAppAction;
