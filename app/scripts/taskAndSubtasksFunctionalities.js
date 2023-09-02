import { saveData, createSubtaskComponent } from './main.js';

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
        }, 75);
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
        }, 75);
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
    checkTaskListener,
    closeTaskListener,
    addSubtaskButtonListener,
    makeSubtaskListCleanable,
    editTextsInTasks,
    checkSubtaskListener,
}