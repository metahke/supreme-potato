import {ELEMENTS} from "../elements/elements.js";
import {getProjectsData} from "../data/appData.js";
import {addHTMLElement} from "../helpers/helpers.js";

export const createProjectEntry = (projectName) => {

    return {
        name: projectName,
        currentTaskID: null,
        maxTaskID: 0,
        maxJournalID: 0,
        tasks: {},
        journals: {}
    }
}

export const createProjectElement = (projectID, projectName) => {

    const projectElement = document.createElement("article");
    projectElement.classList.add("project", "flex", "between");

    projectElement.dataset.projectId = projectID;

    projectElement.innerHTML = `
        <p class="project-title">${projectName}</p>
        <details class="dropdown project-action">
            <summary>Akcja</summary>
            <ul>
                <li class="project-rename">Zmień nazwę</li>
                <li class="project-delete">Usuń</li>
            </ul>    
        </details>
    `;

    return projectElement;
}

export const renderProjects = () => {

    ELEMENTS.projectsContainer.innerHTML = null;

    const projectsData = getProjectsData();

    Object.keys(projectsData).forEach(projectID => {

        const projectName = projectsData[projectID].name;
        const projectElement = createProjectElement(projectID, projectName);

        addHTMLElement(ELEMENTS.projectsContainer, projectElement);
    });
}