import { combineReducers } from 'redux';

import user from './user';
import config from './config';
import authorization from './authorization';
import { connectRouter } from 'connected-react-router';
import history from 'helpers/history';

export default (asyncReducers) =>
    combineReducers({
        router: connectRouter(history),
        user,
        config,
        authorization,
        ...asyncReducers,
    });
