import {ELEMENTS} from "../../elements/ELEMENTS.js";
import {addProjectTaskElement} from "../project/task/addProjectTaskElement.js";
import {createProjectJournalElement} from "../project/journal/createProjectJournalElement.js";
import {getCurrentProjectID, getProjectData, setCurrentProjectID} from "../../data/appData.js";
import {listProjectInfoInDialog} from "../project/listProjectInfoInDialog.js";
import {openDialog} from "../dialog/openDialog.js";

export const handleProjectElementClick = () => {

    ELEMENTS.projectsContainer.addEventListener("click", (e) => {

        if (e.target.classList.contains("project")) {

            const dialog = ELEMENTS.projectDialog;
            const projectID = e.target.dataset.projectId;

            setCurrentProjectID(projectID);
            openDialog(dialog);
            listProjectInfoInDialog(e);
        }
    });
}