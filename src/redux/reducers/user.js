import { REQUEST_STATE } from 'app-configs';
import Cookies from 'js-cookie';
import { LOGIN_FAIL } from 'redux/actions/user';
import { LOGIN } from 'redux/actions/user';
import { LOGOUT } from 'redux/actions/user';
import { LOGIN_SUCCESS } from 'redux/actions/user';

const defaultState = {
    profile: null,
    isRequestAuth: null,
    errorMessageKey: '',
};

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case LOGIN().type: {
            if (action.payload.remember && action.payload.email) {
                localStorage.setItem('rememberUser', JSON.stringify(action.payload));
            } else if (localStorage.getItem('rememberUser') !== null) {
                localStorage.removeItem('rememberUser');
            }
            return {
                ...state,
                authState: REQUEST_STATE.REQUEST,
            };
        }
        case LOGIN_SUCCESS().type: {
            return {
                ...state,
                authState: REQUEST_STATE.SUCCESS,
                profile: action.payload,
            };
        }
        case LOGIN_FAIL().type: {
            return {
                ...state,
                authState: REQUEST_STATE.ERROR,
                errorMessageKey: action.payload,
            };
        }
        case LOGOUT().type: {
            const { byUser } = action.payload;
            if (byUser) {
                Cookies.remove('token');
            }
            return {
                profile: null,
            };
        }
        default:
            return state;
    }
}
