import {loadAppDataFromLocalStorage} from "./data/appData.js";
import {listProjects} from "./features/project.js";
import {
    handleAddProjectFormSubmit,
    handleDeleteProjectsDataButtonClick,
    handleProjectElementClick
} from "./eventlisteners/project.js";
import {handleAddProjectTaskFormSubmit, handleProjectTaskElementClick} from "./eventlisteners/task.js";
import {handleAddProjectJournalFormSubmit, handleProjectJournalClick} from "./eventlisteners/journal.js";
import {handleDialogCloseButtonClick, switchProjectTaskTabsListener} from "./eventlisteners/project-dialog.js";
import {handleMouseRightClick} from "./eventlisteners/document.js";

export const addEventListeners = () => {

    handleDeleteProjectsDataButtonClick();

    handleProjectElementClick();

    handleDialogCloseButtonClick();

    handleAddProjectFormSubmit();
    handleAddProjectTaskFormSubmit();
    handleAddProjectJournalFormSubmit();

    handleProjectTaskElementClick();
    handleProjectJournalClick();

    switchProjectTaskTabsListener();

    handleMouseRightClick();
}

function initializeFunctionalities() {

    loadAppDataFromLocalStorage();
    listProjects();
    addEventListeners();
}

initializeFunctionalities();

