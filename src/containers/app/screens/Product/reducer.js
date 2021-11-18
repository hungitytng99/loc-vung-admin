import { REQUEST_STATE } from 'app-configs';
import { combineReducers } from 'redux';
import {
    CREATE_PRODUCT,
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    GET_LIST_PRODUCT,
    GET_LIST_PRODUCT_SUCCESS,
    GET_PRODUCT_BY_ID_SUCCESS,
    RESET_STATE_CREATE_PRODUCT,
} from './actions/action';

const defaultState = {
    requestState: null,
    listProductState: null,
    list: [],
    totalProduct: 0,
    detail: null,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_LIST_PRODUCT().type: {
            return {
                ...state,
                listProductState: REQUEST_STATE.REQUEST,
            };
        }
        case GET_LIST_PRODUCT_SUCCESS().type: {
            return {
                ...state,
                list: action.payload.products,
                listProductState: REQUEST_STATE.SUCCESS,
                totalProduct: action.payload.allProducts.length,
            };
        }
        case CREATE_PRODUCT_SUCCESS().type: {
            return {
                ...state,
                requestState: REQUEST_STATE.SUCCESS,
            };
        }
        case DELETE_PRODUCT_SUCCESS().type: {
            let newState = { ...state };
            newState.list = newState.list.filter((product) => product.id != action.payload.id);
            return {
                ...newState,
                requestState: REQUEST_STATE.SUCCESS,
            };
        }
        case GET_PRODUCT_BY_ID_SUCCESS().type: {
            return {
                ...state,
                detail: action.payload,
            };
        }
        default:
            return state;
    }
};
