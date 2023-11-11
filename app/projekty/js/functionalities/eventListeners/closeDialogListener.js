import {elements} from "../../elements.js";

export const closeDialogListener = () => {

    elements.taskDialog.querySelector(".close").addEventListener("click", (e) => {

        e.target.closest("dialog").setAttribute("open", "false");
    });
}