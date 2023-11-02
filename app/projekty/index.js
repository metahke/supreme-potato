const elements = {
    addTaskButton: document.querySelector(".add-task-button"),
    addSubtaskButton: document.querySelector(".add-subtask-button"),
    editTasksButton: document.querySelector(".edit-tasks-button"),
    taskInputField: document.querySelector(".task-input-field"),
    subtaskInputField: document.querySelector(".subtask-input-field"),
    mainTasksContainer: document.querySelector(".tasks"),
    mainSubtasksContainer: document.querySelector(".subtasks"),
    activeSubtasksContainer: document.querySelector(".active-subtasks"),
    checkedSubtasksContainer: document.querySelector(".checked-subtasks"),
    removeSelectedTasksButton: document.querySelector(".remove-selected-tasks-button"),
    removeCheckedSubtasksButton: document.querySelector(".remove-checked-subtasks-button"),
    taskDialog: document.querySelector(".task-dialog"),

    activeSubtasksTab: document.querySelector(".active-subtasks-tab"),
    checkedSubtasksTab: document.querySelector(".checked-subtasks-tab"),
}


let appData = {};
let projectsID = 0;



const loadDataFromLocalStorage = () => {

    if (localStorage.getItem("appData") === null) {

        return localStorage.setItem("appData", JSON.stringify(appData));
    }

    appData = JSON.parse(localStorage.getItem("appData"));

    if (!appData.projects) {
        appData.projects = {};
    }
}

const saveData = () => {

    localStorage.setItem("appData", JSON.stringify(appData));
}

const loadTasksFromLocalStorage = () => {

    Object.keys(appData.projects).map(project => {

        const { name, subtasks } = appData.projects[project];

        /** dziwny bug, bo przy odświeżeniu dodają się taski, których w zasadzie nie ma. prawodpodobnie funkcjonalność zwiększania wartości projectsID jakoś błędnie działa. na razie rozwiązane przez poniższego ifa; dziwne o tyle, że wartość projectsID nie jest zapisywana do localStorage? **/
        name !== ""
            ? addTaskElement(name, project)
            : undefined
        ;
    });
}

const validateAddTaskInput = () => {

    elements.taskInputField.value
        ? addTaskElement()
        : undefined
}

const addTaskElement = (name, project)  => {

    const element = document.createElement("article");
    element.classList.add("task", "flex", "between");

    const value = name
        ? name
        : elements.taskInputField.value

    element.innerHTML = `
        <p>${value}</p>
        <span class="drag-icon material-icons">
            drag_indicator
        </span>
    `

    /** while powinno sprawdzać, czy dany klucz istnieje, a jeśli nie, to powinno pozostawiać wolny klucz do wykonania następnej operacji**/
    while (appData.projects[projectsID]) {
        projectsID++;
    }


    element.dataset.taskId = project
        ? project
        : projectsID
    ;

    elements.mainTasksContainer.append(element);


    /** dla wolnego klucza projectsID tworzony jest nowy obiekt konkretnego taska **/
    if (elements.taskInputField.value !== "") {
        appData.projects[projectsID] = {
            name: elements.taskInputField.value,
            subtasks: {
                active: [],
                checked: []
            }
        }
    }


    elements.taskInputField.value = null;
    saveData();
}



const addSubtaskElement = (name, state) => {

    const projectID = elements.taskDialog.dataset.taskId;

    const container = document.createElement("div");
    container.classList.add("flex", "subtask-container");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox")
    input.classList.add("subtask-checkbox")

    const element = document.createElement("article");
    element.classList.add("subtask", "flex", "between");

    const value = name
        ? name
        : elements.subtaskInputField.value

    element.innerHTML = `
        <p class="subtask-content">${value}</p>
        <span class="drag-icon material-icons">
            drag_indicator
        </span>
    `

    container.append(input);
    container.append(element);

    switch (state) {
        case "active":
            elements.activeSubtasksContainer.append(container);
            break;
        case "checked":
            input.setAttribute("checked", "true");
            elements.checkedSubtasksContainer.append(container);
            break;
        default:
            elements.activeSubtasksContainer.append(container);
            break;
    }


    if (elements.subtaskInputField.value !== "") {

        appData.projects[projectID].subtasks.active.push(value);
    }

    elements.subtaskInputField.value = null;
    saveData();
}

