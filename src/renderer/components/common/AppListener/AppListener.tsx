import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import {
  fetchAndSetDeviceList,
  loadSavedPreferences,
  onRouteChange,
} from "../../../redux/thunks";
import { RootState } from "../../../redux/store";
import { handleOnCloseButtonClick } from "../../../services/appListener/AppListenerService";
import { onDeviceChange } from "../../../services/imagingDevice/ImagingDevice";
import * as rLogger from "../../../services/rLogger/rLogger";

const AppListeners = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userPreferences = useSelector(
    (state: RootState) => state.app.userPreferences
  );

  useEffect(() => {
    // Load saved preferences
    dispatch(loadSavedPreferences() as any);

    // Get the available cameras
    dispatch(fetchAndSetDeviceList() as any);
    onDeviceChange(() => {
      dispatch(fetchAndSetDeviceList() as any);
    });
  }, []);

  // Handle pressing the close button
  useEffect(() => {
    return window.preload.ipcToRenderer.onCloseButtonClick(() =>
      handleOnCloseButtonClick(userPreferences)
    );
  }, [userPreferences]);

  // Log when changing route
  useEffect(() => {
    rLogger.info("appListener.routeChange", location.pathname);
    dispatch(onRouteChange(location.pathname as PageRoute) as any);
  }, [location]);

  return <></>;
};

export default AppListeners;
