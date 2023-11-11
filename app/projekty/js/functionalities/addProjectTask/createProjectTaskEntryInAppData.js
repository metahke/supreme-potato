import {appData} from "../../index.js";
import {saveDataToLocalStorage} from "../localStorage/saveDataToLocalStorage.js";
import {addProjectTaskElement} from "./addProjectTaskElement.js";
import {elements} from "../../elements.js";

export const createProjectTaskEntryInAppData = (value) => {

    const projectID = elements.taskDialog.dataset.projectId;

    const maxTaskID = appData.projects[projectID].maxTaskID++;

    appData.projects[projectID].tasks[maxTaskID] = {
        /*state: "active",*/
        name: value,
    }

    saveDataToLocalStorage();

    addProjectTaskElement(maxTaskID);
}