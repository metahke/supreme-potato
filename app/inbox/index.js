const elements = {
    inboxItem: document.querySelector(".inbox-item"),
    inboxElements: document.querySelector(".inbox-elements"),
    inboxClose: document.querySelector(".inbox-close"),
    inboxTextarea: document.querySelector(".inbox-textarea"),

    editInboxButton: document.querySelector(".edit-inbox-button"),
}



let appData = {
    inbox: [],
    urgentAndImportant: [],
    urgentAndNotImportant: [],
    notUrgentAndImportant: [],
    notUrgentAndNotImportant: [],
    abyss: [],
};

const loadInboxData = () => {

    if (appData.inbox.length >= 1) {

        for (let line of appData.inbox) {

            document.querySelector(".inbox-elements").innerHTML += `<article><p>${line.replace("- ", "")}</p></article>`;
        }
    }

}

function loadDataFromLocalStorage() {

    if (localStorage.getItem("inboxData") === null) {

        return localStorage.setItem("inboxData", JSON.stringify(appData));
    }

    appData = JSON.parse(localStorage.getItem("inboxData"));


    loadInboxData();
}

loadDataFromLocalStorage();



function saveData() {
    console.log(localStorage.getItem("inboxData"));
    console.log(JSON.stringify(appData));

    localStorage.setItem("inboxData", JSON.stringify(appData));
}



elements.inboxItem.addEventListener("click", () => {
    elements.inboxItem.querySelector("dialog").setAttribute("open", "true");
})

elements.inboxClose.addEventListener("click", (e) => {
    e.stopPropagation();
    elements.inboxItem.querySelector("dialog").setAttribute("open", "false");
})

const editTasksButtonEventListener = () => {

    elements.editInboxButton.addEventListener("click", () => {

        if (elements.editInboxButton.dataset.editMode === "false") {
            elements.editInboxButton.dataset.editMode = "true";
            editTasksModeOn();
        } else {
            elements.editInboxButton.dataset.editMode = "false";
            editTasksModeOff();
        }

    });
}

editTasksButtonEventListener();

function editTasksModeOn() {

    const paragraphContent = document.querySelectorAll(".inbox-elements article");

    let texts = [...paragraphContent].map(article => {
        return `- ${article.textContent}`;
    })
    console.log(paragraphContent);
    console.log(texts);

    document.querySelector(".inbox-paragraph").innerHTML = `
        <textarea style="height: 300px" class="inbox-textarea"></textarea>
    `;

    if (paragraphContent.length >= 1) {
        document.querySelector(".inbox-textarea").textContent = texts.join("\n");
    }

    elements.editInboxButton.querySelector("span").textContent = "thumb_up";
}

function editTasksModeOff() {

    const textAreaContent = document.querySelector(".inbox-textarea").value.split("\n");

    document.querySelector(".inbox-paragraph").innerHTML = null;
    document.querySelector(".inbox-elements").innerHTML = null;

    appData.inbox = [];

    for (let line of textAreaContent) {
        if (line !== "") {

            appData.inbox.push(line);

            document.querySelector(".inbox-paragraph").innerHTML += `<article><p>${line.replace("- ", "")}</p></article>`;
        }
    }


    /*document.querySelector(".inbox-paragraph").innerHTML = textAreaContent;*/

    elements.editInboxButton.querySelector("span").textContent = "edit";

    saveData();
}