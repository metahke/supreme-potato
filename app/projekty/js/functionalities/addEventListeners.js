import {deleteProjectsDataListener} from "./eventListeners/deleteProjectsDataListener.js";
import {addProjectListener} from "./eventListeners/addProjectListener.js";
import {openAndListProjectInfoListener} from "./eventListeners/openAndListProjectInfoListener.js";
import {closeDialogListener} from "./eventListeners/closeDialogListener.js";
import {addProjectTaskListener} from "./eventListeners/addProjectTaskListener.js";
import {switchProjectTaskTabsListener} from "./eventListeners/switchProjectTaskTabsListener.js";
import {addProjectJournalListener} from "./eventListeners/addProjectJournalListener.js";

export const addEventListeners = () => {

    deleteProjectsDataListener();
    addProjectListener();
    openAndListProjectInfoListener();
    closeDialogListener();
    addProjectTaskListener();
    addProjectJournalListener();
    switchProjectTaskTabsListener();

}