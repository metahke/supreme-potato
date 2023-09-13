import {
    stopPropagationOnDragIcon,
    openTaskListener,
    closeTaskListener,
    addSubtaskButtonListener,
    makeSubtaskListCleanable,
    editTextsInTasks,
} from './taskAndSubtasksFunctionalities.js';

const elements = {
    addTaskButton: document.querySelector(".add-task-button"),
    editTasksButton: document.querySelector(".edit-tasks-button"),
    taskInputField: document.querySelector(".task-input-field"),
    mainTasksContainer: document.querySelector(".tasks"),
    clearTasksButton: document.querySelector(".clear-tasks-data")
}

const makeSureAllModalsAreClosed = () => {

    document.querySelectorAll("dialog").forEach(dialog => {
        dialog.removeAttribute("open")
    })
}

function loadDataFromLocalStorage() {

    if (localStorage.getItem("tasksData") !== null) {
        elements.mainTasksContainer.innerHTML = localStorage.getItem("tasksData");

        makeSureAllModalsAreClosed();
    }
}

export function saveData() {
    localStorage.setItem("tasksData", elements.mainTasksContainer.innerHTML);
}

const getTaskInputData = () => {
    return elements.taskInputField.value;
}

const addTaskEventListeners = () => {

    elements.addTaskButton.addEventListener("click", createTaskComponent);

    elements.taskInputField.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            return createTaskComponent();
        }
    });

}

const clearTasksListEventListener = () => {
    elements.clearTasksButton.addEventListener("click", () => {

        if(confirm("Czy jesteś pewien?")) {

            document.querySelectorAll(".to-remove").forEach(item => {

                item.remove();
                localStorage.removeItem("tasksData");
            });
        }
    });
}

const editTasksButtonEventListener = () => {

    elements.editTasksButton.addEventListener("click", () => {

        if (elements.editTasksButton.dataset.editMode === "false") {
            elements.editTasksButton.dataset.editMode = "true";
            editTasksModeOn();
        } else {
            elements.editTasksButton.dataset.editMode = "false";
            editTasksModeOff();
        }

    });
}

function addInitialEventListeners() {

    addTaskEventListeners();
    clearTasksListEventListener();
    editTasksButtonEventListener();



    /** NEW!!!  --> ONE EVENT LISTENER WITH SWITCH instead of A LOT OF LISTENERS **/

    elements.mainTasksContainer.addEventListener("click", (e) => {

        console.log(e.target);

        switch (e.target.className) {

            case "task-container":
                e.target.querySelector("dialog").setAttribute("open", "true");
                break;

            case "close contrast":
                //dialog
                e.target.parentNode.parentNode.removeAttribute("open")
        }
    })
}

const toggleEditClass = (task) => {

    task.classList.toggle("to-remove");
};

function editTasksModeOn() {

    elements.editTasksButton.querySelector("span").textContent = "thumb_up";

    const tasks = document.querySelectorAll(".task");

    tasks.forEach(task => {

        task.addEventListener("click", () => {
            task.classList.toggle("to-remove");
        })
    });
}

function editTasksModeOff() {

    elements.editTasksButton.querySelector("span").textContent = "edit";

    const tasks = document.querySelectorAll(".task");

    tasks.forEach(task => {

        task.removeEventListener("click", () => {
            task.classList.toggle("to-remove");
        })
    });

}

function createTaskComponent() {

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task");
    taskContainer.classList.add("task-element");

    taskContainer.innerHTML = `
        <article class="task-container">
            <div class="grid mobile-column">
                <div class="task-text">
                    <p class="grow-1">${getTaskInputData()}</p>
                    <span class="drag-icon material-symbols-outlined">
                        drag_indicator
                    </span>
                </div>
            </div>
            <dialog>
                <article>
                <small class="left"><mark>double click on text to edit & hold on item to mark for deletion</mark></small>
                    <button
                       class="close contrast">
                    </button>
                    <h3 class="task-title editable">${getTaskInputData()}</h3>                 
                    <blockquote class="description editable">
                        
                    </blockquote>
                    <div class="flex-gap">
                        <input class="subtask-input-field" placeholder="Dodaj nowe zadanie..." />
                        <button class="add-subtask-button button-flex-center-width-65">
                            <span class="material-symbols-outlined">
                                add
                            </span>
                        </button>
                        <button class="clear-subtasks-data warning button-flex-center-width-65">
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                    </div>
                    <div class="subtasks">
                    
                    </div>
                    
                </article>
            </dialog>
        </article>
    `;

    stopPropagationOnDragIcon(taskContainer);
    openTaskListener(taskContainer);
    closeTaskListener(taskContainer);
    makeSubtaskListCleanable(taskContainer);
    editTextsInTasks(taskContainer);
    addSubtaskButtonListener(taskContainer);

    if (getTaskInputData() !== "") {
        elements.mainTasksContainer.append(taskContainer);
    }

    saveData();
    elements.taskInputField.value = null;
}

export function createSubtaskComponent(subtaskInput, subtasks) {

    const subtaskContainer = document.createElement("div");
    subtaskContainer.classList.add("subtask");
    subtaskContainer.classList.add("task-element");

    subtaskContainer.innerHTML = `
        <article class="article subtask-container">
            <div class="flex-gap">
                    <p class="subtask-title grow-1 editable">${subtaskInput.value}</p>
                    <span class="drag-icon material-symbols-outlined">
                        drag_indicator
                    </span>
            </div>
        </article>
    `;

    if (subtaskInput.value !== "") {
        subtasks.append(subtaskContainer);
        saveData();
    }

    stopPropagationOnDragIcon(subtaskContainer);
    editTextsInTasks(subtaskContainer);

}



function addInitialTaskAndSubtaskListeners() {

    const tasks = elements.mainTasksContainer.querySelectorAll(".task");

    tasks.forEach(task => {

        stopPropagationOnDragIcon(task);

        openTaskListener(task);
        closeTaskListener(task);

        addSubtaskButtonListener(task);

        makeSubtaskListCleanable(task);
        editTextsInTasks(task);

        const subtasks = task.querySelectorAll(".subtask");

        subtasks.forEach(subtask => {

            stopPropagationOnDragIcon(subtask);
        })
    })

}

function addDragAndDropFunctionalities() {

    const tasksDragArea = document.querySelector(".tasks");
    const subtasksDragArea = document.querySelectorAll(".subtasks");

    new Sortable(tasksDragArea, {
        animation: 175,
        onEnd: saveData,
        //draggable: ".task-element",
        //filter: "dialog",
        handle: ".drag-icon"
    });

    subtasksDragArea.forEach(subtaskElement => {
        new Sortable(subtaskElement, {
            animation: 175,
            onEnd: saveData,
            handle: ".drag-icon"
        });
    });
}



function initializeBuild() {

    loadDataFromLocalStorage();
    addInitialEventListeners();
    //addInitialTaskAndSubtaskListeners();
    addDragAndDropFunctionalities();
}

initializeBuild();

