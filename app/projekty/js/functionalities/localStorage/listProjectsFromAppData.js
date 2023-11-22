import {createProjectElement} from "../project/createProjectElement.js";
import {addProjectElement} from "../project/addProjectElement.js";

export const listProjectsFromAppData = (projects) => {

    Object.keys(projects).forEach(projectID => {

        const projectContent = projects[projectID].name;


        const element = createProjectElement(projectID, projectContent);

        addProjectElement(element);
    });
}