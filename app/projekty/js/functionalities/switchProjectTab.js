import {elements} from "../elements.js";

export const switchProjectTab = (e) => {

    elements.journalsTab.removeAttribute("aria-current");
    elements.tasksTab.removeAttribute("aria-current");

    e.target.setAttribute("aria-current", "true");

    elements.tasksContainer.classList.toggle("hide");
    elements.journalsContainer.classList.toggle("hide");

    elements.addProjectTaskForm.classList.toggle("hide");
    elements.addProjectJournalForm.classList.toggle("hide");
};