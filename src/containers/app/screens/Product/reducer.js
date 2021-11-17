import { combineReducers } from 'redux';
import { get_list_product_success } from './actions/action';

const defaultState = {
    list: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case get_list_product_success().type: {
            return {
                ...state,
                list: action.payload,
            };
        }
        default:
            return state;
    }
};
