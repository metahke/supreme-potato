/** CHECKED "CLEAN" CODE **/

// Można, by zrobić jeszcze fajniejszy podział w stylu: elements.button.addTask :-)
const elements = {
    addTaskButton: document.querySelector(".add-task-button"),
    taskInputField: document.querySelector(".task-input-field"),
    mainTasksContainer: document.querySelector(".tasks"),
    clearTasksButton: document.querySelector(".clear-tasks-data")
}



/** Load Data from Local Storage & close all modals **/

function loadDataFromLocalStorage() {

    if (localStorage.getItem("tasksData") !== null) {
        elements.mainTasksContainer.innerHTML = localStorage.getItem("tasksData");

        makeSureAllModalsAreClosed();
    }
}



function makeSureAllModalsAreClosed() {

    document.querySelectorAll("dialog").forEach(dialog => {
        dialog.removeAttribute("open")
    })
}
/** END **/



function saveData() {
    localStorage.setItem("tasksData", elements.mainTasksContainer.innerHTML);
}



function addInitialEventListeners() {

    elements.addTaskButton.addEventListener("click", createTaskComponent);

    elements.taskInputField.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            return createTaskComponent();
        }
    });

    elements.clearTasksButton.addEventListener("click", () => {

        if(confirm("Czy jesteś pewien?")) {

            document.querySelectorAll(".to-remove").forEach(item => {

                item.remove();
                localStorage.removeItem("tasksData");
            });
        }
    });
}



function initializeBuild() {

    loadDataFromLocalStorage();
    addInitialEventListeners();
}

initializeBuild();



function getTaskInputData() {
    return elements.taskInputField.value;
}

/** END "CLEAN" CODE **/



// To do przejrzenia, może pójdzie jakoś oczyścić... może podzielić?
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
                    <button
                       class="close contrast">
                    </button>
                    <h3 class="task-title">${getTaskInputData()}</h3>                 
                    <blockquote class="description">
                        Chciałbym...
                    </blockquote>
                    <div class="flex-gap">
                        <input class="subtask-input-field" placeholder="" />
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

    /** ROZDDZIELENIA ODTĄD? **/
    const subtaskElements = {
        input: taskContainer.querySelector(".subtask-input-field"),
        addButton: taskContainer.querySelector(".add-subtask-button"),
        clearDataButton: taskContainer.querySelector(".clear-subtasks-data"),
        allSubtasks: taskContainer.querySelector(".subtasks"),
        modal: taskContainer.querySelector("dialog"),
        closeModalButton: taskContainer.querySelector("dialog .close")
    }

    subtaskElements.addButton.addEventListener("click", () => {

        createSubtaskComponent(subtaskElements.input, subtaskElements.allSubtasks);
        subtaskElements.input.value = "";
    })
    subtaskElements.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            createSubtaskComponent(subtaskElements.input, subtaskElements.allSubtasks);
            subtaskElements.input.value = "";
        }
    })

    stopPropagationOnDragIcon(taskContainer);
    openTaskListener(taskContainer);
    closeTaskListener(taskContainer);
    checkTaskListener(taskContainer);
    makeSubtaskListCleanable(taskContainer);

    if (getTaskInputData() !== "") {
        elements.mainTasksContainer.append(taskContainer);
    }

    saveData();
    elements.taskInputField.value = null;
}



// To do przejrzenia, może pójdzie jakoś oczyścić... może podzielić?
function createSubtaskComponent(subtaskInput, subtasks) {

    const subtaskContainer = document.createElement("div");
    subtaskContainer.classList.add("subtask");
    subtaskContainer.classList.add("task-element");

    subtaskContainer.innerHTML = `
        <article class="article subtask-container">
            <div class="flex-gap">
                    <p class="subtask-title grow-1">${subtaskInput.value}</p>
            </div>
        </article>
    `;

    if (subtaskInput.value !== "") {

        subtasks.append(subtaskContainer);
        saveData();
    }

    checkSubtaskListener(subtaskContainer);

}

// Można by dodać zamiast innerHTML textContent w celu wyeliminowania możliwości wprowadzenia, np. elementu html


// chatgpt pomgógł mi tu rozwiązać jeden problem wynikający z tym, że podczas długiego kliku i usunięciu klasy "to-remove" zadanie od razu się otwierało

const state = {
    longClick: false,
    isPressed: false,
    isOpened: false
}


