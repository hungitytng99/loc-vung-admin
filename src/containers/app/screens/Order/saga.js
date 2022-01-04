import { REQUEST_STATE } from 'app-configs';
import { apiUploadFile } from 'app-data/media';
// import { apiDeleteOrder } from 'app-data/orders';
import { apiCreateOrder } from 'app-data/orders';
import { apiGetOrderById } from 'app-data/orders';
// import { apiUpdateOrder } from 'app-data/orders';
import { apiListOrder } from 'app-data/orders';
import { take, fork, delay, put, takeLatest, call } from 'redux-saga/effects';
import { NOTIFY_LOADING } from 'redux/actions/notify';
import { NOTIFY_ERROR } from 'redux/actions/notify';
import { NOTIFY_SUCCESS } from 'redux/actions/notify';
import {
    CREATE_ORDER,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_SUCCESS,
    DELETE_ORDER,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_SUCCESS,
    GET_LIST_ORDER,
    GET_LIST_ORDER_SUCCESS,
    GET_ORDER_BY_ID,
    GET_ORDER_BY_ID_SUCCESS,
    SEARCH_ORDER,
    SEARCH_ORDER_FAIL,
    SEARCH_ORDER_SUCCESS,
    UPDATE_ORDER,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_SUCCESS,
} from './actions/action';

function* getListOrder({ type, payload }) {
    const { sortField, sortOrder, status, pagination, title } = payload;
    try {
        let filterParams = { ...pagination };
        if (status) {
            filterParams = { ...filterParams, status: status[0] };
        }
        if (sortField === 'price' && sortOrder) {
            filterParams = { ...filterParams, sortPrice: sortOrder === 'ascend' ? 'ASC' : 'DESC' };
        }
        if (title) {
            filterParams = { ...filterParams, title };
        }
        console.log('filterParams: ', filterParams);
        const response = yield call(apiListOrder, filterParams);
        console.log('response: ', response);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                GET_LIST_ORDER_SUCCESS({
                    orders: response.data,
                    total: response.total,
                }),
            );
        } else {
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

function* createOrder({ type, payload }) {
    console.log('payload: ', payload);
    try {
        yield put(NOTIFY_LOADING());

        const responseCreate = yield call(apiCreateOrder, payload);
        console.log('responseCreate: ', responseCreate);
        if (responseCreate.state == REQUEST_STATE.SUCCESS) {
            yield put(CREATE_ORDER_SUCCESS(responseCreate.payload));
            yield put(NOTIFY_SUCCESS());
        } else {
            yield put(NOTIFY_ERROR());
        }
    } catch (error) {
        yield put(NOTIFY_ERROR());
        console.log('error: ', error);
    }
}

function* getOrderById({ type, payload }) {
    const { id } = payload;
    console.log('id: ', id);
    try {
        yield put(NOTIFY_LOADING());
        const response = yield call(apiGetOrderById, id);
        if (response.state == REQUEST_STATE.SUCCESS) {
            yield put(GET_ORDER_BY_ID_SUCCESS(response.data));
        } else {
            yield put(NOTIFY_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

function* searchOrder({ type, payload }) {
    const { search } = payload;
    console.log('search: ', search);
    try {
        yield delay(400);
        const response = yield call(apiListOrder, { search });
        console.log('response: ', response);
        if (response.state == REQUEST_STATE.SUCCESS) {
            yield put(SEARCH_ORDER_SUCCESS(response.data));
        } else {
            yield put(NOTIFY_ERROR());
            yield put(SEARCH_ORDER_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

export default function* () {
    yield takeLatest(GET_LIST_ORDER().type, getListOrder);
    yield takeLatest(CREATE_ORDER().type, createOrder);
    // yield takeLatest(UPDATE_ORDER().type, updateOrder);
    // yield takeLatest(DELETE_ORDER().type, deleteOrder);
    yield takeLatest(GET_ORDER_BY_ID().type, getOrderById);
    yield takeLatest(SEARCH_ORDER().type, searchOrder);
}
