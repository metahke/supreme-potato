import {elements} from "../../elements.js";
import {appData} from "../../index.js";

export const addProjectJournalElement = (id) => {

    const projectID = elements.taskDialog.dataset.projectId;
    const { name, date} = appData.projects[projectID].journals[id];
    console.log(name, date)
    const element = document.createElement("blockquote");
    element.textContent = name;

    const quoteFooter = document.createElement("footer");
    quoteFooter.innerHTML = `<cite>${date}</cite>`;

    element.append(quoteFooter);


    elements.journalsContainer.append(element);
}