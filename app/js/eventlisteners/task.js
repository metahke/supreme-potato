import {ELEMENTS} from "../elements/elements.js";
import {deleteProjectTask, getCurrentProjectID, getMaxProjectTaskID, saveProjectTaskData} from "../data/appData.js";
import {
    createProjectTaskEntry,
    initializeProjectTaskAccomplishment,
    refreshTasksList
} from "../features/task.js";

import {valueNotEmpty} from "../helpers/helpers.js";

export const handleProjectTaskElementClick = () => {

    ELEMENTS.tasksContainer.addEventListener("click", (e) => {

        if (e.target.classList.contains("task-done")) {

            const projectID = getCurrentProjectID();
            const taskID = e.target.closest(".task").dataset.taskId;

            initializeProjectTaskAccomplishment(projectID, taskID)
        }

        if (e.target.classList.contains("task-delete")) {

            const projectID = getCurrentProjectID();
            const taskID = e.target.closest(".task").dataset.taskId;

            deleteProjectTask(projectID, taskID);
            refreshTasksList();
        }
    });
}
export const handleAddProjectTaskFormSubmit = () => {

    ELEMENTS.addProjectTaskForm.addEventListener("submit", (e) => {

        e.preventDefault();

        let taskName = new FormData(ELEMENTS.addProjectTaskForm).get("task-name");

        if (valueNotEmpty(taskName)) {

            const projectID = getCurrentProjectID();
            const projectTaskID = getMaxProjectTaskID(projectID);

            const taskData = createProjectTaskEntry(taskName);
            saveProjectTaskData(projectID, projectTaskID, taskData);

            refreshTasksList();
            ELEMENTS.addProjectTaskForm.reset();
        }
    });
}