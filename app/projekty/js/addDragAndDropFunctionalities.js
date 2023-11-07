export default function addDragAndDropFunctionalities() {

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