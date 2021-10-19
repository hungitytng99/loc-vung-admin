export const actionTypes = {
    SET_CURRENT_PROJECT: 'SET_CURRENT_PROJECT',
};

export function setCurrentProject(currentProject) {
    return {
        type: actionTypes.SET_CURRENT_PROJECT,
        payload: currentProject,
    };
}
