import { REQUEST_STATE } from 'app-configs';
import { combineReducers } from 'redux';
import {
    create_product,
    create_product_fail,
    create_product_success,
    get_list_product,
    get_list_product_success,
    reset_state_create_product,
} from './actions/action';

const defaultState = {
    createProductState: null,
    listProductState: null,
    list: [],
    totalProduct: 0,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case get_list_product().type: {
            return {
                ...state,
                listProductState: REQUEST_STATE.REQUEST,
            };
        }
        case get_list_product_success().type: {
            return {
                ...state,
                list: action.payload.products,
                listProductState: REQUEST_STATE.SUCCESS,
                totalProduct: action.payload.allProducts.length,
            };
        }
        case create_product().type: {
            return {
                ...state,
                createProductState: REQUEST_STATE.REQUEST,
            };
        }
        case create_product_success().type: {
            return {
                ...state,
                createProductState: REQUEST_STATE.SUCCESS,
            };
        }
        case create_product_fail().type: {
            return {
                ...state,
                createProductState: REQUEST_STATE.ERROR,
            };
        }
        case reset_state_create_product().type: {
            return {
                ...state,
                createProductState: null,
            };
        }
        default:
            return state;
    }
};
