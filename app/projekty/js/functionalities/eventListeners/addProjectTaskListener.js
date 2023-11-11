import {elements} from "../../elements.js";
import {validateProjectTaskInputData} from "../addProjectTask/validateProjectTaskInputData.js";
import {createProjectTaskEntryInAppData} from "../addProjectTask/createProjectTaskEntryInAppData.js";

export const addProjectTaskListener = () => {

    elements.addProjectTaskForm.addEventListener("submit", (e) => {

        e.preventDefault();

        let value = new FormData(elements.addProjectTaskForm).get("value");

        if (validateProjectTaskInputData(value)) {

            createProjectTaskEntryInAppData(value);
            elements.addProjectTaskForm.reset();
        }
    });
}