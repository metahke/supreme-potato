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

    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            return createTaskComponent();
        }
    });

    elements.clearTasksButton.addEventListener("click", () => {

        if(confirm("Czy jesteś pewien?")) {
            elements.mainTasksContainer.innerHTML = null;
            localStorage.removeItem("tasksData");
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
                    <span class="drag-icon material-symbols-outlined">
                        drag_indicator
                    </span>
                    <p class="grow-1">${getTaskInputData()}</p>
                </div>
            <div class="flex-gap">
                    <button class="open-task-button button contrast">
                        <span class="material-symbols-outlined">
                            open_in_new
                        </span>
                    </button>
                <button class="edit-task-button button secondary" data-is-edited="false">
                    <span class="material-symbols-outlined">
                            edit
                    </span>
                </button>
                <button class="remove-task-button button success">
                    <span class="material-symbols-outlined">
                        done
                    </span>
                </button>
                </div>
            </div>
            <dialog>
                <article>
                    <button
                       class="close contrast">
                    </button>
                    <h3 class="task-title">${getTaskInputData()}</h3>
                    <!--                    
                    <blockquote class="description">
                        "*Tu wrzucić losowe cytaty wspomagające motywację i działanie*"<br>
                        "*Domyślnie wrzucić tutaj możliwość zmiany opisu na własny, by dany projekt był jasny*"
                    </blockquote>
                    -->
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

    subtaskElements.clearDataButton.addEventListener("click", () => {

        if(confirm("Czy jesteś pewien?")) {
            subtaskElements.allSubtasks.innerHTML = "";
            saveData();
        }
    })

    taskContainer.querySelector(".open-task-button").addEventListener("click", () => {
        subtaskElements.modal.setAttribute("open", "true");
    })

    subtaskElements.closeModalButton.addEventListener("click", () => {
        subtaskElements.modal.removeAttribute("open");
    })

    makeTaskComponentEditable(taskContainer)
    makeTaskComponentRemovable(taskContainer)

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
                
                <div class="flex-gap">
                    <button class="edit-task-button button secondary" data-is-edited="false">
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                </button>
                <button class="remove-task-button button success">
                    <span class="material-symbols-outlined">
                        check
                    </span>
                </button>
            </div>
                
            </div>
        </article>
    `;

    makeTaskComponentEditable(subtaskContainer);
    makeTaskComponentRemovable(subtaskContainer);



    if (subtaskInput.value !== "") {

        subtasks.append(subtaskContainer);
        saveData();
    }

}

// Można by dodać zamiast innerHTML textContent w celu wyeliminowania możliwości wprowadzenia, np. elementu html
const taskEditModeOn = taskContainer => {

    const contentElement = taskContainer.querySelector("p");
    const contentElementValue = taskContainer.querySelector("p").textContent;

    const editTaskButton = taskContainer.querySelector(".edit-task-button");

    contentElement.innerHTML = `
        <input value="${contentElementValue}" />
    `;
    editTaskButton.innerHTML = `
        <span class="material-symbols-outlined">
            thumb_up
        </span>
    `;
}

// Można by dodać zamiast innerHTML textContent w celu wyeliminowania możliwości wprowadzenia, np. elementu html
const taskEditModeOff = taskContainer => {

    const editTaskButton = taskContainer.querySelector(".edit-task-button");

    editTaskButton.innerHTML = `
        <span class="material-symbols-outlined">
            edit
        </span>
    `;

    taskContainer.querySelector("p").innerHTML = taskContainer.querySelector("input").value;

    saveData();
}


/** Do poprawy zapewne **/
function openTaskListener() {

    const tasks = elements.mainTasksContainer.querySelectorAll(".task");

    tasks.forEach(task => task.querySelector(".open-task-button").addEventListener("click", () => {

        const modal = task.querySelector("dialog");

        modal.setAttribute("open", "true");

    }))
}

openTaskListener()

function closeSubtaskModalListener() {

    const taskDialogs = elements.mainTasksContainer.querySelectorAll(".task dialog");

    taskDialogs.forEach(taskDialog => taskDialog.querySelector(".close").addEventListener("click", () => {

        taskDialog.removeAttribute("open");
        saveData();
    }));
}

closeSubtaskModalListener()

/** Do poprawy zapewne END**/




function addSubtaskButtonListener() {

    const taskElements = elements.mainTasksContainer.querySelectorAll("dialog");

    taskElements.forEach(taskElement => {

        const subtaskInput = taskElement.querySelector(".subtask-input-field");
        const addSubtaskButton = taskElement.querySelector(".add-subtask-button");
        const clearSubtasksData = taskElement.querySelector(".clear-subtasks-data");
        const subtasks = taskElement.querySelector(".subtasks");



        addSubtaskButton.addEventListener("click", () => {

            createSubtaskComponent(subtaskInput, subtasks)

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




/** CLEAN CODE **/

const makeTaskComponentEditable = (taskElement) => {

    const taskEditButton = taskElement.querySelector(".edit-task-button");

    taskEditButton.addEventListener("click", () => {

        if (taskEditButton.dataset.isEdited === "false") {

            taskEditButton.dataset.isEdited = "true";
            taskEditModeOn(taskElement);
        } else if (taskEditButton.dataset.isEdited === "true") {

            taskEditButton.dataset.isEdited = "false";
            taskEditModeOff(taskElement);
        }
    })
}

function makeTaskComponentRemovable(taskElement) {

    taskElement.querySelector(".remove-task-button").addEventListener("click", () => {

            taskElement.remove();
            saveData();
        })
}

function makeTaskComponentsFunctional() {

    const taskElements = document.querySelectorAll(".task-element");

    taskElements.forEach(taskElement => {

        makeTaskComponentEditable(taskElement)
        makeTaskComponentRemovable(taskElement)

    })
}

makeTaskComponentsFunctional()

/** CLEAN CODE END **/

function clearSubtaskModalListener() {
    const taskDialogs = elements.mainTasksContainer.querySelectorAll(".task dialog");

    taskDialogs.forEach(taskDialog => taskDialog.querySelector(".clear-subtasks-data").addEventListener("click", () => {

        if(confirm("Czy jesteś pewien?")) {
            taskDialog.querySelector(".subtasks").innerHTML = "";
            saveData();
        }
    }));
}

clearSubtaskModalListener()




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