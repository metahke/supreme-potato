import {elements} from "../../elements.js";
import {appData} from "../../index.js";
import {addProjectTaskElement} from "../addProjectTask/addProjectTaskElement.js";

export const openAndListProjectInfoListener = () => {

    elements.projectsContainer.addEventListener("click", (e) => {

        if (e.target.classList.contains("project")) {

            elements.mainSubtasksContainer.innerHTML = null;

            const projectId = e.target.dataset.projectId;

            elements.taskDialog.dataset.projectId = projectId;
            elements.taskDialog.setAttribute("open", "true");

            elements.taskDialog.querySelector(".project-title").textContent = appData.projects[projectId].name;

            const tasks = appData.projects[projectId].tasks;

            for (const key in tasks) {

                addProjectTaskElement(key)
            }
        }
    });
}