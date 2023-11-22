import {createProjectJournalEntry} from "./createProjectJournalEntry.js";
import {createProjectJournalElement} from "./createProjectJournalElement.js";
import {addProjectJournalElement} from "./addProjectJournalElement.js";

export const initializeProjectJournalBuild = (projectID, journalContent) => {

    const journalData = createProjectJournalEntry(journalContent);
    //saveProjectJournalData(projectJournalID, journalData);

    const element = createProjectJournalElement(journalData);
    addProjectJournalElement(element);
}