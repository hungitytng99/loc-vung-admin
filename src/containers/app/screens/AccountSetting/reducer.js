import { REQUEST_STATE } from 'app-configs';
import { combineReducers } from 'redux';
import {
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_FAIL,
    CHANGE_PASSWORD_SUCCESS,
    GET_DETAIL_PROFILE_INFORMATION,
    GET_DETAIL_PROFILE_INFORMATION_FAIL,
    GET_DETAIL_PROFILE_INFORMATION_SUCCESS,
    RESET_CHANGE_PASSWORD_STATE,
    RESET_GET_DETAIL_PROFILE_INFORMATION,
    RESET_UPDATE_PROFILE_INFORMATION,
    UPDATE_PROFILE_INFORMATION,
    UPDATE_PROFILE_INFORMATION_SUCCESS,
} from './actions/action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    update: (state = defaultState, action) => {
        switch (action.type) {
            case UPDATE_PROFILE_INFORMATION().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case UPDATE_PROFILE_INFORMATION_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                };
            }
            case RESET_UPDATE_PROFILE_INFORMATION().type: {
                return {
                    ...defaultState,
                };
            }
            default:
                return state;
        }
    },

    detail: (state = defaultState, action) => {
        switch (action.type) {
            case GET_DETAIL_PROFILE_INFORMATION().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case GET_DETAIL_PROFILE_INFORMATION_SUCCESS().type: {
                const { information } = action.payload;
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: information,
                };
            }
            case GET_DETAIL_PROFILE_INFORMATION_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case RESET_GET_DETAIL_PROFILE_INFORMATION().type: {
                return { ...defaultState };
            }
            default:
                return state;
        }
    },
    changePassword: (state = defaultState, action) => {
        switch (action.type) {
            case CHANGE_PASSWORD().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case CHANGE_PASSWORD_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                };
            }
            case CHANGE_PASSWORD_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case RESET_CHANGE_PASSWORD_STATE().type: {
                return { ...defaultState };
            }
            default:
                return state;
        }
    },
});
