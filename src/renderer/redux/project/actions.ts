import { FileRef } from "../../../common/FileRef";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";

export enum ProjectActionType {
  ADD_FILE_REF = "project/ADD_FILE_REF",
  ADD_FRAME_TRACK_ITEM = "project/ADD_FRAME_TRACK_ITEM",
  ADD_PROJECT = "project/ADD_PROJECT",
  ADD_TAKE = "project/ADD_TAKE",
  INCREMENT_EXPORTED_FRAME_NUMBER = "project/INCREMENT_EXPORTED_FRAME_NUMBER",
  SET_PLAYBACK_SPEED = "project/SET_PLAYBACK_SPEED",
}

export type ProjectActions =
  | AddFileRefAction
  | AddFrameTrackAction
  | AddTakeAction
  | IncrementExportedFrameNumber
  | SetPlaybackSpeed;

interface AddFileRefAction {
  type: ProjectActionType.ADD_FILE_REF;
  payload: {
    fileRef: FileRef;
  };
}
interface AddFrameTrackAction {
  type: ProjectActionType.ADD_FRAME_TRACK_ITEM;
  payload: {
    trackItem: TrackItem;
  };
}
interface AddTakeAction {
  type: ProjectActionType.ADD_TAKE;
  payload: {
    take: Take;
  };
}
interface IncrementExportedFrameNumber {
  type: ProjectActionType.INCREMENT_EXPORTED_FRAME_NUMBER;
}

interface SetPlaybackSpeed {
  type: ProjectActionType.SET_PLAYBACK_SPEED;
  payload: {
    playbackSpeed: number;
  };
}

export const addFileRef = (fileRef: FileRef) => ({
  type: ProjectActionType.ADD_FILE_REF,
  payload: { fileRef },
});

export const addTake = (take: Take) => ({
  type: ProjectActionType.ADD_TAKE,
  payload: {
    take,
  },
});

export const addFrameTrackItem = (trackItem: TrackItem) => ({
  type: ProjectActionType.ADD_FRAME_TRACK_ITEM,
  payload: {
    trackItem,
  },
});

export const incrementExportedFrameNumber = () => ({
  type: ProjectActionType.INCREMENT_EXPORTED_FRAME_NUMBER,
});

export const setPlaybackSpeed = (playbackSpeed: number) => ({
  type: ProjectActionType.SET_PLAYBACK_SPEED,
  payload: {
    playbackSpeed,
  },
});
