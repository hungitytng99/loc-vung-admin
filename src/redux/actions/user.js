export function login(payload) {
    return {
        type: 'LOGIN',
        payload,
    };
}

export function login_success(payload) {
    return {
        type: 'LOGIN_SUCCESS',
        payload,
    };
}

export function login_fail(payload) {
    return {
        type: 'LOGIN_FAIL',
        payload,
    };
}

export function logout(payload) {
    return {
        type: 'LOGOUT',
        payload,
    };
}
