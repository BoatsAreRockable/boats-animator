import {
  findRelativeTimelineIndex,
  findShortPlayStartFrame,
  isLiveView,
} from "./timelineIndexCalculator";
import { PlaybackAction, PlaybackActionType, PlaybackState } from "./types";

export const playbackReducer = (
  state: PlaybackState,
  action: PlaybackAction
): PlaybackState => {
  if (state.playForDuration > 0) {
    return actionsWithFrames(state, action);
  }

  return { ...state };
};

const actionsWithFrames = (
  state: PlaybackState,
  action: PlaybackAction
): PlaybackState => {
  const { type, payload } = action;

  switch (type) {
    case PlaybackActionType.DISPLAY_FRAME:
      return {
        ...state,
        playing: false,
        timelineIndex: findRelativeTimelineIndex(
          state.timelineIndex,
          payload.name,
          state.playForDuration
        ),
      };

    case PlaybackActionType.SET_TIMELINE_INDEX:
      return {
        ...state,
        timelineIndex: payload.timelineIndex,
      };

    case PlaybackActionType.START_OR_PAUSE_PLAYBACK:
      return {
        ...state,
        playing: !state.playing,
        timelineIndex: isLiveView(state.timelineIndex)
          ? 0
          : state.timelineIndex,
      };

    case PlaybackActionType.START_SHORT_PLAY:
      return {
        ...state,
        playing: true,
        timelineIndex: findShortPlayStartFrame(
          state.shortPlayLength,
          state.playForDuration
        ),
      };

    case PlaybackActionType.STOP_OR_REPEAT_PLAYBACK:
      return {
        ...state,
        playing: state.loopPlayback,
        timelineIndex: state.loopPlayback ? 0 : undefined,
      };

    case PlaybackActionType.STOP_PLAYBACK:
      return {
        ...state,
        playing: false,
        timelineIndex: undefined,
      };

    default:
      return { ...state };
  }
};
