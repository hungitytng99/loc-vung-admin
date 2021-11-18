export function get_list_product(payload) {
    return {
        type: 'GET_LIST_PRODUCT',
        payload,
    };
}

export function get_list_product_success(payload) {
    return {
        type: 'GET_LIST_PRODUCT_SUCCESS',
        payload,
    };
}

export function reset_state_create_product(payload) {
    return {
        type: 'RESET_STATE_CREATE_PRODUCT',
        payload,
    };
}

export function create_product(payload) {
    return {
        type: 'CREATE_PRODUCT',
        payload,
    };
}

export function create_product_success(payload) {
    return {
        type: 'CREATE_PRODUCT_SUCCESS',
        payload,
    };
}

export function create_product_fail(payload) {
    return {
        type: 'CREATE_PRODUCT_FAIL',
        payload,
    };
}

export function get_product_by_id(payload) {
    return {
        type: 'GET_PRODUCT_BY_ID',
        payload,
    };
}

export function get_product_by_id_success(payload) {
    return {
        type: 'GET_PRODUCT_BY_ID_SUCCESS',
        payload,
    };
}

export function delete_product(payload) {
    return {
        type: 'DELETE_PRODUCT',
        payload,
    };
}

export function delete_product_success(payload) {
    return {
        type: 'DELETE_PRODUCT_SUCCESS',
        payload,
    };
}

export function update_product(payload) {
    return {
        type: 'UPDATE_PRODUCT',
        payload,
    };
}

export function update_product_success(payload) {
    return {
        type: 'UPDATE_PRODUCT_SUCCESS',
        payload,
    };
}
