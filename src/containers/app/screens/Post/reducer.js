import { searchString } from 'helpers/search';
import { combineReducers } from 'redux';

const d = {
    loading: true,
    data: [],
    error: null,
};
export default combineReducers({
    kanban_detail: (state = d, action) => {
        switch (action.type) {
            default:
                return state;
        }
    },
});
