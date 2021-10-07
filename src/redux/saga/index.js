import { takeLatest, all } from 'redux-saga/effects';

import { actionTypes } from '../actions/user';
import authorizationSagas from './authorization';

function* auth() {
    try {
    } catch (e) {
        console.log('we got error here', e);
    }
}

export default function* () {
    yield all([...authorizationSagas]);
    yield takeLatest(actionTypes.AUTH, auth);
}
