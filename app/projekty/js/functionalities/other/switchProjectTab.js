import {ELEMENTS} from "../../elements/ELEMENTS.js";

export const switchProjectTab = (e) => {

    ELEMENTS.journalsTab.removeAttribute("aria-current");
    ELEMENTS.tasksTab.removeAttribute("aria-current");

    e.target.setAttribute("aria-current", "true");

    ELEMENTS.tasksContainer.classList.toggle("hide");
    ELEMENTS.journalsContainer.classList.toggle("hide");

    ELEMENTS.addProjectTaskForm.classList.toggle("hide");
    ELEMENTS.addProjectJournalForm.classList.toggle("hide");
};