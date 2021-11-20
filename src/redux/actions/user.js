export function LOGIN(payload) {
    return {
        type: 'LOGIN',
        payload,
    };
}

export function LOGIN_SUCCESS(payload) {
    return {
        type: 'LOGIN_SUCCESS',
        payload,
    };
}

export function LOGIN_FAIL(payload) {
    return {
        type: 'LOGIN_FAIL',
        payload,
    };
}

export function LOGOUT(payload) {
    return {
        type: 'LOGOUT',
        payload,
    };
}
