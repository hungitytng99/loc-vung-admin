import { actionTypes } from './action';

const defaultState = {
    status: '',
    data: null,
    error: null,
    isLoginRequesting: false,
    isRegisterRequesting: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN: {
            return {
                ...state,
                isLoginRequesting: true,
            };
        }
        case actionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isLoginRequesting: false,
            };
        }
        case actionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                isLoginRequesting: false,
            };
        }
        case actionTypes.REGISTER: {
            return {
                ...state,
                isRegisterRequesting: true,
            };
        }
        case actionTypes.REGISTER_SUCCESS: {
            return {
                ...state,
                isRegisterRequesting: false,
            };
        }
        case actionTypes.REGISTER_FAILURE: {
            return {
                ...state,
                isRegisterRequesting: false,
            };
        }
        default:
            return state;
    }
};
