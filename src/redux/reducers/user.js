import Cookies from 'js-cookie';
import { logout } from 'redux/actions/user';
import { login_success } from 'redux/actions/user';

const defaultState = {
    profile: null,
};

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case login_success().type: {
            return {
                ...state,
                profile: action.payload,
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
