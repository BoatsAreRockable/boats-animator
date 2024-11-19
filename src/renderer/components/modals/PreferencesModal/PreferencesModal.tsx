import { Stack } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { editUserPreferences } from "../../../redux/slices/appSlice";
import { RootState } from "../../../redux/store";
import IconName from "../../common/Icon/IconName";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import { UiButton } from "../../ui/UiButton/UiButton";
import { UiModal } from "../../ui/UiModal/UiModal";
import { UiModalFooter } from "../../ui/UiModalFooter/UiModalFooter";
import { UiNumberInput } from "../../ui/UiNumberInput/UiNumberInput";
import { UiSwitch } from "../../ui/UiSwitch/UiSwitch";

const PreferencesModal = (): JSX.Element => {
  const dispatch = useDispatch();
  const { take, userPreferences } = useSelector((state: RootState) => ({
    take: state.project.take,
    userPreferences: state.app.userPreferences,
  }));
  const appVersion = useSelector((state: RootState) => state.app.appVersion);

  return (
    <UiModal title="Preferences" onClose={take ? PageRoute.ANIMATOR : PageRoute.STARTUP}>
      <h3>Interface</h3>

      <Stack>
        <UiSwitch
          label="Play capture sound"
          checked={userPreferences.playCaptureSound}
          onChange={() =>
            dispatch(
              editUserPreferences({
                playCaptureSound: !userPreferences.playCaptureSound,
              })
            )
          }
        />

        <UiSwitch
          label="Initially show timestamp in seconds rather than frames"
          checked={userPreferences.showTimestampInSeconds}
          onChange={() =>
            dispatch(
              editUserPreferences({
                showTimestampInSeconds: !userPreferences.showTimestampInSeconds,
              })
            )
          }
        />
      </Stack>

      <h3>Playback</h3>

      <UiNumberInput
        label="Short play length"
        value={userPreferences.shortPlayLength}
        placeholder="6"
        min={1}
        max={99}
        onChange={(newValue) =>
          dispatch(
            editUserPreferences({
              shortPlayLength: newValue,
            })
          )
        }
      />

      <UiModalFooter>
        <UiButton icon={IconName.FOLDER} onClick={window.preload.ipcToMain.openUserDataDirectory}>
          Open user data folder
        </UiButton>

        <ToolbarItem align={ToolbarItemAlign.RIGHT}>Version {appVersion}</ToolbarItem>
      </UiModalFooter>
    </UiModal>
  );
};

export default PreferencesModal;
