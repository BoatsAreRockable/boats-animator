import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { Project } from "../../../common/project/Project";
import {
  addProjectDirectory,
  getWorkingDirectory,
} from "../../services/database/RecentDirectoryEntry";
import { makeProjectDirectoryName, makeTake } from "../../services/project/projectBuilder";
import { addProject, addTake, setProjectDirectoryId } from "../slices/projectSlice";
import { RootState } from "../store";

export const newProject = (project: Project) => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const workingDirectory = await getWorkingDirectory();
      if (workingDirectory === undefined) {
        throw "Unable to create a new project without a working directory selected";
      }

      const directoryName = makeProjectDirectoryName(project);
      const projectHandle = await workingDirectory.handle.getDirectoryHandle(directoryName);
      const projectDirectory = await addProjectDirectory(project.name, projectHandle);

      dispatch(addProject(project));
      dispatch(setProjectDirectoryId(projectDirectory.id));

      const take = makeTake({
        shotNumber: 1,
        takeNumber: 1,
        frameRate: 15,
      });
      dispatch(addTake(take));
    })();
  };
};
