export const ELEMENTS = {

    addProjectForm: document.querySelector("#add-project-form"),
    addProjectTaskForm: document.querySelector("#add-project-task-form"),
    addProjectJournalForm: document.querySelector("#add-project-journal-form"),

    deleteProjectsData: document.querySelector("#delete-projects-data"),

    projectsContainer: document.querySelector("#projects"),
    projectDataContainer: document.querySelector(".project-data-container"),

    projectDialog: document.querySelector("#project-dialog"),
        projectDialogName: document.querySelector(".project-title"),
        projectDialogCloseButton: document.querySelector("#project-dialog-close"),
        tasksContainer: document.querySelector(".tasks-container"),
        journalsContainer: document.querySelector(".journals-container"),
        projectDialogTabs: document.querySelector(".project-dialog-tabs"),
        tasksTab: document.querySelector(".tasks-tab"),
        journalsTab: document.querySelector(".journals-tab"),

    renameDialog: document.querySelector("#rename-dialog"),
        itemName: document.querySelector("#item-name"),
        confirmRename: document.querySelector("#confirm-rename"),
        cancelRename: document.querySelector("#cancel-rename"),
}