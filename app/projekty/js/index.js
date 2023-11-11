import {loadProjectsFromLocalStorage} from "./functionalities/localStorage/loadProjectsFromLocalStorage.js";
import {addEventListeners} from "./functionalities/addEventListeners.js";


export let appData;

const initializeAppData = () => {

    appData = {
        inbox: {},
        maxProjectID: 0,
        projects: {}
    }
}

const loadDataFromLocalStorage = () => {

    localStorage.getItem("appData") === null
        ? initializeAppData()
        : appData = JSON.parse(localStorage.getItem("appData"));
}


function initializeFunctionalities() {

    loadDataFromLocalStorage();
    loadProjectsFromLocalStorage();

    addEventListeners();
}

initializeFunctionalities();

