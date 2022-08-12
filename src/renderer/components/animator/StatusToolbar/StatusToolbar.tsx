import { PageRoute } from "../../../../common/PageRoute";
import { getTrackLength, Take } from "../../../../common/Project";
import { zeroPad } from "../../../../common/utils";
import Button from "../../common/Button/Button";
import { ButtonColor } from "../../common/Button/ButtonColor";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, {
  ToolbarItemAlign,
} from "../../common/ToolbarItem/ToolbarItem";

interface StatusToolbarProps {
  take: Take;
}

const StatusToolbar = ({ take }: StatusToolbarProps): JSX.Element => {
  const makeTakeTitle = (take: Take) =>
    `Shot ${zeroPad(take.shotNumber, 3)} Take ${zeroPad(take.takeNumber, 2)}`;

  return (
    <Toolbar>
      <ToolbarItem stretch align={ToolbarItemAlign.LEFT}>
        <Button
          title={makeTakeTitle(take)}
          onClick={PageRoute.STARTUP_MODAL}
          color={ButtonColor.TRANSPARENT}
        />
      </ToolbarItem>
      <ToolbarItem align={ToolbarItemAlign.CENTER}>
        Frame {getTrackLength(take.frameTrack) + 1} of{" "}
        {getTrackLength(take.frameTrack)}
      </ToolbarItem>
      <ToolbarItem stretch align={ToolbarItemAlign.RIGHT}>
        {take.frameRate} FPS
      </ToolbarItem>
    </Toolbar>
  );
};

export default StatusToolbar;
