let appData = {
    inbox: {},
    currentProjectID: -1,
    maxProjectID: 0,
    projects: {}
}

export const loadAppDataFromLocalStorage = () => {

    if (localStorage.getItem("appData") !== null)
        appData = JSON.parse(localStorage.getItem("appData"));
}

export const incrementMaxProjectID = () => {
    appData.maxProjectID++;
}

export const getMaxProjectID = () => {
    return appData.maxProjectID;
}

export const getProjectData = (id) => {
    return appData.projects[id];
}

export const getProjectsData = () => {
    return appData.projects;
}

export const setCurrentProjectID = (projectID) => {
    appData.currentProjectID = projectID;
}

export const getCurrentProjectID = () => {
    return appData.currentProjectID;
}

export const saveProjectData = (id, data) => {

    appData.projects[id] = data;
    incrementMaxProjectID();
    localStorage.setItem("appData", JSON.stringify(appData));
}