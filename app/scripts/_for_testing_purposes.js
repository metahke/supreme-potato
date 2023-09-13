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