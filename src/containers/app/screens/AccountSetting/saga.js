import { REQUEST_STATE } from 'app-configs';
import { apiGetShopInfo } from 'app-data/shopInfo';
import { apiUpdateShopInfo } from 'app-data/shopInfo';
import { apiCreateVendor } from 'app-data/vendor';
import { apiDeleteVendor } from 'app-data/vendor';
import { apiUpdateVendor } from 'app-data/vendor';
import { apiListVendor } from 'app-data/vendor';
import { take, fork, delay, put, takeLatest, call } from 'redux-saga/effects';
import { NOTIFY_SUCCESS } from 'redux/actions/notify';
import { NOTIFY_ERROR } from 'redux/actions/notify';
import {
    CHANGE_PASSWORD,
    GET_DETAIL_PROFILE_INFORMATION,
    GET_DETAIL_PROFILE_INFORMATION_FAIL,
    GET_DETAIL_PROFILE_INFORMATION_SUCCESS,
    UPDATE_PROFILE_INFORMATION,
    UPDATE_PROFILE_INFORMATION_FAIL,
    UPDATE_PROFILE_INFORMATION_SUCCESS,
} from './actions/action';

function* getDetailProfileInformation({ type, payload }) {
    try {
        const response = yield call(apiGetShopInfo);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                GET_DETAIL_PROFILE_INFORMATION_SUCCESS({
                    information: response.data,
                }),
            );
        } else if (response.state === REQUEST_STATE.ERROR) {
            yield put(GET_DETAIL_PROFILE_INFORMATION_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

function* updateProfileInformation({ type, payload }) {
    const { information } = payload;
    try {
        const response = yield call(apiUpdateShopInfo, information);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(NOTIFY_SUCCESS());
            yield put(
                UPDATE_PROFILE_INFORMATION_SUCCESS({
                    information: response.data,
                }),
            );
        } else if (response.state === REQUEST_STATE.ERROR) {
            yield put(NOTIFY_ERROR());
            yield put(UPDATE_PROFILE_INFORMATION_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

function* changePassword({ type, payload }) {
    const { password } = payload;
    try {
        console.log('password: ', password);
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

export default function* () {
    yield takeLatest(GET_DETAIL_PROFILE_INFORMATION().type, getDetailProfileInformation);
    yield takeLatest(UPDATE_PROFILE_INFORMATION().type, updateProfileInformation);
    yield takeLatest(CHANGE_PASSWORD().type, changePassword);
}
