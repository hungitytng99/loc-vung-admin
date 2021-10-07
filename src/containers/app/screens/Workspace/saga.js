import { take, fork, delay, put, takeLatest } from 'redux-saga/effects';
import { actionTypes } from 'containers/app/screens/Workspace/actions/action';

function* getFolderSaga() {
    try {
    } catch (e) {
        yield put(getFolderFailure());
    }
}

export default function* () {
    yield takeLatest(actionTypes.GET_FOLDER, getFolderSaga);
}
