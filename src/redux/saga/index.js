import { all, takeLatest } from 'redux-saga/effects';
import { AUTHENCATE_USER } from 'redux/actions';
import userSaga from './userSaga';

function* authencateUser() {
    try {
        // yield put(push(`/auth`));
        // debugger
        let pathname = window.location.pathname;

        if (['/login'].includes(pathname)) {
            yield put(push('/auth'));
        }

        const response = yield call(authApi.getUserProfile);
        if (response?.code === 200) {
            yield put(authSuccess(response));
            const projects = yield call(projectApi.getProject);
            const defaultProject = projects.data[0];

            if (['/login', '/auth'].includes(pathname)) {
                pathname = history?.location?.state?.from?.pathname ?? `/projects/${defaultProject?._id}`;
            }
            yield put(push(pathname));
        } else if (
            (response?.code === 500 && response?.message === 'Unauthorized') ||
            response?.message === 'TOKEN_INVALID'
        ) {
            yield put(push('/login'));
            yield put(authFailure());
        }
    } catch (e) {
        yield put(push('/login'));
        yield put(authFailure());
        console.log('we got error here', e);
    }
}

export default function* () {
    yield takeLatest(AUTHENCATE_USER().type, authencateUser);
    yield all([userSaga()]);
}
