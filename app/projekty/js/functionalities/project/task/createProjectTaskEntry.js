import {saveDataToLocalStorage} from "../../localStorage/saveDataToLocalStorage.js";
import {addProjectTaskElement} from "./addProjectTaskElement.js";

export const createProjectTaskEntry = (value) => {

    return {
        name: value,
    }

}