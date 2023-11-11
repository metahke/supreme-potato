import {elements} from "../elements.js";
import {saveDataToLocalStorage} from "./localStorage/saveDataToLocalStorage.js";
import {appData} from "../index.js";

export const addJournalElement = (e) => {

    const content = elements.logInputField.value;

    if (content === "") return;


    const element = document.createElement("blockquote");

    element.textContent = content;

    const userDate = new Date();
    const quoteFooter = document.createElement("footer");
    const date = userDate.toLocaleDateString().replaceAll(".", "-");
    const time = userDate.toLocaleTimeString();
    quoteFooter.innerHTML = `<cite>${date} ${time}</cite>`;

    element.append(quoteFooter);
    elements.thoughtsLogContainer.append(element);
    elements.logInputField.value = "";




    const projectID = e.target.closest("dialog").dataset.taskId;
    const logArr = [`${date} ${time}`, content]

    appData.projects[projectID]["log"].push(logArr)
    saveDataToLocalStorage();
}