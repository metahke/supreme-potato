import {elements} from "../elements.js";
import {appData} from "../index.js";

export const loadJournalElements = (e) => {

    const projectID = e.target.closest("dialog").dataset.taskId;
    elements.thoughtsLogContainer.innerHTML = "";

    appData.projects[projectID]["log"].forEach(log => {

        const [time, content] = log;

        const element = document.createElement("blockquote");

        element.textContent = content;

        const quoteFooter = document.createElement("footer");
        quoteFooter.innerHTML = `<cite>${time}</cite>`;

        element.append(quoteFooter);
        elements.thoughtsLogContainer.append(element);
    })

}