const elements = {
    lists: document.querySelectorAll(".list-element"),
    list: {
      button: {
          close: document.querySelector(".list-close"),
      },
        items: document.querySelector(".list-elements"),
      listContainer: document.querySelector(".list-container")
    },
    inboxItem: document.querySelector(".inbox-item"),
    addToInboxButton: document.querySelector(".add-to-inbox-button"),
    addToInboxInputField: document.querySelector(".add-inbox-input-field"),
    editListButton: document.querySelector(".edit-list-button"),
    unclutterInbox: {
        openButton: document.querySelector(".unclutter-inbox-open-button"),
        closeButton: document.querySelector(".unclutter-inbox-close-button"),
        container: document.querySelector(".unclutter-inbox-container"),
        randomItemContainer: document.querySelector(".random-item-container"),
        moveItemButtonsGroup: document.querySelector(".move-item-buttons-group"),
    }
}


let appData = {
    inbox: [],
    top10: [],
    mid29: [],
    abyss: []
};



function loadDataFromLocalStorage() {

    if (localStorage.getItem("appData") === null) {

        return localStorage.setItem("appData", JSON.stringify(appData));
    }

    appData = JSON.parse(localStorage.getItem("appData"));
}

const saveData = () => {

    localStorage.setItem("appData", JSON.stringify(appData));
}





function addToInboxListener() {

    elements.addToInboxButton.addEventListener("click", () => {

        const inputValue = elements.addToInboxInputField.value;

        if (inputValue !== "") {

            appData.inbox.push(inputValue);
            elements.addToInboxInputField.value = null;
            saveData();
        }
    })
}


const editTasksModeOn = () => {

    const paragraphsContent = elements.list.items.querySelectorAll("article");

    let texts = [...paragraphsContent].map(article => {
        return `- ${article.textContent}`;
    })

    document.querySelector(".list-textarea-container").innerHTML = `
        <textarea style="height: 300px" class="list-textarea"></textarea>
    `;

    if (paragraphsContent.length > 0) {
        document.querySelector(".list-textarea").textContent = texts.join("\n");
    }

    elements.list.items.innerHTML = null;

    elements.editListButton.querySelector("span").textContent = "thumb_up";
}

const editTasksModeOff = () => {

    const textAreaContent = document.querySelector(".list-textarea").value.split("\n");

    document.querySelector(".list-textarea-container").innerHTML = null;
    document.querySelector(".list-elements").innerHTML = null;

    console.log(elements.list.listContainer.dataset.list)
    if (elements.list.listContainer.dataset.list) {

        appData[elements.list.listContainer.dataset.list] = [];

        for (let line of textAreaContent) {
            if (line !== "") {

                appData[elements.list.listContainer.dataset.list].push(line.replace("- ", ""));

                document.querySelector(".list-elements").innerHTML += `<article><p>${line.replace("- ", "")}</p></article>`;
            }
        }
    }

    elements.editListButton.querySelector("span").textContent = "edit";
    saveData();
}


const editTasksButtonEventListener = () => {

    elements.editListButton.addEventListener("click", () => {

        if (elements.editListButton.dataset.editMode === "false") {
            elements.editListButton.dataset.editMode = "true";
            editTasksModeOn();
        } else {
            elements.editListButton.dataset.editMode = "false";
            editTasksModeOff();
        }

    });
}




const addOpenListsFunctionalities = () => {

    elements.lists.forEach(list => {

        list.addEventListener("click", () => {

            elements.list.listContainer.open = "true";

            if (appData[list.dataset.list]) {

                elements.list.listContainer.dataset.list = list.dataset.list;

                appData[list.dataset.list].forEach(item => {

                    elements.list.items.innerHTML += `<article><p>${item}</p></article>`;
                })
            }
        });
    });
}

const addListDialogFunctionalities = () => {

    elements.list.button.close.addEventListener("click", (e) => {

        e.target.closest("dialog").setAttribute("open", "false");
        elements.list.items.innerHTML = "";
    });
}







const unclutterInboxOpenButtonListener = () => {

    elements.unclutterInbox.openButton.addEventListener("click", () => {

        elements.unclutterInbox.container.querySelector("dialog").setAttribute("open", "true");

        unclutterInboxGetRandomItem();
    });
}

const unclutterInboxCloseButtonListener = () => {

    elements.unclutterInbox.closeButton.addEventListener("click", (e) => {

        e.target.closest("dialog").removeAttribute("open");
    });
}

const unclutterInboxGetRandomItem = () => {

    const length = appData.inbox.length - 1;
    const randomItem = appData.inbox[Math.round(Math.random() * length)];

    if (randomItem !== undefined) {
        elements.unclutterInbox.randomItemContainer.innerHTML = `<article><p>${randomItem}</p></article>`;
    } else {
        elements.unclutterInbox.randomItemContainer.innerHTML = `<article><p>Inbox jest pusty! :)</p></article>`;
    }
}

function runUnclutterInboxFunctionalities() {

    unclutterInboxOpenButtonListener();
    unclutterInboxCloseButtonListener();
    unclutterInboxGetRandomItem();


    elements.unclutterInbox.moveItemButtonsGroup.addEventListener("click", (e) => {

        const randomItem = elements.unclutterInbox.randomItemContainer.querySelector("p").textContent;

        if (!appData.inbox.includes(randomItem)) {
            return;
        }

        appData[e.target.dataset.list].push(randomItem);

        const inboxCopy = [...appData.inbox];

        appData.inbox = inboxCopy.filter(item => item !== randomItem);
        console.log(appData.inbox)
        unclutterInboxGetRandomItem();
        saveData();
    });
}




(function initializeFunctionalities() {
    loadDataFromLocalStorage();
    addToInboxListener();
    addOpenListsFunctionalities();
    addListDialogFunctionalities();
    editTasksButtonEventListener();

    runUnclutterInboxFunctionalities();
})();