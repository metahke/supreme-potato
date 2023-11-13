import {appData} from "../../index.js";
import {saveDataToLocalStorage} from "../localStorage/saveDataToLocalStorage.js";
import {elements} from "../../elements.js";
import {addProjectJournalElement} from "./addProjectJournalElement.js";

export const createProjectJournalEntryInAppData = (value) => {

    const projectID = elements.taskDialog.dataset.projectId;

    const maxJournalID = appData.projects[projectID].maxJournalID++;

    const userDate = new Date();
    const date = userDate.toLocaleDateString().replaceAll(".", "-");
    const time = userDate.toLocaleTimeString();


    appData.projects[projectID].journals[maxJournalID] = {
        name: value,
        date: `${date} ${time}`
    }

    saveDataToLocalStorage();

    addProjectJournalElement(maxJournalID);
}