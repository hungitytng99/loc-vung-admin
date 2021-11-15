import { combineReducers } from 'redux';

const defaultState = {
    data: [],
};
export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
