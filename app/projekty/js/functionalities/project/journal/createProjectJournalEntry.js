export const createProjectJournalEntry = (value) => {

    const userDate = new Date();
    const date = userDate.toLocaleDateString().replaceAll(".", "-");
    const time = userDate.toLocaleTimeString();

    return {
        name: value,
        date: `${date} ${time}`
    }
}