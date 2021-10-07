export const kanbanActions = {
    GET_KANBAN_BOARD: 'GET_KANBAN_BOARD',
    GET_KANBAN_BOARD_REQUEST: 'GET_KANBAN_BOARD_REQUEST',
    GET_KANBAN_BOARD_SUCCESS: 'GET_KANBAN_BOARD_SUCCESS',
    GET_KANBAN_BOARD_FAILURE: 'GET_KANBAN_BOARD_FAILURE',
    RESET_KANBAN_BOARD: 'RESET_KANBAN_BOARD',

    UPDATE_KANBAN_BOARD: 'UPDATE_KANBAN_BOARD',
    UPDATE_KANBAN_BOARD_SUCCESS: 'UPDATE_KANBAN_BOARD_SUCCESS',
    UPDATE_KANBAN_BOARD_FAILURE: 'UPDATE_KANBAN_BOARD_FAILURE',

    ADD_TASK_KANBAN: 'ADD_TASK_KANBAN',
    ADD_TASK_KANBAN_SUCCESS: 'ADD_TASK_KANBAN_SUCCESS',

    GET_FILTER_KANBAN: 'GET_FILTER_KANBAN',
    UPDATE_FILTER_KANBAN: 'UPDATE_FILTER_KANBAN',

    GET_LIST_PHASES: 'GET_LIST_PHASES',
    GET_LIST_PHASE_SUCCESS: ' GET_LIST_PHASE_SUCCESS',
    GET_LIST_PHASES_FAILURE: ' GET_LIST_PHASES_FAILURE',

    GET_CURRENT_PHASE: 'GET_CURRENT_PHASE',
    UPDATE_CURRENT_PHASE: 'UPDATE_CURRENT_PHASE',
    RESET_CURRENT_PHASE: 'RESET_CURRENT_PHASE',

    GET_LIST_TASK: 'GET_LIST_TASK',
    GET_LIST_TASK_SUCCESS: 'GET_LIST_TASK_SUCCESS',
    GET_LIST_TASK_FAILURE: 'GET_LIST_TASK_FAILURE',

    GET_LIST_STATUS: 'GET_LIST_STATUS',
    GET_LIST_STATUS_SUCCESS: 'GET_LIST_STATUS_SUCCESS',
    GET_LIST_STATUS_FAILURE: 'GET_LIST_STATUS_FAILURE',

    GET_PROJECT_DETAIL: 'GET_PROJECT_DETAIL',
    GET_PROJECT_DETAIL_SUCCESS: 'GET_PROJECT_DETAIL_SUCCESS',
    GET_PROJECT_DETAIL_FAILURE: 'GET_PROJECT_DETAIL_FAILURE',

    UPDATE_FIELD_TASK: 'UPDATE_FIELD_TASK',
    UPDATE_FIELD_STATUS: 'UPDATE_FIELD_STATUS',
    SAVE_FIELD_POSITION: 'SAVE_FIELD_POSITION',
    SAVE_STATUS_POSITION: 'SAVE_STATUS_POSITION',

    SAVE_KANBAN_DETAIL: 'SAVE_KANBAN_DETAIL',
    UPDATE_FILTER_KANBAN_DETAIL: 'UPDATE_FILTER_KANBAN_DETAIL',
    UPDATE_LIST_FILTER_TASK: 'UPDATE_LIST_FILTER_TASK',
};

export function get_kanban_board(payload) {
    return {
        type: kanbanActions.GET_KANBAN_BOARD,
        payload: payload,
    };
}
export function get_kanban_board_request(payload) {
    return {
        type: kanbanActions.GET_KANBAN_BOARD_REQUEST,
        payload: payload,
    };
}
export function get_kanban_success() {
    return {
        type: kanbanActions.GET_KANBAN_BOARD_SUCCESS,
    };
}
export function get_kanban_failure() {
    return {
        type: kanbanActions.GET_KANBAN_BOARD_FAILURE,
    };
}
export function reset_kanban_board(payload) {
    return {
        type: kanbanActions.RESET_KANBAN_BOARD,
        payload: payload,
    };
}

