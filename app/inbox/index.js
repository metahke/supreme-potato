const elements = {
    inboxItem: document.querySelector(".inbox-item"),
    inboxElements: document.querySelector(".inbox-elements"),
    inboxClose: document.querySelector(".inbox-close"),
    inboxTextarea: document.querySelector(".inbox-textarea"),

    editInboxButton: document.querySelector(".edit-inbox-button"),
}

const loadInboxData = () => {

}

const data = {
    inbox: []
};

function loadDataFromLocalStorage() {

    if (localStorage.getItem("inboxData") !== null) {

        const textAreaContent = JSON.parse(localStorage.getItem("inboxData"));

        for (let line of textAreaContent) {
            if (line !== "") {
                document.querySelector(".inbox-paragraph").innerHTML += `<article><p>${line.replace("- ", "")}</p></article>`;

            }
        }
    }
}

loadDataFromLocalStorage();


function saveData(elements) {
    localStorage.setItem("inboxData", JSON.stringify(elements));
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

    const paragraphContent = document.querySelectorAll(".inbox-paragraph article");

    let texts = [...paragraphContent].map(article => {
        return `- ${article.textContent}`;
    })

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

    for (let line of textAreaContent) {
        if (line !== "") {
            document.querySelector(".inbox-paragraph").innerHTML += `<article><p>${line.replace("- ", "")}</p></article>`;
        }
    }


    /*document.querySelector(".inbox-paragraph").innerHTML = textAreaContent;*/

    elements.editInboxButton.querySelector("span").textContent = "edit";
    console.log(textAreaContent)
    saveData(textAreaContent);
}