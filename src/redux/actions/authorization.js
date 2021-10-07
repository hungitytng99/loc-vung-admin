export const actionTypes = {
    GET_USERS_IN_PROJECT: 'GET_USERS_IN_PROJECT',
};

export function getUserInProject(payload) {
    return {
        type: actionTypes.GET_USERS_IN_PROJECT,
        payload,
    };
}
