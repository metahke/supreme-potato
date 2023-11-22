import {createProjectTaskEntry} from "./createProjectTaskEntry.js";
import {createProjectTaskElement} from "./createProjectTaskElement.js";
import {addProjectTaskElement} from "./addProjectTaskElement.js";

export const initializeProjectTaskBuild = (projectID, inputValue) => {

    const taskData = createProjectTaskEntry(inputValue);
    //saveProjectTaskData(projectTaskID, taskData);

    const element = createProjectTaskElement(taskData);
    addProjectTaskElement(element);
}