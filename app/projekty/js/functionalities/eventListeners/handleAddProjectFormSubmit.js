import {ELEMENTS} from "../../elements/ELEMENTS.js";
import {valueNotEmpty} from "../other/valueNotEmpty.js";
import {initializeProjectBuild} from "../project/initializeProjectBuild.js";
import {getMaxProjectID} from "../../data/appData.js";

export const handleAddProjectFormSubmit = () => {

    ELEMENTS.addProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const value = new FormData(ELEMENTS.addProjectForm).get("value");

        if (valueNotEmpty(value)) {

            const id = getMaxProjectID();

            initializeProjectBuild(id, value);
            ELEMENTS.addProjectForm.reset();
        }
    });
}