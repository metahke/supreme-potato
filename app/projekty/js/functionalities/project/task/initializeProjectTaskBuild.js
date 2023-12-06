import {createProjectTaskEntry} from "./createProjectTaskEntry.js";
import {createProjectTaskElement} from "./createProjectTaskElement.js";
import {addProjectTaskElement} from "./addProjectTaskElement.js";
import {saveProjectTaskData} from "../../../data/appData.js";

export const initializeProjectTaskBuild = (projectID, projectTaskID, inputValue) => {

    const taskData = createProjectTaskEntry(inputValue);
    saveProjectTaskData(projectID, projectTaskID, taskData);

    const element = createProjectTaskElement(taskData);
    addProjectTaskElement(element);
}