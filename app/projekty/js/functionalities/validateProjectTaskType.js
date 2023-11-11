import {elements} from "../elements.js";
import {appData} from "../index.js";
import {addProjectTaskElement} from "./addProjectTask/addProjectTaskElement.js";

export const validateProjectTaskType = (e) => {

    let elementContainer, elementTab, type;

    const taskId = elements.taskDialog.dataset.taskId;

    if (e.target.classList.contains("checked-subtasks-tab")) {

        elementContainer = elements.checkedSubtasksContainer;
        elementTab = elements.activeSubtasksTab;
        type = "checked";

    } else if (e.target.classList.contains("active-subtasks-tab")) {

        elementContainer = elements.activeSubtasksContainer;
        elementTab = elements.checkedSubtasksTab;
        type = "active";
    }


    if (!e.target.hasAttribute("aria-current")) {

        elementTab.removeAttribute("aria-current");

        e.target.setAttribute("aria-current", "true");

        elements.activeSubtasksContainer.classList.toggle("hide");
        elements.checkedSubtasksContainer.classList.toggle("hide");
        elements.removeCheckedSubtasksButton.classList.toggle("hide");

        elementContainer.innerHTML = "";

        appData.projects[taskId].subtasks[type].forEach(subtask => {
            addProjectTaskElement(subtask, type);
        })
    }
}