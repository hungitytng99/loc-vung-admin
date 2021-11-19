import { REQUEST_STATE } from 'app-configs';
import { combineReducers } from 'redux';
import {
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    GET_LIST_PRODUCT,
    GET_LIST_PRODUCT_SUCCESS,
    GET_PRODUCT_BY_ID_SUCCESS,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS_STATE,
} from './actions/action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    create: (state = defaultState, action) => {
        switch (action.type) {
            case CREATE_PRODUCT().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case CREATE_PRODUCT_SUCCESS().type: {
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
            case GET_LIST_PRODUCT().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case GET_LIST_PRODUCT_SUCCESS().type: {
                return {
                    ...state,
                    data: action.payload.products,
                    state: REQUEST_STATE.SUCCESS,
                    totalProduct: action.payload.allProducts.length,
                };
            }
            case DELETE_PRODUCT().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case DELETE_PRODUCT_SUCCESS().type: {
                let newState = { ...state };
                newState.data = newState.data.filter((product) => product.id != action.payload.id);
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
            case UPDATE_PRODUCT().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case UPDATE_PRODUCT_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                };
            }
            case UPDATE_PRODUCT_SUCCESS_STATE().type: {
                return {
                    ...state,
                    state: null,
                };
            }
            case UPDATE_PRODUCT_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case GET_PRODUCT_BY_ID_SUCCESS().type: {
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
