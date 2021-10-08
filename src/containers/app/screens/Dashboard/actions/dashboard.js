export const dashboardActions = {
    GET_KANBAN_BOARD: 'GET_KANBAN_BOARD',
};

export function get_kanban_board(payload) {
    return {
        type: kanbanActions.GET_KANBAN_BOARD,
        payload: payload,
    };
}