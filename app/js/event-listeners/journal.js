import {ELEMENTS} from "../elements/elements.js";
import {
    deleteProjectJournal,
    getCurrentProjectID,
    getMaxProjectJournalID, getProjectJournalName,
    saveProjectJournalData
} from "../data/appData.js";
import {
    createProjectJournalEntry,
    renderJournals
} from "../features/journal.js";

import {openDialog, valueNotEmpty} from "../helpers/helpers.js";

export const handleProjectJournalClick = () => {

    ELEMENTS.journalsContainer.addEventListener("click", (e) => {

        if (e.target.classList.contains("journal-rename")) {

            const journalID = e.target.closest(".journal").dataset.journalId;

            ELEMENTS.itemName.value = getProjectJournalName(getCurrentProjectID(), journalID);
            ELEMENTS.renameDialog.dataset.itemType = "journal";
            ELEMENTS.renameDialog.dataset.journalId = journalID;

            return openDialog(ELEMENTS.renameDialog);
        }

        if (e.target.classList.contains("journal-delete")) {

            const projectID = getCurrentProjectID();
            const journalID = e.target.closest(".journal").dataset.journalId;

            deleteProjectJournal(projectID, journalID);
            renderJournals();
        }
    });
}

export const handleAddProjectJournalFormSubmit = () => {

    ELEMENTS.addProjectJournalForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const journalName = new FormData(ELEMENTS.addProjectJournalForm).get("journal-name");

        if (valueNotEmpty(journalName)) {

            const projectID = getCurrentProjectID();
            const journalID = getMaxProjectJournalID(projectID);

            const journalData = createProjectJournalEntry(journalName);
            saveProjectJournalData(projectID, journalID, journalData);

            renderJournals();
            ELEMENTS.addProjectJournalForm.reset();
        }
    });
}