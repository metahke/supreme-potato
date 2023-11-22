export const saveDataToLocalStorage = () => {

    localStorage.setItem("appData", JSON.stringify(appData));
}