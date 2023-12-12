import {ELEMENTS} from "../elements/elements.js";
import {clearProjectDialogMainContainer, switchProjectTab} from "../features/project-dialog.js";
import {closeDialog} from "../helpers/helpers.js";

export const switchProjectTaskTabsListener = () => {

    ELEMENTS.projectDialogTabs.addEventListener("click", (e) => {

        if (!e.target.hasAttribute("aria-current")) switchProjectTab(e);
    })
}
export const handleDialogCloseButtonClick = () => {

    ELEMENTS.projectDialogCloseButton.addEventListener("click", () => {

        closeDialog(ELEMENTS.projectDialog);

        clearProjectDialogMainContainer();
    });
}