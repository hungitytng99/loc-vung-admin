import { searchString } from 'helpers/search';
import { combineReducers } from 'redux';
import { get_kanban_success } from './actions/kanban';

const d = {
    loading: true,
    data: [],
    error: null,
};
export default combineReducers({
    kanban_detail: (state = d, action) => {
        switch (action.type) {
            case get_kanban_success().type: {
                return {
                    ...state,
                    loading: false,
                    data: action.payload,
                };
            }
            default:
                return state;
        }
    },
});
