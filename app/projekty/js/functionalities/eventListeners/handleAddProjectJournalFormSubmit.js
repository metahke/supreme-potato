import {ELEMENTS} from "../../elements/ELEMENTS.js";
import {valueNotEmpty} from "../other/valueNotEmpty.js";
import {initializeProjectJournalBuild} from "../project/journal/initializeProjectJournalBuild.js";
import {getCurrentProjectID} from "../../data/appData.js";

export const handleAddProjectJournalFormSubmit = () => {

    ELEMENTS.addProjectJournalForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let inputValue = new FormData(ELEMENTS.addProjectJournalForm).get("value");

        if (valueNotEmpty(inputValue)) {

            const projectID = getCurrentProjectID();

            initializeProjectJournalBuild(projectID, inputValue);
            ELEMENTS.addProjectJournalForm.reset();
        }
    });
}