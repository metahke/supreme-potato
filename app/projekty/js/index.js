import {addEventListeners} from "./functionalities/other/addEventListeners.js";
import {createProjectElement} from "./functionalities/project/createProjectElement.js";
import {addProjectElement} from "./functionalities/project/addProjectElement.js";
import {getProjectsData, loadAppDataFromLocalStorage} from "./data/appData.js";

function initializeFunctionalities() {

    loadAppDataFromLocalStorage();

    const projects = getProjectsData();

    Object.keys(projects).forEach(projectID => {

        const projectContent = projects[projectID].name;
        const element = createProjectElement(projectID, projectContent);
        addProjectElement(element);
    });

    addEventListeners();
}

initializeFunctionalities();

