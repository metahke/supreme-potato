import {appData} from "../../index.js";

export const saveDataToLocalStorage = () => {

    localStorage.setItem("appData", JSON.stringify(appData));
}