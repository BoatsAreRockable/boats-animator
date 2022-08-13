import { createContext } from "react";
import { TimelineIndex } from "../../../common/Flavors";

export interface PlaybackContextProps {
  startOrPausePlayback: () => void;
  stopPlayback: (i?: TimelineIndex | undefined, pause?: boolean) => void;
  displayFirstFrame: () => void;
  displayPreviousFrame: () => void;
  displayNextFrame: () => void;
  displayLastFrame: () => void;
  timelineIndex: TimelineIndex | undefined;
  liveViewVisible: boolean;
  playing: boolean;
}

const defaultValue: PlaybackContextProps = {
  startOrPausePlayback: () => undefined,
  stopPlayback: () => undefined,
  displayFirstFrame: () => undefined,
  displayPreviousFrame: () => undefined,
  displayNextFrame: () => undefined,
  displayLastFrame: () => undefined,
  timelineIndex: undefined,
  liveViewVisible: true,
  playing: false,
};

const PlaybackContext = createContext<PlaybackContextProps>(defaultValue);

export default PlaybackContext;
