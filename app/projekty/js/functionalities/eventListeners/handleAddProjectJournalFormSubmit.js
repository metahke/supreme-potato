import {ELEMENTS} from "../../elements/ELEMENTS.js";
import {valueNotEmpty} from "../other/valueNotEmpty.js";
import {initializeProjectJournalBuild} from "../project/journal/initializeProjectJournalBuild.js";
import {getCurrentProjectID, getMaxProjectJournalID} from "../../data/appData.js";

export const handleAddProjectJournalFormSubmit = () => {

    ELEMENTS.addProjectJournalForm.addEventListener("submit", (e) => {

        e.preventDefault();

        let inputValue = new FormData(ELEMENTS.addProjectJournalForm).get("value");

        if (valueNotEmpty(inputValue)) {

            const projectID = getCurrentProjectID();

            const projectJournalID = getMaxProjectJournalID(projectID);

            initializeProjectJournalBuild(projectID, projectJournalID, inputValue);

            ELEMENTS.addProjectJournalForm.reset();
        }
    });
}