function stopPropagationOnDragIcon(task) {

    task.querySelector(".drag-icon").addEventListener("click", (e) => {
        e.stopPropagation();
    });

    task.querySelector(".drag-icon").addEventListener("mousedown", (e) => {
        e.stopPropagation();
    });
}

function openTaskListener(task) {

    task.addEventListener("click", () => {

        if (!task.classList.contains("to-remove") && !state.longClick) {
            task.querySelector("dialog").setAttribute("open", "true");
            state.isOpened = true;
        }
        state.longClick = false;
    })
}

function checkTaskListener(task) {

    task.addEventListener("mousedown", () => {
        state.isPressed = true;
        setTimeout(() => {
            if (state.isPressed && !state.isOpened) {
                state.longClick = true;

                if (task.classList.contains("to-remove")) {
                    task.classList.remove("to-remove");
                } else {
                    task.classList.add("to-remove");
                }
            }
        }, 200);
    });

    task.addEventListener("mouseup", () => {

        state.isPressed = false;
    });
}



function makeSubtaskListCleanable(task) {

    const removeMarkedSubtasks = task.querySelector(".clear-subtasks-data");
    const subtasks = task.querySelector(".subtasks");

    removeMarkedSubtasks.addEventListener("click", () => {

        if(confirm("Czy jesteś pewien?")) {
            subtasks.querySelectorAll(".to-remove").forEach(subtask => {

                subtask.remove();
            });
        }

        saveData();
    })
}

function checkSubtaskListener(subtask) {

    let subtaskLongClick = false;

    subtask.addEventListener("mousedown", () => {

        subtaskLongClick = true;
        setTimeout(() => {

            if (subtaskLongClick) {

                if (subtask.classList.contains("to-remove")) {
                    subtask.classList.remove("to-remove");
                } else {
                    subtask.classList.add("to-remove");
                }
            }
        }, 200);
    });

    subtask.addEventListener("mouseup", () => {
        subtaskLongClick = false;
    });
}





function closeTaskListener(task) {

    const taskDialog = task.querySelector(".task dialog");

    taskDialog.querySelector(".close").addEventListener("click", (e) => {

        e.stopPropagation();
        taskDialog.removeAttribute("open");
        state.isPressed = false;
        state.isOpened = false;
        saveData();
    });
}



function addInitialTaskAndSubtaskListeners() {

    const tasks = elements.mainTasksContainer.querySelectorAll(".task");

    tasks.forEach(task => {
        stopPropagationOnDragIcon(task);

        openTaskListener(task);
        checkTaskListener(task);
        closeTaskListener(task);

        makeSubtaskListCleanable(task);

        const subtasks = task.querySelectorAll(".subtask");

        subtasks.forEach(subtask => {

            checkSubtaskListener(subtask);
        })
    })

}

addInitialTaskAndSubtaskListeners();
























function addSubtaskButtonListener() {

    const taskElements = elements.mainTasksContainer.querySelectorAll("dialog");

    taskElements.forEach(taskElement => {

        const subtaskInput = taskElement.querySelector(".subtask-input-field");
        const addSubtaskButton = taskElement.querySelector(".add-subtask-button");
        const subtasks = taskElement.querySelector(".subtasks");

        addSubtaskButton.addEventListener("click", () => {

            createSubtaskComponent(subtaskInput, subtasks);
            taskElement.querySelector(".subtask-input-field").value = "";

            saveData();
        })

        subtaskInput.addEventListener("keydown", (e) => {

            if (e.key === "Enter") {

                createSubtaskComponent(subtaskInput, subtasks)

                taskElement.querySelector(".subtask-input-field").value = "";

                saveData();
            }

        });
    });


}

addSubtaskButtonListener()




/** Wystarczy wrzucić dla pojedynczego zadania, nie dla każdego kontenera z osobna **/

/** TEST SKRYPTU SORTABLE **/
const tasksDragArea = document.querySelector(".tasks");

new Sortable(tasksDragArea, {
    animation: 175,
    onEnd: saveData,
    //draggable: ".task-element",
    //filter: "dialog",
    handle: ".drag-icon"
})

const subtasksDragArea = document.querySelectorAll(".subtasks");

subtasksDragArea.forEach(subtaskElement => {
    new Sortable(subtaskElement, {
        animation: 175,
        onEnd: saveData
    })
})
/** END **/