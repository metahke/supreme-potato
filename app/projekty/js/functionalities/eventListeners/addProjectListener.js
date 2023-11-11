import {elements} from "../../elements.js";
import {validateProjectInputData} from "../addProject/validateProjectInputData.js";
import {createProjectEntryInAppData} from "../addProject/createProjectEntryInAppData.js";

export const addProjectListener = () => {

    elements.addProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let value = new FormData(elements.addProjectForm).get("value");

        if (validateProjectInputData(value)) {

            createProjectEntryInAppData(value);
            elements.addProjectForm.reset();
        }
    });
}