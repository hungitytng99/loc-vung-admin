import { REQUEST_STATE } from 'app-configs';
import { apiCreateVendor } from 'app-data/vendor';
import { apiDeleteVendor } from 'app-data/vendor';
import { apiUpdateVendor } from 'app-data/vendor';
import { apiListVendor } from 'app-data/vendor';
import { take, fork, delay, put, takeLatest, call } from 'redux-saga/effects';
import { NOTIFY_ERROR } from 'redux/actions/notify';
import {
    CREATE_VENDOR,
    CREATE_VENDOR_FAIL,
    CREATE_VENDOR_SUCCESS,
    DELETE_VENDOR,
    DELETE_VENDOR_FAIL,
    DELETE_VENDOR_SUCCESS,
    GET_LIST_VENDOR,
    GET_LIST_VENDOR_FAIL,
    GET_LIST_VENDOR_SUCCESS,
    UPDATE_VENDOR,
    UPDATE_VENDOR_FAIL,
    UPDATE_VENDOR_SUCCESS,
} from './actions/action';

function* getListVendor({ type, payload }) {
    const { pagination } = payload;
    try {
        const response = yield call(apiListVendor, pagination);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                GET_LIST_VENDOR_SUCCESS({
                    listVendor: response.data,
                    total: response.total,
                }),
            );
        } else if (response.state === REQUEST_STATE.ERROR) {
            yield put(GET_LIST_VENDOR_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

function* createVendor({ type, payload }) {
    const { vendor } = payload;
    try {
        const response = yield call(apiCreateVendor, vendor);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                CREATE_VENDOR_SUCCESS({
                    vendor: response.data,
                }),
            );
        } else if (response.state === REQUEST_STATE.ERROR) {
            yield put(CREATE_VENDOR_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

function* deleteVendor({ type, payload }) {
    const { id } = payload;
    try {
        const response = yield call(apiDeleteVendor, id);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                DELETE_VENDOR_SUCCESS({
                    vendor: response.data,
                }),
            );
        } else if (response.state === REQUEST_STATE.ERROR) {
            yield put(DELETE_VENDOR_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

function* updateVendor({ type, payload }) {
    const { id, name } = payload;
    try {
        const response = yield call(apiUpdateVendor, id, { name });
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                UPDATE_VENDOR_SUCCESS({
                    vendor: response.data,
                }),
            );
        } else if (response.state === REQUEST_STATE.ERROR) {
            yield put(UPDATE_VENDOR_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

export default function* () {
    yield takeLatest(GET_LIST_VENDOR().type, getListVendor);
    yield takeLatest(CREATE_VENDOR().type, createVendor);
    yield takeLatest(DELETE_VENDOR().type, deleteVendor);
    yield takeLatest(UPDATE_VENDOR().type, updateVendor);
}
