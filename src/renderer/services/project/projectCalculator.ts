import { FileRefType } from "../../../common/FileRef";
import { FrameCount, TimelineIndex } from "../../../common/Flavors";
import { Track } from "../../../common/project/Track";
import { TrackItem } from "../../../common/project/TrackItem";

export const getTrackItemsLength = (trackItems: TrackItem[]): FrameCount =>
  trackItems.reduce((prev, trackItem) => prev + trackItem.length, 0);

export const getTrackLength = (track: Track): FrameCount => getTrackItemsLength(track.trackItems);

export const getTrackItemStartPosition = (track: Track, trackItemIndex: number): TimelineIndex =>
  getTrackItemsLength(track.trackItems.slice(0, trackItemIndex)) as TimelineIndex;

export const getTrackItemEndPosition = (track: Track, trackItemIndex: number): TimelineIndex =>
  getTrackItemsLength(track.trackItems.slice(0, trackItemIndex + 1)) as TimelineIndex;

export const getHighlightedTrackItem = (
  track: Track,
  timelineIndex: TimelineIndex | undefined
): TrackItem | undefined =>
  timelineIndex === undefined
    ? undefined
    : track.trackItems.find(
        (_trackItem, index) => getTrackItemStartPosition(track, index) >= timelineIndex
      );

export const getTrackItemTitle = (track: Track, trackItemIndex: number) =>
  track.fileType === FileRefType.FRAME
    ? `Frame ${getTrackItemStartPosition(track, trackItemIndex) + 1}`
    : track.trackItems[trackItemIndex].filePath;
