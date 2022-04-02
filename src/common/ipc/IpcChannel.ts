const enum IpcChannel {
  APP_VERSION = "APP_VERSION",
  CHECK_CAMERA_ACCESS = "CHECK_CAMERA_ACCESS",
  GET_USER_PREFERENCES = "GET_USER_PREFERENCES",
  LOG_RENDERER = "LOG_RENDERER",
  ON_CLOSE_BUTTON_CLICK = "ON_CLOSE_BUTTON_CLICK",
  SAVE_SETTINGS_AND_CLOSE = "SAVE_SETTINGS_AND_CLOSE",
  OPEN_APP_DATA_DIRECTORY = "OPEN_APP_DATA_DIRECTORY",
  OPEN_CONFIRM_PROMPT = "OPEN_CONFIRM_PROMPT",
  OPEN_DIR_DIALOG = "OPEN_DIR_DIALOG",
  OPEN_EXPORT_VIDEO_FILE_PATH_DIALOG = "openExportVideoFilePathDialog",
  SAVE_DATA_TO_DISK = "SAVE_DATA_TO_DISK",
  EXPORT_VIDEO_START = "EXPORT_VIDEO_START",
  ON_EXPORT_VIDEO_DATA = "ON_EXPORT_VIDEO_DATA",
}

export default IpcChannel;
