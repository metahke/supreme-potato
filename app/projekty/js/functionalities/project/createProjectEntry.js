export const createProjectEntry = (value) => {

    return {
        name: value,
        maxTaskID: 0,
        maxJournalID: 0,
        tasks: {},
        journals: {}
    }
}