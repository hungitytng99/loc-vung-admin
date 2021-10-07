export const actionTypes = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    REGISTER: 'REGISTER',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',
};

export function login(password, username) {
    return {
        type: actionTypes.LOGIN,
        username,
        password,
    };
}

export function loginSuccess(data) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: data,
    };
}

export function loginFailure() {
    return {
        type: actionTypes.LOGIN_FAILURE,
    };
}

export function register(data) {
    return {
        type: actionTypes.REGISTER,
        data,
    };
}

export function registerSuccess(data) {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        payload: data,
    };
}

export function registerFailure() {
    return {
        type: actionTypes.REGISTER_FAILURE,
    };
}
