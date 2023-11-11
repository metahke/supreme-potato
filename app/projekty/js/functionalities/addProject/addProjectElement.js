import {appData} from "../../index.js";
import {elements} from "../../elements.js";

export const addProjectElement = (id)  => {

    const element = document.createElement("article");
    element.classList.add("project", "flex", "between");

    const content = appData.projects[id].name;

    element.innerHTML = `
        <p>${content}</p>
        <!--<span class="drag-icon material-icons">
            drag_indicator
        </span>-->
    `

    elements.projectsContainer.append(element);
    element.dataset.projectId = id;
}