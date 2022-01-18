import { REQUEST_STATE } from 'app-configs';
import { combineReducers } from 'redux';
import {
    CHANGE_ORDER_STATUS_SUCCESS,
    CREATE_ORDER,
    CREATE_ORDER_SUCCESS,
    GET_LIST_ORDER,
    GET_LIST_ORDER_SUCCESS,
    SEARCH_ORDER,
    SEARCH_ORDER_FAIL,
    SEARCH_ORDER_SUCCESS,
} from './actions/action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
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
            case SEARCH_ORDER().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case SEARCH_ORDER_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case SEARCH_ORDER_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case CHANGE_ORDER_STATUS_SUCCESS().type: {
                const { newOrder } = action.payload;
                console.log('state: ', state);
                const orders = state.data.map((data) => {
                    if (newOrder.id === data.id) {
                        return newOrder;
                    }
                    return data;
                });

                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                    data: orders,
                };
            }
            default:
                return state;
        }
    },
});
