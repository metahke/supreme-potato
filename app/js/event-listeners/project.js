import {ELEMENTS} from "../elements/elements.js";
import {
    createProjectEntry,
    renderProjects
} from "../features/project.js";
import {
    deleteProject,
    getMaxProjectID,
    getProjectName,
    saveProjectData,
    setCurrentProjectID
} from "../data/appData.js";
import {listProjectInfoInDialog} from "../features/project-dialog.js";
import {clearProjectsData} from "../data/localStorage.js";
import {openDialog, valueNotEmpty} from "../helpers/helpers.js";

export const handleProjectElementClick = () => {

    ELEMENTS.projectsContainer.addEventListener("click", (e) => {

        if (e.target.classList.contains("project-delete")) {

            const projectID = e.target.closest(".project").dataset.projectId;

            deleteProject(projectID);
            return renderProjects();
        }

        if (e.target.classList.contains("project-rename")) {

            const projectID = e.target.closest(".project").dataset.projectId;

            setCurrentProjectID(projectID);

            ELEMENTS.itemName.value = getProjectName(projectID)
            ELEMENTS.renameDialog.dataset.itemType = "project";

            return openDialog(ELEMENTS.renameDialog);
        }

        if (e.target.classList.contains("project")) {

            const projectID = e.target.dataset.projectId;

            setCurrentProjectID(projectID);
            openDialog(ELEMENTS.projectDialog);
            listProjectInfoInDialog();
        }
    });
}

export const handleDeleteProjectsDataButtonClick = () => {

    ELEMENTS.deleteProjectsData.addEventListener("click", clearProjectsData);
}

export const handleAddProjectFormSubmit = () => {

    ELEMENTS.addProjectForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const projectName = new FormData(ELEMENTS.addProjectForm).get("project-name");

        if (valueNotEmpty(projectName)) {

            const projectID = getMaxProjectID();

            const projectData = createProjectEntry(projectName);
            saveProjectData(projectID, projectData);

            renderProjects();
            ELEMENTS.addProjectForm.reset();
        }
    });
}