export function update_kanban_board(payload) {
    return {
        type: kanbanActions.UPDATE_KANBAN_BOARD,
        payload: payload,
    };
}
export function update_kanban_success(payload) {
    return {
        type: kanbanActions.UPDATE_KANBAN_BOARD_SUCCESS,
        payload: payload,
    };
}
export function update_kanban_failure() {
    return {
        type: kanbanActions.UPDATE_KANBAN_BOARD_FAILURE,
    };
}

export function add_task_kanban(payload) {
    return {
        type: kanbanActions.ADD_TASK_KANBAN,
        payload: payload,
    };
}
export function add_task_kanban_success(payload) {
    return {
        type: kanbanActions.ADD_TASK_KANBAN_SUCCESS,
        payload: payload,
    };
}

export function get_filter_kanban(payload) {
    return {
        type: kanbanActions.GET_FILTER_KANBAN,
        payload: payload,
    };
}
export function update_filter_kanban(payload) {
    return {
        type: kanbanActions.UPDATE_FILTER_KANBAN,
        payload: payload,
    };
}

export function get_list_phases(payload) {
    return {
        type: kanbanActions.GET_LIST_PHASES,
        payload: payload,
    };
}
export function get_list_phases_success(payload) {
    return {
        type: kanbanActions.GET_LIST_PHASE_SUCCESS,
        payload: payload,
    };
}
export function get_list_phases_failure(payload) {
    return {
        type: kanbanActions.GET_LIST_PHASES_FAILURE,
        payload: payload,
    };
}

export function get_current_phase(payload) {
    return {
        type: kanbanActions.GET_CURRENT_PHASE,
        payload: payload,
    };
}
export function update_current_phase(payload) {
    return {
        type: kanbanActions.UPDATE_CURRENT_PHASE,
        payload: payload,
    };
}
export function reset_current_phase(payload) {
    return {
        type: kanbanActions.RESET_CURRENT_PHASE,
        payload: payload,
    };
}

export function get_list_task(payload) {
    return {
        type: kanbanActions.GET_LIST_TASK,
        payload: payload,
    };
}
export function get_list_task_success(payload) {
    return {
        type: kanbanActions.GET_LIST_TASK_SUCCESS,
        payload: payload,
    };
}
export function get_list_task_failure(payload) {
    return {
        type: kanbanActions.GET_LIST_TASK_FAILURE,
        payload: payload,
    };
}

export function get_list_status(payload) {
    return {
        type: kanbanActions.GET_LIST_STATUS,
        payload: payload,
    };
}
export function get_list_status_success(payload) {
    return {
        type: kanbanActions.GET_LIST_STATUS_SUCCESS,
        payload: payload,
    };
}
export function get_list_status_failure(payload) {
    return {
        type: kanbanActions.GET_LIST_STATUS_FAILURE,
        payload: payload,
    };
}

export function get_project_detail(payload) {
    return {
        type: kanbanActions.GET_PROJECT_DETAIL,
        payload: payload,
    };
}
export function get_project_detail_success(payload) {
    return {
        type: kanbanActions.GET_PROJECT_DETAIL_SUCCESS,
        payload: payload,
    };
}
export function get_project_detail_failure(payload) {
    return {
        type: kanbanActions.GET_PROJECT_DETAIL_FAILURE,
        payload: payload,
    };
}

export function update_field_task(payload) {
    return {
        type: kanbanActions.UPDATE_FIELD_TASK,
        payload: payload,
    };
}
export function update_field_status(payload) {
    return {
        type: kanbanActions.UPDATE_FIELD_STATUS,
        payload: payload,
    };
}
export function save_field_position(payload) {
    return {
        type: kanbanActions.SAVE_FIELD_POSITION,
        payload: payload,
    };
}

export function save_status_position(payload) {
    return {
        type: kanbanActions.SAVE_STATUS_POSITION,
        payload: payload,
    };
}

export function save_kanban_detail(payload) {
    return {
        type: kanbanActions.SAVE_KANBAN_DETAIL,
        payload: payload,
    };
}

export function update_filter_kanban_detail(payload) {
    return {
        type: kanbanActions.UPDATE_FILTER_KANBAN_DETAIL,
        payload: payload,
    };
}

export function update_list_filter_task(payload) {
    return {
        type: kanbanActions.UPDATE_LIST_FILTER_TASK,
        payload: payload,
    };
}
