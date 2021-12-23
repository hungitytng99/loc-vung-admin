import { REQUEST_STATE } from 'app-configs';
import { combineReducers } from 'redux';
import {
    CREATE_VENDOR,
    CREATE_VENDOR_SUCCESS,
    DELETE_VENDOR,
    DELETE_VENDOR_SUCCESS,
    GET_LIST_VENDOR,
    GET_LIST_VENDOR_SUCCESS,
    RESET_CREATE_VENDOR_STATE,
    RESET_DELETE_VENDOR_STATE,
    RESET_UPDATE_VENDOR_STATE,
    UPDATE_VENDOR,
    UPDATE_VENDOR_SUCCESS,
} from './actions/action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    create: (state = defaultState, action) => {
        switch (action.type) {
            case CREATE_VENDOR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case CREATE_VENDOR_SUCCESS().type: {
                const { vendor } = action.payload;
                return {
                    ...state,
                    data: vendor,
                    state: REQUEST_STATE.SUCCESS,
                };
            }
            case RESET_CREATE_VENDOR_STATE().type: {
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
            case GET_LIST_VENDOR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case GET_LIST_VENDOR_SUCCESS().type: {
                const { listVendor, total } = action.payload;
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: listVendor,
                    total: total,
                };
            }
            case CREATE_VENDOR_SUCCESS().type: {
                const { vendor } = action.payload;
                return {
                    ...state,
                    data: [vendor, ...state.data],
                };
            }
            case DELETE_VENDOR_SUCCESS().type: {
                const { vendor } = action.payload;
                return {
                    ...state,
                    data: state.data.filter((vendorItem) => vendorItem.id !== vendor.id),
                };
            }
            case UPDATE_VENDOR_SUCCESS().type: {
                const { vendor } = action.payload;
                return {
                    ...state,
                    data: state.data.map((vendorItem) => (vendorItem.id === vendor.id ? vendor : vendorItem)),
                };
            }
            default:
                return state;
        }
    },
    update: (state = defaultState, action) => {
        switch (action.type) {
            case UPDATE_VENDOR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case UPDATE_VENDOR_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                };
            }
            case RESET_UPDATE_VENDOR_STATE().type: {
                return {
                    ...defaultState,
                };
            }
            default:
                return state;
        }
    },

    delete: (state = defaultState, action) => {
        switch (action.type) {
            case DELETE_VENDOR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }

            case DELETE_VENDOR_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                };
            }

            case RESET_DELETE_VENDOR_STATE().type: {
                return { ...defaultState };
            }
            default:
                return state;
        }
    },
});
