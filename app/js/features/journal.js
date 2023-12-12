import {ELEMENTS} from "../elements/elements.js";
import {getCurrentProjectID, getProjectData} from "../data/appData.js";
import {addHTMLElement} from "../helpers/helpers.js";

export const createProjectJournalElement = (journalID, journalData) => {

    const {name, date} = journalData;

    const element = document.createElement("article");
    element.classList.add("journal", "flex", "between");

    element.dataset.journalId = journalID;
    const blockquote = document.createElement("blockquote");
    blockquote.textContent = name;

    const quoteFooter = document.createElement("footer");
    quoteFooter.innerHTML = `<cite>${date}</cite>`;
    blockquote.append(quoteFooter);

    const details = document.createElement("details");
    details.classList.add("dropdown", "journal-action");

    details.innerHTML = `
        <summary>Akcja</summary>
        <ul>
            <li class="journal-rename">Zmień nazwę</li>
            <li class="journal-delete">Usuń</li>
        </ul>    
    `

    element.append(blockquote);
    element.append(details);

    return element;
}

export const createProjectJournalEntry = (value) => {

    const userDate = new Date();
    const date = userDate.toLocaleDateString().replaceAll(".", "-");
    const time = userDate.toLocaleTimeString();

    return {
        name: value,
        date: `${date} ${time}`
    }
}

export const renderJournals = () => {

    ELEMENTS.journalsContainer.innerHTML = null;

    const projectID = getCurrentProjectID();
    const projectData = getProjectData(projectID);
    const {journals} = projectData;

    for (const journalID in journals) {

        const journalData = journals[journalID];
        const journalElement = createProjectJournalElement(journalID, journalData);

        addHTMLElement(ELEMENTS.journalsContainer, journalElement);
    }
}