const validateAddSubtaskInput = () => {

    elements.subtaskInputField.value !== ""
        ? addSubtaskElement()
        : undefined
}





const initializeEventListeners = () => {

    elements.addTaskButton.addEventListener("click", () => validateAddTaskInput());

    elements.taskInputField.addEventListener("keydown", (e) => e.key === "Enter"
        ? validateAddTaskInput()
        : undefined
    );

    elements.mainTasksContainer.addEventListener("click", e => {

        if (e.target.classList.contains("task")) {

            const taskId = e.target.dataset.taskId;

            elements.taskDialog.setAttribute("open", "true");

            elements.taskDialog.dataset.taskId = taskId

            elements.taskDialog.querySelector(".task-title").textContent = appData.projects[taskId].name;


            elements.activeSubtasksContainer.innerHTML = null;

            appData.projects[taskId].subtasks.active.forEach(subtask => {
                addSubtaskElement(subtask, "active");
            });
        }
    });

    elements.taskDialog.querySelector(".close").addEventListener("click", (e) => {

        e.target.closest("dialog").setAttribute("open", "false");
    });

    elements.addSubtaskButton.addEventListener("click", () => {
        validateAddSubtaskInput();
    });

    elements.subtaskInputField.addEventListener("keydown", (e) => e.key === "Enter"
        ? validateAddSubtaskInput()
        : undefined
    );


    elements.removeCheckedSubtasksButton.addEventListener("click", () => {

        const projectID = elements.taskDialog.dataset.taskId;

        const message = "Czy na pewno chcesz usunąć zaznaczone zadania?";

        if (confirm(message)) {

            appData.projects[projectID].subtasks.checked = [];
            elements.checkedSubtasksContainer.innerHTML = "";
            saveData();
        }
    })



    elements.checkedSubtasksTab.addEventListener("click", () => {

        if (!elements.checkedSubtasksTab.hasAttribute("aria-current")) {

            elements.activeSubtasksTab.removeAttribute("aria-current");
            elements.checkedSubtasksTab.setAttribute("aria-current", "true");

            elements.activeSubtasksContainer.classList.toggle("hide");
            elements.checkedSubtasksContainer.classList.toggle("hide");



            elements.checkedSubtasksContainer.innerHTML = "";

            const taskId = elements.taskDialog.dataset.taskId;

            appData.projects[taskId].subtasks.checked.forEach(subtask => {
                addSubtaskElement(subtask, "checked");
            })
        }

    });

    elements.activeSubtasksTab.addEventListener("click", () => {

        if (!elements.activeSubtasksTab.hasAttribute("aria-current")) {

            elements.checkedSubtasksTab.removeAttribute("aria-current");
            elements.activeSubtasksTab.setAttribute("aria-current", "true");

            elements.activeSubtasksContainer.classList.toggle("hide");
            elements.checkedSubtasksContainer.classList.toggle("hide");


            elements.activeSubtasksContainer.innerHTML = "";

            const taskId = elements.taskDialog.dataset.taskId;

            appData.projects[taskId].subtasks.active.forEach(subtask => {
                addSubtaskElement(subtask, "active");
            });
        }
    });



    elements.mainSubtasksContainer.addEventListener("click", (e) => {

        if (e.target.classList.contains("subtask-checkbox")) {

            const content = e.target.closest(".subtask-container").querySelector(".subtask-content").textContent;
            const projectID = e.target.closest("dialog").dataset.taskId;

            if (e.target.checked) {

                const activeSubtasks = [...appData.projects[projectID].subtasks.active].filter(subtask => subtask !== content);

                appData.projects[projectID].subtasks.active = [...activeSubtasks]

                appData.projects[projectID].subtasks.checked.push(content)

                e.target.closest(".subtask-container").remove();
                saveData();

            } else {

                const checkedSubtasks = [...appData.projects[projectID].subtasks.checked].filter(subtask => subtask !== content);

                appData.projects[projectID].subtasks.checked = [...checkedSubtasks]

                appData.projects[projectID].subtasks.active.push(content)

                e.target.closest(".subtask-container").remove();
                saveData();
            }
        }
    });
}






function initializeFunctionalities() {

    loadDataFromLocalStorage();
    loadTasksFromLocalStorage();
    initializeEventListeners();
}

initializeFunctionalities();




/*const clearProjectsData = () => {

    appData.projects = {};
    saveData();
}

clearProjectsData();*/
