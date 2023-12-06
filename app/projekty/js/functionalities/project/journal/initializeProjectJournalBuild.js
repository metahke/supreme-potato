import {createProjectJournalEntry} from "./createProjectJournalEntry.js";
import {createProjectJournalElement} from "./createProjectJournalElement.js";
import {addProjectJournalElement} from "./addProjectJournalElement.js";
import {saveProjectJournalData} from "../../../data/appData.js";

export const initializeProjectJournalBuild = (projectID, projectJournalID, journalContent) => {

    const journalData = createProjectJournalEntry(journalContent);

    saveProjectJournalData(projectID, projectJournalID, journalData);

    const element = createProjectJournalElement(journalData);
    addProjectJournalElement(element);
}