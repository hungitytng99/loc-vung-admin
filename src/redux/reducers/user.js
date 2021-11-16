import { REQUEST_STATE } from 'app-configs';
import Cookies from 'js-cookie';
import { login_fail } from 'redux/actions/user';
import { login } from 'redux/actions/user';
import { logout } from 'redux/actions/user';
import { login_success } from 'redux/actions/user';

const defaultState = {
    profile: null,
    authState: null,
};

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case login().type: {
            return {
                ...state,
                authState: REQUEST_STATE.REQUEST,
            };
        }
        case login_success().type: {
            return {
                ...state,
                authState: REQUEST_STATE.SUCCESS,
                profile: action.payload,
            };
        }
        case login_fail().type: {
            return {
                ...state,
                authState: REQUEST_STATE.ERROR,
            };
        }
        case logout().type: {
            Cookies.remove('token');
            return {
                profile: null,
            };
        }
        default:
            return state;
    }
}
