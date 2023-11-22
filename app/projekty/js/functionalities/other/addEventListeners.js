import {handleDeleteProjectsDataButtonClick} from "../eventListeners/handleDeleteProjectsDataButtonClick.js";
import {handleAddProjectFormSubmit} from "../eventListeners/handleAddProjectFormSubmit.js";
import {handleProjectElementClick} from "../eventListeners/handleProjectElementClick.js";
import {handleDialogCloseButtonClick} from "../eventListeners/handleDialogCloseButtonClick.js";
import {handleAddProjectTaskFormSubmit} from "../eventListeners/handleAddProjectTaskFormSubmit.js";
import {switchProjectTaskTabsListener} from "../eventListeners/switchProjectTaskTabsListener.js";
import {handleAddProjectJournalFormSubmit} from "../eventListeners/handleAddProjectJournalFormSubmit.js";

export const addEventListeners = () => {

    handleDeleteProjectsDataButtonClick();

    handleProjectElementClick();

    handleDialogCloseButtonClick();


    handleAddProjectFormSubmit();
        handleAddProjectTaskFormSubmit();
        handleAddProjectJournalFormSubmit();

    switchProjectTaskTabsListener();
}