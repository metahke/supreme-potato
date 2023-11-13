import {elements} from "../../elements.js";
import {appData} from "../../index.js";
import {addProjectTaskElement} from "../addProjectTask/addProjectTaskElement.js";
import {addProjectJournalElement} from "../addProjectJournal/addProjectJournalElement.js";

export const openAndListProjectInfoListener = () => {

    elements.projectsContainer.addEventListener("click", (e) => {

        if (e.target.classList.contains("project")) {

            elements.tasksContainer.innerHTML = null;

            const projectId = e.target.dataset.projectId;

            elements.taskDialog.dataset.projectId = projectId;
            elements.taskDialog.setAttribute("open", "true");

            elements.taskDialog.querySelector(".project-title").textContent = appData.projects[projectId].name;

            const { tasks, journals } = appData.projects[projectId];

            for (const task in tasks) addProjectTaskElement(task)
            for (const journal in journals) addProjectJournalElement(journal)
        }
    });
}