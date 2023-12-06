import {ELEMENTS} from "../../elements/ELEMENTS.js";
import {getCurrentProjectID, getProjectData} from "../../data/appData.js";
import {addProjectTaskElement} from "./task/addProjectTaskElement.js";
import {createProjectJournalElement} from "./journal/createProjectJournalElement.js";
import {createProjectTaskElement} from "./task/createProjectTaskElement.js";
import {addProjectJournalElement} from "./journal/addProjectJournalElement.js";

export const listProjectInfoInDialog = (e) => {

    const projectId = getCurrentProjectID();

    const projectTitle = e.target.querySelector(".project-title").textContent;

    ELEMENTS.projectDialog.querySelector(".project-title").textContent = projectTitle;

    const projectData = getProjectData(projectId);

    const {tasks, journals} = projectData;

    for (const task in tasks) {

        const taskData = tasks[task];
        const taskElement = createProjectTaskElement(taskData);
        addProjectTaskElement(taskElement);
    }
    for (const journal in journals) {

        const journalData = journals[journal];
        const journalElement = createProjectJournalElement(journalData);
        addProjectJournalElement(journalElement);
    }
}