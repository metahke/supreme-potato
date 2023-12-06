import {ELEMENTS} from "../../elements/ELEMENTS.js";
import {valueNotEmpty} from "../other/valueNotEmpty.js";
import {getCurrentProjectID, getMaxProjectJournalID, getMaxProjectTaskID} from "../../data/appData.js";
import {initializeProjectTaskBuild} from "../project/task/initializeProjectTaskBuild.js";

export const handleAddProjectTaskFormSubmit = () => {

    ELEMENTS.addProjectTaskForm.addEventListener("submit", (e) => {

        e.preventDefault();

        let inputValue = new FormData(ELEMENTS.addProjectTaskForm).get("value");

        if (valueNotEmpty(inputValue)) {

            const projectID = getCurrentProjectID();

            const projectTaskID = getMaxProjectTaskID(projectID);

            initializeProjectTaskBuild(projectID, projectTaskID, inputValue);

            ELEMENTS.addProjectTaskForm.reset();
        }
    });
}