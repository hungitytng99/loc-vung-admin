import { put, takeEvery, call, takeLatest, select } from 'redux-saga/effects';
import { actionTypes } from 'redux/actions/authorization';

function* getUserInProjectSaga({ projectId, page = 1, perPage = 20 }) {
    try {
    } catch (e) {
        console.log('we got error here', e);
    }
}

export default [
    takeLatest(actionTypes.GET_USERS_IN_PROJECT, getUserInProjectSaga),
];
