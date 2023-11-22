import {ELEMENTS} from "../../elements/ELEMENTS.js";
import {switchProjectTab} from "../other/switchProjectTab.js";

export const switchProjectTaskTabsListener = () => {

    ELEMENTS.taskTabs.addEventListener("click", (e) => {

        if (!e.target.hasAttribute("aria-current")) {

            switchProjectTab(e);
        }
    })
}