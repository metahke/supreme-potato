export const createProjectTaskElement = (taskData) => {

    const {name} = taskData;

    const container = document.createElement("div");
    container.classList.add("flex", "subtask-container");

  /*  const input = document.createElement("input");
    input.setAttribute("type", "checkbox")
    input.classList.add("subtask-checkbox")*/

    const element = document.createElement("article");
    element.classList.add("subtask", "flex", "between");


    element.innerHTML = `
        <p class="task-content">${name}</p>
        <!--<span class="drag-icon material-icons">
            drag_indicator
        </span>-->
    `

    /*container.append(input);*/
    container.append(element);

    return container;
}