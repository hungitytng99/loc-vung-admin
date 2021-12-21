import { REQUEST_STATE } from 'app-configs';
import { combineReducers } from 'redux';
import {
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    GET_LIST_ARTICLE_SUCCESS,
    GET_LIST_PRODUCT,
    GET_LIST_PRODUCT_SUCCESS,
    GET_PRODUCT_BY_ID_SUCCESS,
    RESET_CREATE_PRODUCT_STATE,
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
    create: (state = null, action) => {
        switch (action.type) {
            case CREATE_PRODUCT().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            default:
                return state;
        }
    },
    list: (state = defaultState, action) => {
        switch (action.type) {
            case GET_LIST_ARTICLE_SUCCESS().type: {
                const { listArticle } = action.payload;
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: listArticle,
                };
            }
            default:
                return state;
        }
    },
    update: (state = null, action) => {
        switch (action.type) {
            case CREATE_PRODUCT_SUCCESS().type: {
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
