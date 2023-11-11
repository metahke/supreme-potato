import {elements} from "../elements.js";
import {saveDataToLocalStorage} from "./localStorage/saveDataToLocalStorage.js";
import {appData} from "../index.js";
import {validateProjectInputData} from "./addProject/validateProjectInputData.js";
import {createProjectEntryInAppData} from "./addProject/createProjectEntryInAppData.js";
import {addProjectTaskElement} from "./addProjectTask/addProjectTaskElement.js";
import {validateProjectTaskType} from "./validateProjectTaskType.js";
import {deleteProjectsDataListener} from "./eventListeners/deleteProjectsDataListener.js";
import {addProjectListener} from "./eventListeners/addProjectListener.js";
import {openAndListProjectInfoListener} from "./eventListeners/openAndListProjectInfoListener.js";
import {closeDialogListener} from "./eventListeners/closeDialogListener.js";
import {addProjectTaskListener} from "./eventListeners/addProjectTaskListener.js";

export const addEventListeners = () => {

    deleteProjectsDataListener();
    addProjectListener();
    openAndListProjectInfoListener();
    closeDialogListener();
    addProjectTaskListener();

/*

    elements.removeCheckedSubtasksButton.addEventListener("click", () => {

        const projectID = elements.taskDialog.dataset.taskId;

        const message = "Czy na pewno chcesz usunąć zaznaczone zadania?";

        if (confirm(message)) {

            appData.projects[projectID].subtasks.checked = [];
            elements.checkedSubtasksContainer.innerHTML = "";
            saveDataToLocalStorage();
        }
    })

    elements.checkedSubtasksTab.addEventListener("click", (e) => {
        validateProjectTaskType(e);
    });

    elements.activeSubtasksTab.addEventListener("click", (e) => {
        validateProjectTaskType(e);
    });

    elements.mainSubtasksContainer.addEventListener("click", (e) => {

        if (e.target.classList.contains("subtask-checkbox")) {

            const content = e.target.closest(".subtask-container").querySelector(".subtask-content").textContent;
            const projectID = e.target.closest("dialog").dataset.taskId;

            const currentState = e.target.checked
                ? "active"
                : "checked";

            const oppositeState = e.target.checked
                ? "checked"
                : "active";

            const subtasks = [...appData.projects[projectID].subtasks[currentState]].filter(subtask => subtask !== content);

            appData.projects[projectID].subtasks[currentState] = [...subtasks];
            appData.projects[projectID].subtasks[oppositeState].push(content);

            e.target.closest(".subtask-container").remove();
            saveDataToLocalStorage();
        }
    });





    const validateLogTab = (e) => {

        if (!e.target.hasAttribute("aria-current")) {

            elements.thoughtsLogTab.removeAttribute("aria-current");
            elements.subtasksTab.removeAttribute("aria-current");

            e.target.setAttribute("aria-current", "true");

            elements.subtasksTabs.classList.toggle("hide");
            elements.mainSubtasksContainer.classList.toggle("hide");
            elements.addLogContainer.classList.toggle("hide");
            elements.addSubtaskContainer.classList.toggle("hide");
            elements.thoughtsLogContainer.classList.toggle("hide");

            loadLogElements(e);
        }
    };

    elements.thoughtsLogTab.addEventListener("click", (e) => {
        validateLogTab(e);
    });

    elements.subtasksTab.addEventListener("click", (e) => {
        validateLogTab(e);
    });



    elements.addLogButton.addEventListener("click", (e) => {
        addLogElement(e);
    });

    elements.logInputField.addEventListener("keypress", (e) => {
            if (e.key === "Enter") addLogElement(e)
        }
    )
*/

}