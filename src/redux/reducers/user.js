import { actionTypes } from '../actions/user';

const defaultState = {
    isAuthenticated: true,
    isAuthRequesting: false,
};
export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.AUTH: {
            return {
                ...state,
                isAuthRequesting: true,
            };
        }
        case actionTypes.AUTH_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                ...action.payload,
                isAuthRequesting: false,
            };
        }
        case actionTypes.AUTH_FAILURE: {
            return {
                ...state,
                isAuthenticated: false,
                isAuthRequesting: false,
            };
        }

        case actionTypes.LOGOUT: {
            return {
                ...state,
            };
        }
        case actionTypes.LOGOUT_SUCCESS: {
            return {
                ...state,
                isAuthenticated: false,
            };
        }
        case actionTypes.LOGOUT_FAILURE: {
            return {
                ...state,
            };
        }
        default:
            return state;
    }
};
