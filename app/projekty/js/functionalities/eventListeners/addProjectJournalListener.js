import {elements} from "../../elements.js";
import {createProjectJournalEntryInAppData} from "../addProjectJournal/createProjectJournalEntryInAppData.js";
import {validateProjectJournalInputData} from "../addProjectJournal/validateProjectJournalInputData.js";

export const addProjectJournalListener = () => {

    elements.addProjectJournalForm.addEventListener("submit", (e) => {

        e.preventDefault();

        let value = new FormData(elements.addProjectJournalForm).get("value");

        if (validateProjectJournalInputData(value)) {

            createProjectJournalEntryInAppData(value);
            elements.addProjectJournalForm.reset();
        }
    });
}