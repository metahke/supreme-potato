export const clearProjectsData = () => {
    localStorage.removeItem("appData");
    location.reload();
}