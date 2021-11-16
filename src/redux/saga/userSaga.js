import { call, put, takeLatest } from '@redux-saga/core/effects';
import { REQUEST_STATE } from 'app-configs';
import { apiLogin } from 'app-data/auth';
import Cookies from 'js-cookie';
import { login_fail } from 'redux/actions/user';
import { login_success } from 'redux/actions/user';
import { login } from 'redux/actions/user';

function* handleLogin({ type, payload }) {
    try {
        const response = yield call(apiLogin, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            Cookies.set('token', response.data.token, { secure: true });
            yield put(login_success(response.data));
        } else {
            yield put(login_fail(response.data));
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* userSaga() {
    yield takeLatest(login().type, handleLogin);
}
