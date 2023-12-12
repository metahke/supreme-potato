import {ELEMENTS} from "../elements/elements.js";
import {closeDialog} from "../helpers/helpers.js";
import {
    getCurrentProjectID,
    updateProjectJournalName,
    updateProjectName,
    updateProjectTaskName
} from "../data/appData.js";
import {renderProjects} from "../features/project.js";
import {renderTasks} from "../features/task.js";
import {renderJournals} from "../features/journal.js";

export const handleCancelRenameButtonClick = () => {

    ELEMENTS.cancelRename.addEventListener("click", () => {

        ELEMENTS.renameDialog.removeAttribute("data-item-type");
        closeDialog(ELEMENTS.renameDialog);
    });
}

export const handleConfirmRenameButtonClick = () => {

    ELEMENTS.confirmRename.addEventListener("click", () => {

        const itemName = ELEMENTS.itemName.value;
        const itemType = ELEMENTS.renameDialog.dataset.itemType;
        const projectID = getCurrentProjectID();

        if (itemName === "") return;

        switch (itemType) {
            case "project":
                updateProjectName(projectID, itemName);
                renderProjects();
                break;

            case "task":
                const taskID = ELEMENTS.renameDialog.dataset.taskId;
                updateProjectTaskName(projectID, taskID, itemName);
                ELEMENTS.renameDialog.removeAttribute("data-task-id");
                renderTasks();
                break;

            case "journal":
                const journalID = ELEMENTS.renameDialog.dataset.journalId;
                updateProjectJournalName(projectID, journalID, itemName);
                ELEMENTS.renameDialog.removeAttribute("data-journal-id");
                renderJournals();
                break;
        }

        ELEMENTS.renameDialog.removeAttribute("data-item-type");
        closeDialog(ELEMENTS.renameDialog);
    })
}