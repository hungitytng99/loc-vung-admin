import { REQUEST_STATE } from 'app-configs';
import { combineReducers } from 'redux';
import { RESET_GET_DETAIL_ARTICLE_BY_ID } from '../Articles/actions/action';
import {
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    GET_LIST_PRODUCT,
    GET_LIST_PRODUCT_SUCCESS,
    GET_PRODUCT_BY_ID,
    GET_PRODUCT_BY_ID_SUCCESS,
    RESET_CREATE_PRODUCT_STATE,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS_STATE,
    GET_LIST_VENDOR_SUCCESS,
    GET_LIST_VENDOR,
    GET_LIST_VENDOR_FAIL,
    UPDATE_PRODUCT_VARIANT,
    UPDATE_PRODUCT_VARIANT_SUCCESS,
    UPDATE_PRODUCT_VARIANT_FAIL,
} from './actions/action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    create: (state = { ...defaultState, vendors: [], getVendorsState: null }, action) => {
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
            case RESET_CREATE_PRODUCT_STATE().type: {
                return {
                    ...defaultState,
                };
            }
            case GET_LIST_VENDOR().type: {
                return {
                    ...state,
                    getVendorsState: REQUEST_STATE.REQUEST,
                };
            }
            case GET_LIST_VENDOR_SUCCESS().type: {
                const { vendors = [] } = action.payload;
                return {
                    ...state,
                    vendors: vendors,
                    getVendorsState: REQUEST_STATE.SUCCESS,
                };
            }
            case GET_LIST_VENDOR_FAIL().type: {
                return {
                    ...state,
                    getVendorsState: REQUEST_STATE.ERROR,
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
                    totalProduct: action.payload.total,
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
    update: (state = { ...defaultState, getDetailState: null }, action) => {
        switch (action.type) {
            case CREATE_PRODUCT_SUCCESS().type: {
                return {
                    ...state,
                    data: action.payload,
                };
            }
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
            case GET_PRODUCT_BY_ID().type: {
                return {
                    ...state,
                    data: action.payload,
                    getDetailState: REQUEST_STATE.REQUEST,
                };
            }
            case GET_PRODUCT_BY_ID_SUCCESS().type: {
                return {
                    ...state,
                    data: action.payload,
                    getDetailState: REQUEST_STATE.SUCCESS,
                };
            }
            case RESET_GET_DETAIL_ARTICLE_BY_ID().type: {
                return { ...state, getDetailState: null };
            }
            default:
                return state;
        }
    },

    variant: (state = { ...defaultState, getDetailState: null }, action) => {
        switch (action.type) {
            case GET_PRODUCT_BY_ID().type: {
                return {
                    ...state,
                    data: action.payload,
                    getDetailState: REQUEST_STATE.REQUEST,
                };
            }
            case GET_PRODUCT_BY_ID_SUCCESS().type: {
                return {
                    ...state,
                    data: action.payload,
                    getDetailState: REQUEST_STATE.SUCCESS,
                };
            }

            case UPDATE_PRODUCT_VARIANT().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }

            case UPDATE_PRODUCT_VARIANT_SUCCESS().type: {
                const { variant } = action.payload;
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                };
            }

            case UPDATE_PRODUCT_VARIANT_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            default:
                return state;
        }
    },
});
