import {handleDeleteProjectsDataButtonClick} from "./handleDeleteProjectsDataButtonClick.js";
import {handleAddProjectFormSubmit} from "./handleAddProjectFormSubmit.js";
import {handleProjectElementClick} from "./handleProjectElementClick.js";
import {handleDialogCloseButtonClick} from "./handleDialogCloseButtonClick.js";
import {handleAddProjectTaskFormSubmit} from "./handleAddProjectTaskFormSubmit.js";
import {switchProjectTaskTabsListener} from "./switchProjectTaskTabsListener.js";
import {handleAddProjectJournalFormSubmit} from "./handleAddProjectJournalFormSubmit.js";

export const addEventListeners = () => {

    handleDeleteProjectsDataButtonClick();

    handleProjectElementClick();

    handleDialogCloseButtonClick();

    handleAddProjectFormSubmit();
        handleAddProjectTaskFormSubmit();
        handleAddProjectJournalFormSubmit();

    switchProjectTaskTabsListener();
}