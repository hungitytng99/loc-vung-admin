import { call, put, takeLatest } from '@redux-saga/core/effects';
import { REQUEST_STATE } from 'app-configs';
import { apiLogin } from 'app-data/auth';
import Cookies from 'js-cookie';
import { LOGIN_FAIL } from 'redux/actions/user';
import { LOGIN_SUCCESS } from 'redux/actions/user';
import { LOGIN } from 'redux/actions/user';

function* handleLogin({ type, payload }) {
    try {
        const response = yield call(apiLogin, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            Cookies.set('token', response.data.token);
            yield put(LOGIN_SUCCESS(response.data));
        } else {
            let errMessage = 'yourEmailOrPasswordIsWrong';
            if (response.message.includes('Network Error')) {
                errMessage = 'ourServerIsStoppingForMaintenance';
            }
            yield put(LOGIN_FAIL(errMessage));
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* userSaga() {
    yield takeLatest(LOGIN().type, handleLogin);
}
