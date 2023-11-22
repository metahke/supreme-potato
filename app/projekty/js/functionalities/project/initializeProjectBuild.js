import {createProjectEntry} from "./createProjectEntry.js";
import {createProjectElement} from "./createProjectElement.js";
import {addProjectElement} from "./addProjectElement.js";
import {saveProjectData} from "../../data/appData.js";

export const initializeProjectBuild = (projectID, projectContent) => {

    const projectData = createProjectEntry(projectContent);
    saveProjectData(projectID, projectData);
x
    const element = createProjectElement(projectID, projectContent);
    addProjectElement(element);
}