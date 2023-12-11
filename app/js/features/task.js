import {ELEMENTS} from "../elements/elements.js";
import {
    deleteProjectTask,
    getCurrentProjectID,
    getMaxProjectJournalID,
    getProjectData,
    getProjectTaskName,
    saveProjectJournalData,
} from "../data/appData.js";

import {createProjectJournalEntry, refreshJournalsList} from "./journal.js";
import {addHTMLElement} from "../helpers/helpers.js";

export const createProjectTaskEntry = (taskName) => {

    return {
        name: taskName,
    }
}

export const createProjectTaskElement = (taskID, taskData) => {

    const {name} = taskData;

    const taskElement = document.createElement("article");
    taskElement.classList.add("task", "flex", "between");
    taskElement.dataset.taskId = taskID;

    taskElement.innerHTML = `
        <p class="task-name">${name}</p>
        <details class="dropdown task-action">
            <summary>Akcja</summary>
            <ul>
                <li class="task-done">Zrobione</li>
                <li class="task-delete">Usuń</li>
            </ul>    
        </details>
    `

    return taskElement;
}

export const listTasks = () => {

    const projectID = getCurrentProjectID();
    const projectData = getProjectData(projectID);
    const {tasks: tasksData} = projectData;

    for (const taskID in tasksData) {

        const taskData = tasksData[taskID];
        const taskElement = createProjectTaskElement(taskID, taskData);
        addHTMLElement(ELEMENTS.tasksContainer, taskElement);
    }
}

export const refreshTasksList = () => {

    ELEMENTS.tasksContainer.innerHTML = null;

    listTasks();
}

// DO POPRAWY
export const initializeProjectTaskAccomplishment = (projectID, taskID) => {

    const journalName = getProjectTaskName(projectID, taskID);
    const journalID = getMaxProjectJournalID(projectID);
    const journalData = createProjectJournalEntry(journalName);

    deleteProjectTask(projectID, taskID);
    saveProjectJournalData(projectID, journalID, journalData);

    refreshTasksList();
    refreshJournalsList();
};