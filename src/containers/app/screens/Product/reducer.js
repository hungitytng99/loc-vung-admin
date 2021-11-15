import { combineReducers } from 'redux';

const defaultState = {
    list: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
