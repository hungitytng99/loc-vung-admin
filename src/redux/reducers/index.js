import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';
import history from 'helpers/history';
import userReducer from './user';

export default (asyncReducers) =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer,
        ...asyncReducers,
    });
