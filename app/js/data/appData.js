import {updateAppData} from "./localStorage.js";

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

export const incrementMaxProjectTaskID = (projectID) => {
    appData.projects[projectID].maxTaskID++;
}

export const getMaxProjectTaskID = (projectID) => {
    return appData.projects[projectID].maxTaskID;
}

export const incrementMaxProjectJournalID = (projectID) => {
    appData.projects[projectID].maxJournalID++;
}

export const getMaxProjectJournalID = (projectID) => {
    return appData.projects[projectID].maxJournalID;
}

export const getProjectData = (id) => {
    return appData.projects[id];
}

export const getProjectName = (id) => {
    return appData.projects[id].name;
}

export const getProjectTaskName = (projectID, taskID) => {
    return appData.projects[projectID].tasks[taskID].name;
}

export const deleteProject = (projectID) => {
    delete appData.projects[projectID];
    updateAppData(appData);
}

export const deleteProjectTask = (projectID, taskID) => {
    delete appData.projects[projectID].tasks[taskID];
    updateAppData(appData);
}

export const deleteProjectJournal = (projectID, journalID) => {
    delete appData.projects[projectID].journals[journalID];
    updateAppData(appData);
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
    updateAppData(appData);
}

export const saveProjectTaskData = (projectID, taskID, taskData) => {

    appData.projects[projectID].tasks[taskID] = taskData;
    incrementMaxProjectTaskID(projectID);
    updateAppData(appData);
}

export const saveProjectJournalData = (projectID, journalID, journalData) => {

    appData.projects[projectID].journals[journalID] = journalData;
    incrementMaxProjectJournalID(projectID);
    updateAppData(appData);
}