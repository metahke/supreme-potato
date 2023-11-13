import {elements} from "../../elements.js";
import {saveDataToLocalStorage} from "../localStorage/saveDataToLocalStorage.js";
import {appData} from "../../index.js";

export const addProjectTaskElement = (id) => {

    const projectID = elements.taskDialog.dataset.projectId;
    const content = appData.projects[projectID].tasks[id].name;


    const container = document.createElement("div");
    container.classList.add("flex", "subtask-container");

  /*  const input = document.createElement("input");
    input.setAttribute("type", "checkbox")
    input.classList.add("subtask-checkbox")*/

    const element = document.createElement("article");
    element.classList.add("subtask", "flex", "between");


    element.innerHTML = `
        <p class="task-content">${content}</p>
        <!--<span class="drag-icon material-icons">
            drag_indicator
        </span>-->
    `

    /*container.append(input);*/
    container.append(element);

    elements.tasksContainer.append(container);
}