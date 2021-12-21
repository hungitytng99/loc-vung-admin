import { REQUEST_STATE } from 'app-configs';
import { combineReducers } from 'redux';
import {
    CREATE_ARTICLE,
    CREATE_ARTICLE_SUCCESS,
    GET_LIST_ARTICLE,
    GET_LIST_ARTICLE_SUCCESS,
    RESET_CREATE_ARTICLE_STATE,
} from './actions/action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    create: (state = defaultState, action) => {
        switch (action.type) {
            case CREATE_ARTICLE().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case CREATE_ARTICLE_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                };
            }
            case RESET_CREATE_ARTICLE_STATE().type: {
                return {
                    ...defaultState,
                };
            }
            default:
                return state;
        }
    },
    list: (state = defaultState, action) => {
        switch (action.type) {
            case GET_LIST_ARTICLE().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
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
    update: (state = defaultState, action) => {
        switch (action.type) {
            // case CREATE_PRODUCT_SUCCESS().type: {
            //     return {
            //         ...state,
            //         data: action.payload,
            //     };
            // }
            default:
                return state;
        }
    },
});
