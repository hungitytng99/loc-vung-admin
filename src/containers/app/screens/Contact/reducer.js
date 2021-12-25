import { REQUEST_STATE } from 'app-configs';
import { combineReducers } from 'redux';
import { GET_LIST_CONTACT, GET_LIST_CONTACT_SUCCESS } from './actions/action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    list: (state = defaultState, action) => {
        switch (action.type) {
            case GET_LIST_CONTACT().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case GET_LIST_CONTACT_SUCCESS().type: {
                const { listContact, total } = action.payload;
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: listContact,
                    total,
                };
            }
            default:
                return state;
        }
    },
});
