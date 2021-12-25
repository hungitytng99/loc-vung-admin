import { REQUEST_STATE } from 'app-configs';
import { combineReducers } from 'redux';
import {
    CREATE_ARTICLE,
    CREATE_ARTICLE_SUCCESS,
    DELETE_ARTICLE,
    DELETE_ARTICLE_SUCCESS,
    GET_DETAIL_ARTICLE_BY_ID_SUCCESS,
    GET_LIST_ARTICLE,
    GET_LIST_ARTICLE_SUCCESS,
    RESET_CREATE_ARTICLE_STATE,
    RESET_UPDATE_ARTICLE_STATE,
    UPDATE_ARTICLE,
    UPDATE_ARTICLE_FAIL,
    UPDATE_ARTICLE_SUCCESS,
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
                const { listArticle, total } = action.payload;
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: listArticle,
                    total,
                };
            }
            case DELETE_ARTICLE_SUCCESS().type: {
                const { article } = action.payload;
                return {
                    ...state,
                    data: state.data.filter((articleItem) => article.id !== articleItem.id),
                };
            }
            default:
                return state;
        }
    },
    update: (state = { ...defaultState, getDetailState: null }, action) => {
        switch (action.type) {
            case UPDATE_ARTICLE().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case UPDATE_ARTICLE_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                };
            }
            case UPDATE_ARTICLE_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case GET_DETAIL_ARTICLE_BY_ID_SUCCESS().type: {
                return {
                    ...state,
                    data: action.payload,
                    getDetailState: REQUEST_STATE.SUCCESS,
                };
            }
            case RESET_UPDATE_ARTICLE_STATE().type: {
                return {
                    ...defaultState,
                    getDetailState: null,
                };
            }
            default:
                return state;
        }
    },
    delete: (state = defaultState, action) => {
        switch (action.type) {
            case DELETE_ARTICLE().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case DELETE_ARTICLE_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                };
            }
            default:
                return state;
        }
    },
});
