export const clearProjectsData = () => {
    localStorage.removeItem("appData");
    location.reload();
}

export const updateAppData = (appData) => {
    localStorage.setItem("appData", JSON.stringify(appData));
}