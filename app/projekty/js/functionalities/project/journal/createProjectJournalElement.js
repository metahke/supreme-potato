export const createProjectJournalElement = (projectData) => {

    const {name, date} = projectData
    const element = document.createElement("blockquote");
    element.textContent = name;

    const quoteFooter = document.createElement("footer");
    quoteFooter.innerHTML = `<cite>${date}</cite>`;

    element.append(quoteFooter);

    return element;
}