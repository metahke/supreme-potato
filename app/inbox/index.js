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





function addToInboxListener() {

    const addToInboxButton = document.querySelector(".add-to-inbox-button");
    const addToInboxInputField = document.querySelector(".add-inbox-input-field");

    addToInboxButton.addEventListener("click", () => {

        const inputValue = addToInboxInputField.value;

        if (inputValue !== "") {

            appData.inbox.push(inputValue);

            document.querySelector(".inbox-elements").innerHTML += `<article><p>${inputValue.replace("- ", "")}</p></article>`;

            addToInboxInputField.value = null;
            saveData();
        }
    })
}

addToInboxListener()





function cleanInbox() {

    const cleanInboxButton = document.querySelector(".clean-inbox-button");
    const cleanInboxContainer = document.querySelector(".clean-inbox-container");
    const closeCleanInboxDialogButton = document.querySelector(".clean-close");
    const closeInboxElement = document.querySelector(".close-inbox-element");


    cleanInboxButton.addEventListener("click", () => {

        cleanInboxContainer.querySelector("dialog").setAttribute("open", "true");

        const length = appData.inbox.length - 1;
        const randomItem = appData.inbox[Math.round(Math.random() * length)];

        closeInboxElement.innerHTML = `<article><p>${randomItem}</p></article>`
    });

    closeCleanInboxDialogButton.addEventListener("click", (e) => {
        e.target.closest("dialog").removeAttribute("open")
    })



}

cleanInbox()






















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

    document.querySelector(".inbox-textarea-container").innerHTML = `
        <textarea style="height: 300px" class="inbox-textarea"></textarea>
    `;

    if (paragraphContent.length >= 1) {
        document.querySelector(".inbox-textarea").textContent = texts.join("\n");
    }

    document.querySelector(".inbox-elements").innerHTML = null;

    elements.editInboxButton.querySelector("span").textContent = "thumb_up";
}

function editTasksModeOff() {

    const textAreaContent = document.querySelector(".inbox-textarea").value.split("\n");

    document.querySelector(".inbox-textarea-container").innerHTML = null;
    document.querySelector(".inbox-elements").innerHTML = null;

    appData.inbox = [];

    for (let line of textAreaContent) {
        if (line !== "") {

            appData.inbox.push(line);

            document.querySelector(".inbox-elements").innerHTML += `<article><p>${line.replace("- ", "")}</p></article>`;
        }
    }


    /*document.querySelector(".inbox-paragraph").innerHTML = textAreaContent;*/

    elements.editInboxButton.querySelector("span").textContent = "edit";

    saveData();
}