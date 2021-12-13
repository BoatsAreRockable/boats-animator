import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { listDevices } from "../../services/imagingDevice/ImagingDevice";
import * as rLogger from "../../services/rLogger/rLogger";
import { changeDevice } from "../capture/middleware";
import { RootState } from "../store";
import {
  editUserPreferences,
  setCurrentDevice,
  setDeviceList,
} from "./actions";

export const fetchAndSetDeviceList = () => {
  return (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ) => {
    const { currentDevice } = getState().app;

    return (async () => {
      const connectedDevices = await listDevices();
      dispatch(setDeviceList(connectedDevices));

      const currentDeviceConnected =
        currentDevice &&
        connectedDevices.find(
          (device) => device.deviceId === currentDevice.deviceId
        );

      if (currentDevice && !currentDeviceConnected) {
        rLogger.info("thunks.fetchAndSetDeviceList.currentDeviceRemoved");
        dispatch(changeDevice());
      }
    })();
  };
};

export const setCurrentDeviceFromId = (deviceId?: string) => {
  return (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ) => {
    const { deviceList } = getState().app;
    const identifier = deviceList.find(
      (identifier) => identifier.deviceId === deviceId
    );

    dispatch(setCurrentDevice(identifier));

    return identifier;
  };
};

export const changeWorkingDirectory = (workingDirectory?: string) => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const newDirectory = await window.preload.ipcToMain.openDirDialog({
        workingDirectory,
        title: "Select a directory to save captured frames",
      });

      dispatch(
        editUserPreferences({
          workingDirectory: newDirectory,
        })
      );
    })();
  };
};

export const loadSavedPreferences = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const savedPreferences =
        await window.preload.ipcToMain.getUserPreferences();
      dispatch(editUserPreferences(savedPreferences));
    })();
  };
};
