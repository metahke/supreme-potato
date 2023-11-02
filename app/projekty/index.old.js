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

function saveData() {
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
                saveData();
            });

            elements.editTasksButton.querySelector("span").textContent = "edit";
        }
    });
}





function stopPropagationOnDragIcon(task) {

    task.querySelector(".drag-icon").addEventListener("click", (e) => {
        e.stopPropagation();
    });

    task.querySelector(".drag-icon").addEventListener("mousedown", (e) => {
        e.stopPropagation();
    });
}

function editTextsInTasks(task) {

    return changeTextToInput(task);
}

function changeTextToInput(task) {

    const texts = task.querySelectorAll(".editable");

    texts.forEach(text => {

        text.addEventListener("dblclick", () => {

            if (text.querySelector("input") === null) {

                text.innerHTML = `<input value="${text.innerText}">`;

                changeInputToText(text);
            }
        });
    });
}

function changeInputToText(text) {

    const input = text.querySelector("input");

    input.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            const inputValue = input.value;

            text.innerHTML = `${inputValue}`;
            saveData();
        }
    });

    document.querySelector("html").addEventListener("click", (e) => {

        if (!e.target.classList.contains("editable")) {

            text.innerHTML = input.value;
            saveData();
        }
    });

    input.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}






const editTasksButtonEventListener = () => {

    elements.editTasksButton.addEventListener("click", () => {

        console.log(elements.editTasksButton.dataset.editMode);

        if (elements.editTasksButton.dataset.editMode === "false") {
            elements.editTasksButton.dataset.editMode = "true";
            editTasksModeOn();
        } else {
            elements.editTasksButton.dataset.editMode = "false";
            editTasksModeOff();
        }

    });
}

function editTasksModeOn() {

    elements.editTasksButton.querySelector("span").textContent = "thumb_up";
}

function editTasksModeOff() {

    elements.editTasksButton.querySelector("span").textContent = "edit";

    const tasks = document.querySelectorAll(".task");

    tasks.forEach(task => {

        task.classList.remove("to-remove");
    });
}


function addInitialEventListeners() {

    addTaskEventListeners();
    clearTasksListEventListener();
    editTasksButtonEventListener();
}




/** NEW!!!  --> ONE EVENT LISTENER WITH SWITCH instead of A LOT OF LISTENERS **/

const tasks = document.querySelectorAll(".task");

tasks.forEach(task => {

    task.addEventListener("click", () => {
        task.classList.toggle("to-remove");
    })
});

elements.mainTasksContainer.addEventListener("click", (e) => {

    let subtasks;

    switch (e.target.className) {

        case "task-container":

            if (elements.editTasksButton.dataset.editMode === "false") {

                console.log(e.target.closest(".task-element"))

                e.target.querySelector("dialog").setAttribute("open", "true");
            } else {

                e.target.closest(".task-element").classList.toggle("to-remove");
            }

            break;

        case "close contrast":
            //dialog
            e.target.closest("dialog").removeAttribute("open");
            break;

        case "add-subtask-button":

            const subtaskInput = e.target.closest(".flex").querySelector(".subtask-input-field");
            subtasks = e.target.closest("article").querySelector(".subtasks");
            createSubtaskComponent(subtaskInput, subtasks);
            break;

        case "clear-subtasks-data warning":

            subtasks = e.target.closest("article").querySelector(".subtasks");

            if(confirm("Czy jesteś pewien?")) {
                subtasks.querySelectorAll(".to-remove").forEach(subtask => {
                    subtask.remove();
                });
            }

            saveData();
            break;
    }
});

elements.mainTasksContainer.addEventListener("dblclick", (e) => {

    console.log(e.target.className);
    switch (e.target.className) {

        case "article subtask-container":
            e.target.closest(".subtask").classList.toggle("to-remove");
            break;
    }
})

const toggleEditClass = (task) => {

    task.classList.toggle("to-remove");
};


function createTaskComponent() {

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task");
    taskContainer.classList.add("task-element");

    taskContainer.innerHTML = `
        <article class="task-container">
            <div class="grid mobile-column">
                <div class="task-text">
                    <p class="grow-1">${getTaskInputData()}</p>
                    <span class="drag-icon material-icons">
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
                    <div class="flex row gap">
                        <input class="subtask-input-field" placeholder="Dodaj nowe zadanie..." />
                        <button class="add-subtask-button">
                            <span class="material-icons">
                                add
                            </span>
                        </button>
                        <button class="clear-subtasks-data warning">
                            <span class="material-icons">
                                delete_outline
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
    editTextsInTasks(taskContainer);

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
            <div class="flex row gap">
                    <p class="subtask-title grow-1 editable">${subtaskInput.value}</p>
                    <span class="drag-icon material-icons">
                        drag_indicator
                    </span>
            </div>
        </article>
    `;

    if (subtaskInput.value !== "") {
        subtasks.append(subtaskContainer);
        subtaskInput.value = null;
        saveData();
    }

    stopPropagationOnDragIcon(subtaskContainer);
    editTextsInTasks(subtaskContainer);

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

