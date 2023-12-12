import {loadAppDataFromLocalStorage} from "./data/appData.js";
import {
    handleAddProjectFormSubmit,
    handleDeleteProjectsDataButtonClick,
    handleProjectElementClick
} from "./event-listeners/project.js";
import {handleAddProjectTaskFormSubmit, handleProjectTaskElementClick} from "./event-listeners/task.js";
import {handleAddProjectJournalFormSubmit, handleProjectJournalClick} from "./event-listeners/journal.js";
import {handleDialogCloseButtonClick, switchProjectTaskTabsListener} from "./event-listeners/project-dialog.js";
import {handleMouseRightClick} from "../../functionalities-playground/document.js";
import {renderProjects} from "./features/project.js";
import {handleCancelRenameButtonClick, handleConfirmRenameButtonClick} from "./event-listeners/rename-dialog.js";

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


    handleConfirmRenameButtonClick();
    handleCancelRenameButtonClick();
}

function initializeFunctionalities() {

    loadAppDataFromLocalStorage();
    renderProjects();
    addEventListeners();
}

initializeFunctionalities();

