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

export {
    stopPropagationOnDragIcon,
    openTaskListener,
    closeTaskListener,
    makeSubtaskListCleanable,
    editTextsInTasks,
}