import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';
import history from 'helpers/history';
import userReducer from './user';
import notifyReducer from './notify';

export default (asyncReducers) =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer,
        notify: notifyReducer,
        ...asyncReducers,
    });
