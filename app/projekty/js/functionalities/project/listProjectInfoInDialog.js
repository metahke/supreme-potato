import {ELEMENTS} from "../../elements/ELEMENTS.js";
import {getCurrentProjectID, getProjectData} from "../../data/appData.js";
import {addProjectTaskElement} from "./task/addProjectTaskElement.js";
import {createProjectJournalElement} from "./journal/createProjectJournalElement.js";

export const listProjectInfoInDialog = (e) => {

    const projectId = getCurrentProjectID();

    const projectTitle = e.target.querySelector(".project-title").textContent;

    ELEMENTS.projectDialog.querySelector(".project-title").textContent = projectTitle;

    const projectData = getProjectData(projectId);

    const {tasks, journals} = projectData;

    for (const task in tasks)
        addProjectTaskElement(task)
    for (const journal in journals)
        createProjectJournalElement(journal)
}