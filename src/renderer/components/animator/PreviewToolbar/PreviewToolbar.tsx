import { Flex, Group } from "@mantine/core";
import { useContext } from "react";
import CaptureContext from "../../../context/CaptureContext/CaptureContext";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import IconName from "../../common/Icon/IconName";
import { UiActionIcon, UiActionIconRole } from "../../ui/UiActionIcon/UiActionIcon";
import { PreviewToolbarPlayback } from "./PreviewToolbarPlayback/PreviewToolbarPlayback";
import { PreviewToolbarPlaybackSettings } from "./PreviewToolbarPlaybackSettings/PreviewToolbarPlaybackSettings";
import { useDispatch, useSelector } from "react-redux";
import { setOverlayTab } from "../../../redux/slices/projectSlice";
import { RootState } from "../../../redux/store";

export const enum OverlayTab {
  PLAYBACK = "PLAYBACK",
  GRID = "GRID",
  ASPECT_RATIO = "ASPECT_RATIO",
  ONION_SKIN = "ONION_SKIN",
}

export const PreviewToolbar = (): JSX.Element => {
  const { captureImage } = useContext(CaptureContext);
  const { stopPlayback, liveViewVisible } = useContext(PlaybackContext);
  const overlayTab = useSelector((state: RootState) => state.project.overlayTab);
  const dispatch = useDispatch();

  const handleClickCaptureButton = () => {
    if (!liveViewVisible) {
      stopPlayback();
    }
    captureImage();
  };

  const handleSelectTab = (selectedTabName: OverlayTab) => {
    const newTabName = selectedTabName === overlayTab ? undefined : selectedTabName;
    dispatch(setOverlayTab(newTabName));
  };

  return (
    <Group align="flex-start">
      <Flex flex={1}>
        <UiActionIcon
          open={overlayTab === OverlayTab.PLAYBACK}
          icon={IconName.PLAYBACK_SETTINGS}
          onClick={() => handleSelectTab(OverlayTab.PLAYBACK)}
          role={UiActionIconRole.TOOLBAR_TAB}
        >
          Playback Settings
        </UiActionIcon>
        <UiActionIcon
          open={overlayTab === OverlayTab.GRID}
          icon={IconName.GRID}
          onClick={() => handleSelectTab(OverlayTab.GRID)}
          role={UiActionIconRole.TOOLBAR_TAB}
        >
          Grid Overlay
        </UiActionIcon>
        <UiActionIcon
          open={overlayTab === OverlayTab.ASPECT_RATIO}
          icon={IconName.ASPECT_RATIO}
          onClick={() => handleSelectTab(OverlayTab.ASPECT_RATIO)}
          role={UiActionIconRole.TOOLBAR_TAB}
        >
          Aspect Ratio Overlay
        </UiActionIcon>
        <UiActionIcon
          open={overlayTab === OverlayTab.ONION_SKIN}
          icon={IconName.ONION_SKIN}
          onClick={() => handleSelectTab(OverlayTab.ONION_SKIN)}
          role={UiActionIconRole.TOOLBAR_TAB}
        >
          Onion Skin
        </UiActionIcon>
      </Flex>
      <UiActionIcon
        icon={IconName.CAPTURE}
        onClick={handleClickCaptureButton}
        role={UiActionIconRole.CAPTURE}
      >
        Capture Frame
      </UiActionIcon>
      <Flex flex={1} justify="flex-end" py="sm" px="md">
        <PreviewToolbarPlayback />
      </Flex>
    </Group>
  );
};
