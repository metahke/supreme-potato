import {elements} from "../../elements.js";
import {switchProjectTab} from "../switchProjectTab.js";

export const switchProjectTaskTabsListener = () => {

    elements.taskTabs.addEventListener("click", (e) => {

        if (!e.target.hasAttribute("aria-current")) {

            switchProjectTab(e);
        }
    })
}