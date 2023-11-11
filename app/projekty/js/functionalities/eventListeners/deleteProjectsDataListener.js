import {elements} from "../../elements.js";
import {clearProjectsData} from "../clearProjectsData.js";

export const deleteProjectsDataListener = () => {

    elements.deleteProjectsData.addEventListener("click", clearProjectsData);
}