import { REQUEST_STATE } from 'app-configs';
import { combineReducers } from 'redux';
import {
    CREATE_ORDER,
    CREATE_ORDER_SUCCESS,
    DELETE_ORDER,
    DELETE_ORDER_SUCCESS,
    GET_LIST_ORDER,
    GET_LIST_ORDER_SUCCESS,
    GET_ORDER_BY_ID_SUCCESS,
    UPDATE_ORDER,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_SUCCESS_STATE,
} from './actions/action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    create: (state = defaultState, action) => {
        switch (action.type) {
            case CREATE_ORDER().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case CREATE_ORDER_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                };
            }
            default:
                return state;
        }
    },
    list: (state = defaultState, action) => {
        switch (action.type) {
            case GET_LIST_ORDER().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case GET_LIST_ORDER_SUCCESS().type: {
                return {
                    ...state,
                    data: action.payload.orders,
                    state: REQUEST_STATE.SUCCESS,
                    totalOrder: action.payload.total,
                };
            }
            case DELETE_ORDER().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case DELETE_ORDER_SUCCESS().type: {
                let newState = { ...state };
                newState.data = newState.data.filter((order) => order.id != action.payload.id);
                return {
                    ...newState,
                    state: REQUEST_STATE.SUCCESS,
                };
            }
            default:
                return state;
        }
    },
    update: (state = defaultState, action) => {
        switch (action.type) {
            case UPDATE_ORDER().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case UPDATE_ORDER_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                };
            }
            case UPDATE_ORDER_SUCCESS_STATE().type: {
                return {
                    ...state,
                    state: null,
                };
            }
            case UPDATE_ORDER_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case GET_ORDER_BY_ID_SUCCESS().type: {
                return {
                    ...state,
                    data: action.payload,
                };
            }
            default:
                return state;
        }
    },
});
