import {ELEMENTS} from "../elements/elements.js";
import {
    deleteProjectTask,
    getCurrentProjectID,
    getMaxProjectTaskID,
    getProjectTaskName,
    saveProjectTaskData
} from "../data/appData.js";
import {
    createProjectTaskEntry,
    initializeProjectTaskAccomplishment,
    renderTasks
} from "../features/task.js";

import {openDialog, valueNotEmpty} from "../helpers/helpers.js";

export const handleProjectTaskElementClick = () => {

    ELEMENTS.tasksContainer.addEventListener("click", (e) => {

        if (e.target.classList.contains("task-done")) {

            const projectID = getCurrentProjectID();
            const taskID = e.target.closest(".task").dataset.taskId;

            return initializeProjectTaskAccomplishment(projectID, taskID);
        }

        if (e.target.classList.contains("task-rename")) {

            const taskID = e.target.closest(".task").dataset.taskId;

            ELEMENTS.itemName.value = getProjectTaskName(getCurrentProjectID(), taskID);
            ELEMENTS.renameDialog.dataset.itemType = "task";
            ELEMENTS.renameDialog.dataset.taskId = taskID;

            return openDialog(ELEMENTS.renameDialog);
        }

        if (e.target.classList.contains("task-delete")) {

            const projectID = getCurrentProjectID();
            const taskID = e.target.closest(".task").dataset.taskId;

            deleteProjectTask(projectID, taskID);
            renderTasks();
        }
    });
}
export const handleAddProjectTaskFormSubmit = () => {

    ELEMENTS.addProjectTaskForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const taskName = new FormData(ELEMENTS.addProjectTaskForm).get("task-name");

        if (valueNotEmpty(taskName)) {

            const projectID = getCurrentProjectID();
            const projectTaskID = getMaxProjectTaskID(projectID);

            const taskData = createProjectTaskEntry(taskName);
            saveProjectTaskData(projectID, projectTaskID, taskData);

            renderTasks();
            ELEMENTS.addProjectTaskForm.reset();
        }
    });
}