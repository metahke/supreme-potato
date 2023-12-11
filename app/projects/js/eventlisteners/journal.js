import {ELEMENTS} from "../elements/elements.js";
import {
    deleteProjectJournal,
    getCurrentProjectID,
    getMaxProjectJournalID,
    saveProjectJournalData
} from "../data/appData.js";
import {
    createProjectJournalEntry,
    refreshJournalsList
} from "../features/journal.js";

import {valueNotEmpty} from "../helpers/helpers.js";

export const handleProjectJournalClick = () => {

    ELEMENTS.journalsContainer.addEventListener("click", (e) => {

        if (e.target.classList.contains("journal-delete")) {

            const projectID = getCurrentProjectID();
            const journalID = e.target.closest(".journal").dataset.journalId;

            deleteProjectJournal(projectID, journalID);
            refreshJournalsList();
        }
    });
}
export const handleAddProjectJournalFormSubmit = () => {

    ELEMENTS.addProjectJournalForm.addEventListener("submit", (e) => {

        e.preventDefault();

        let journalName = new FormData(ELEMENTS.addProjectJournalForm).get("journal-name");

        if (valueNotEmpty(journalName)) {

            const projectID = getCurrentProjectID();
            const journalID = getMaxProjectJournalID(projectID);

            const journalData = createProjectJournalEntry(journalName);
            saveProjectJournalData(projectID, journalID, journalData);

            refreshJournalsList();
            ELEMENTS.addProjectJournalForm.reset();
        }
    });
}