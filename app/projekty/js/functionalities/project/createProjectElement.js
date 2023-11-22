export const createProjectElement = (id, content)  => {

    const element = document.createElement("article");
    element.classList.add("project", "flex", "between");

    element.dataset.projectId = id;

    element.innerHTML = `
        <p class="project-title">${content}</p>
        <!--<span class="drag-icon material-icons">
            drag_indicator
        </span>-->
    `

    return element;
}