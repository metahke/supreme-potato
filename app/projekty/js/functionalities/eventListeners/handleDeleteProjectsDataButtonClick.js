import {ELEMENTS} from "../../elements/ELEMENTS.js";
import {clearProjectsData} from "../other/clearProjectsData.js";

export const handleDeleteProjectsDataButtonClick = () => {

    ELEMENTS.deleteProjectsData.addEventListener("click", clearProjectsData);
}