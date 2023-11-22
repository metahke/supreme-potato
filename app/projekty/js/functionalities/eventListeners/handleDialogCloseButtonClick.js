import {ELEMENTS} from "../../elements/ELEMENTS.js";
import {closeDialog} from "../dialog/closeDialog.js";

export const handleDialogCloseButtonClick = () => {

    ELEMENTS.projectDialogCloseButton.addEventListener("click", () => {

        const dialog = ELEMENTS.projectDialog;
        closeDialog(dialog);

        clearProjectDialogMainContainer();
    });
}