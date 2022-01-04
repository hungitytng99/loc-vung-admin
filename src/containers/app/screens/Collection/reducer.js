import { REQUEST_STATE } from 'app-configs';
import { combineReducers } from 'redux';
import {
    CREATE_COLLECTION,
    CREATE_COLLECTION_SUCCESS,
    DELETE_COLLECTION,
    DELETE_COLLECTION_SUCCESS,
    GET_LIST_COLLECTION,
    GET_LIST_COLLECTION_SUCCESS,
    GET_COLLECTION_BY_ID_SUCCESS,
    RESET_CREATE_COLLECTION_STATE,
    UPDATE_COLLECTION,
    UPDATE_COLLECTION_FAIL,
    UPDATE_COLLECTION_SUCCESS,
    UPDATE_COLLECTION_SUCCESS_STATE,
} from './actions/action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    create: (state = defaultState, action) => {
        switch (action.type) {
            case CREATE_COLLECTION().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case CREATE_COLLECTION_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                };
            }
            case RESET_CREATE_COLLECTION_STATE().type: {
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
            case GET_LIST_COLLECTION().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case GET_LIST_COLLECTION_SUCCESS().type: {
                return {
                    ...state,
                    data: action.payload.collections,
                    state: REQUEST_STATE.SUCCESS,
                    totalCollection: action.payload.total,
                };
            }
            case DELETE_COLLECTION().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case DELETE_COLLECTION_SUCCESS().type: {
                let newState = { ...state };
                newState.data = newState.data.filter((collection) => collection.id != action.payload.id);
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
            case CREATE_COLLECTION_SUCCESS().type: {
                return {
                    ...state,
                    data: action.payload,
                };
            }
            case UPDATE_COLLECTION().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case UPDATE_COLLECTION_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                };
            }
            case UPDATE_COLLECTION_SUCCESS_STATE().type: {
                return {
                    ...state,
                    state: null,
                };
            }
            case UPDATE_COLLECTION_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case GET_COLLECTION_BY_ID_SUCCESS().type: {
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
