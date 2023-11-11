import {addProjectElement} from "../addProject/addProjectElement.js";
import {appData} from "../../index.js";


export const loadProjectsFromLocalStorage = () => {

    Object.keys(appData.projects).forEach(projectID => {

        addProjectElement(projectID)
    });
}