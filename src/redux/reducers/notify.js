import { update_notify_success } from 'redux/actions/errorNotify';
import { update_notify_error } from 'redux/actions/errorNotify';
const defaultState = {
    error: {
        title: null,
        description: null,
    },
    success: {
        title: null,
        description: null,
    },
};

export default function notifyReducer(state = defaultState, action) {
    switch (action.type) {
        case update_notify_error().type: {
            const { title, description } = action.payload;
            return {
                ...state,
                error: {
                    title: title,
                    description: description,
                },
            };
        }
        case update_notify_success().type: {
            const { title, description } = action.payload;
            return {
                ...state,
                success: {
                    title: title,
                    description: description,
                },
            };
        }
        default:
            return state;
    }
}
