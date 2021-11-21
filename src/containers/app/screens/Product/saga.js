import { REQUEST_STATE } from 'app-configs';
import { apiUploadFile } from 'app-data/media';
import { apiDeleteProduct } from 'app-data/product';
import { apiCreateProduct } from 'app-data/product';
import { apiGetProductById } from 'app-data/product';
import { apiUpdateProduct } from 'app-data/product';
import { apiListProduct } from 'app-data/product';
import { take, fork, delay, put, takeLatest, call } from 'redux-saga/effects';
import { NOTIFY_LOADING } from 'redux/actions/notify';
import { NOTIFY_ERROR } from 'redux/actions/notify';
import { NOTIFY_SUCCESS } from 'redux/actions/notify';
import {
    CREATE_PRODUCT,
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    GET_LIST_PRODUCT,
    GET_LIST_PRODUCT_SUCCESS,
    GET_PRODUCT_BY_ID,
    GET_PRODUCT_BY_ID_SUCCESS,
    SEARCH_PRODUCT,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
} from './actions/action';

function* getListProduct({ type, payload }) {
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
        const response = yield call(apiListProduct, filterParams);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                GET_LIST_PRODUCT_SUCCESS({
                    products: response.data,
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

function* createProduct({ type, payload }) {
    console.log('payload: ', payload);
    try {
        yield put(NOTIFY_LOADING());
        const listImagesIdUpload = [];
        for (let i = 0; i < payload.media.length; i++) {
            console.log('payload.media[i]: ', payload.media[i]);
            const responseUpload = yield call(apiUploadFile, payload.media[i].originFileObj);
            listImagesIdUpload.push(Number(responseUpload.data[0].id));
        }
        const newParams = {
            ...payload,
            media: listImagesIdUpload,
            featureImageId: listImagesIdUpload[0],
        };

        const responseCreate = yield call(apiCreateProduct, newParams);
        if (responseCreate.state == REQUEST_STATE.SUCCESS) {
            yield put(CREATE_PRODUCT_SUCCESS(responseCreate.data));
            yield put(NOTIFY_SUCCESS());
        } else {
            yield put(NOTIFY_ERROR());
        }
    } catch (error) {
        yield put(NOTIFY_ERROR());
        console.log('error: ', error);
    }
}

function* updateProduct({ type, payload }) {
    console.log('payload: ', payload);
    const { id, params } = payload;
    try {
        yield put(NOTIFY_LOADING());
        const oldListImagesIdUpload = [];
        const newListImagesIdUpload = [];
        for (let i = 0; i < params.media.length; i++) {
            if ((apiUploadFile, params.media[i].originFileObj)) {
                const responseUpload = yield call(apiUploadFile, params.media[i].originFileObj);
                newListImagesIdUpload.push(Number(responseUpload.data[0].id));
            } else {
                oldListImagesIdUpload.push(params.media[i].uid);
            }
        }
        const newListMediaId = [...oldListImagesIdUpload, ...newListImagesIdUpload];
        console.log('newListMediaId: ', newListMediaId);
        const newParams = {
            ...params,
            media: [...newListMediaId],
            featureImageId: newListMediaId[0],
        };
        const responseCreate = yield call(apiUpdateProduct, id, newParams);
        if (responseCreate.state == REQUEST_STATE.SUCCESS) {
            yield put(UPDATE_PRODUCT_SUCCESS(responseCreate.data));
            yield put(NOTIFY_SUCCESS());
        } else {
            yield put(NOTIFY_ERROR());
            yield put(UPDATE_PRODUCT_FAIL());
        }
    } catch (error) {
        yield put(NOTIFY_ERROR());
        console.log('error: ', error);
    }
}

function* deleteProduct({ type, payload }) {
    const { id } = payload;
    try {
        yield put(NOTIFY_LOADING());
        const response = yield call(apiDeleteProduct, id);
        console.log('response: ', response);
        if (response.state == REQUEST_STATE.SUCCESS) {
            yield put(DELETE_PRODUCT_SUCCESS(response.data));
            yield put(NOTIFY_SUCCESS());
        } else {
            yield put(NOTIFY_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

function* getProductById({ type, payload }) {
    const { id } = payload;
    try {
        yield put(NOTIFY_LOADING());
        const response = yield call(apiGetProductById, id);
        if (response.state == REQUEST_STATE.SUCCESS) {
            yield put(GET_PRODUCT_BY_ID_SUCCESS(response.data));
        } else {
            yield put(NOTIFY_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

function* searchProduct({ type, payload }) {
    try {
        yield delay(600);
        yield put(GET_LIST_PRODUCT(payload));
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

export default function* () {
    yield takeLatest(GET_LIST_PRODUCT().type, getListProduct);
    yield takeLatest(CREATE_PRODUCT().type, createProduct);
    yield takeLatest(UPDATE_PRODUCT().type, updateProduct);
    yield takeLatest(DELETE_PRODUCT().type, deleteProduct);
    yield takeLatest(GET_PRODUCT_BY_ID().type, getProductById);
    yield takeLatest(SEARCH_PRODUCT().type, searchProduct);
}
