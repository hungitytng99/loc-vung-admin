export function update_notify_error(payload) {
    return {
        type: 'UPDATE_NOTIFY_ERROR',
        payload,
    };
}

export function update_notify_success(payload) {
    return {
        type: 'UPDATE_NOTIFY_SUCCESS',
        payload,
    };
}
