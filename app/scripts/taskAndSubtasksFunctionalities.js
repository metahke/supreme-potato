import { saveData, createSubtaskComponent } from './main.js';

const state = {
    task: {
        longClick: false,
        isPressed: false,
        isOpened: false
    }
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

        if (!task.classList.contains("to-remove") && !state.longClick && document.querySelector(".edit-tasks-button").dataset.editMode === "false") {
            task.querySelector("dialog").setAttribute("open", "true");
        }
    });
}

function closeTaskListener(task) {

    const taskDialog = task.querySelector(".task dialog");

    taskDialog.querySelector(".close").addEventListener("click", (e) => {

        e.stopPropagation();
        taskDialog.removeAttribute("open");
        saveData();
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



function addSubtaskButtonListener(task) {

    const subtaskInput = task.querySelector(".subtask-input-field");
    const addSubtaskButton = task.querySelector(".add-subtask-button");
    const subtasks = task.querySelector(".subtasks");

    const buildSubtask = () => {
        createSubtaskComponent(subtaskInput, subtasks);
        task.querySelector(".subtask-input-field").value = "";

        saveData();
    };

    addSubtaskButton.addEventListener("click", () => {
        buildSubtask();
    });

    subtaskInput.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {
            buildSubtask();
        }
    });
}

export {
    stopPropagationOnDragIcon,
    openTaskListener,
    closeTaskListener,
    addSubtaskButtonListener,
    makeSubtaskListCleanable,
    editTextsInTasks,
}