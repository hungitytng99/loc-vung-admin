import { REQUEST_STATE } from 'app-configs';
import { apiUploadFile } from 'app-data/media';
import { apiDeleteCollection } from 'app-data/collection';
import { apiCreateCollection } from 'app-data/collection';
import { apiGetCollectionById } from 'app-data/collection';
import { apiUpdateCollection } from 'app-data/collection';
import { apiListCollection } from 'app-data/collection';
import { take, fork, delay, put, takeLatest, call } from 'redux-saga/effects';
import { NOTIFY_LOADING } from 'redux/actions/notify';
import { NOTIFY_ERROR } from 'redux/actions/notify';
import { NOTIFY_SUCCESS } from 'redux/actions/notify';
import {
    CREATE_COLLECTION,
    CREATE_COLLECTION_FAIL,
    CREATE_COLLECTION_SUCCESS,
    DELETE_COLLECTION,
    DELETE_COLLECTION_FAIL,
    DELETE_COLLECTION_SUCCESS,
    GET_LIST_COLLECTION,
    GET_LIST_COLLECTION_SUCCESS,
    GET_COLLECTION_BY_ID,
    GET_COLLECTION_BY_ID_SUCCESS,
    SEARCH_COLLECTION,
    UPDATE_COLLECTION,
    UPDATE_COLLECTION_FAIL,
    UPDATE_COLLECTION_SUCCESS,
} from './actions/action';

function* getListCollection({ type, payload }) {
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
        const response = yield call(apiListCollection, filterParams);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                GET_LIST_COLLECTION_SUCCESS({
                    collections: response.data,
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

function* createCollection({ type, payload }) {
    const { params } = payload;
    console.log('params: ', params);
    try {
        yield put(NOTIFY_LOADING());
        let collectionImageId = null;
        for (let i = 0; i < params.media.fileList.length; i++) {
            const responseUpload = yield call(apiUploadFile, params.media.fileList[i]?.originFileObj);
            collectionImageId = Number(responseUpload.data[0].id);
        }
        delete params.media;
        const responseCreate = yield call(apiCreateCollection, {
            ...params,
            thumbnailId: collectionImageId,
        });
        console.log('responseCreate: ', responseCreate);
        if (responseCreate.state == REQUEST_STATE.SUCCESS) {
            yield put(CREATE_COLLECTION_SUCCESS(responseCreate.data));
            yield put(NOTIFY_SUCCESS());
        } else {
            yield put(NOTIFY_ERROR());
        }
    } catch (error) {
        yield put(NOTIFY_ERROR());
        console.log('error: ', error);
    }
}

function* updateCollection({ type, payload }) {
    const { id, params } = payload;
    try {
        yield put(NOTIFY_LOADING());
        let collectionImageId = null;
        for (let i = 0; i < params.media.length; i++) {
            if (params.media[i].originFileObj) {
                const responseUpload = yield call(apiUploadFile, params.media[i].originFileObj);
                collectionImageId = Number(responseUpload.data[0].id);
            } else {
                collectionImageId = params.media[i].uid;
            }
        }
        delete params.media;
        const newParams = { ...params, thumbnailId: collectionImageId };
        const responseCreate = yield call(apiUpdateCollection, id, newParams);
        if (responseCreate.state == REQUEST_STATE.SUCCESS) {
            yield put(UPDATE_COLLECTION_SUCCESS(responseCreate.data));
            yield put(NOTIFY_SUCCESS());
        } else {
            yield put(NOTIFY_ERROR());
            yield put(UPDATE_COLLECTION_FAIL());
        }
    } catch (error) {
        yield put(NOTIFY_ERROR());
        console.log('error: ', error);
    }
}

function* deleteCollection({ type, payload }) {
    const { id } = payload;
    try {
        yield put(NOTIFY_LOADING());
        const response = yield call(apiDeleteCollection, id);
        console.log('response: ', response);
        if (response.state == REQUEST_STATE.SUCCESS) {
            yield put(DELETE_COLLECTION_SUCCESS(response.data));
            yield put(NOTIFY_SUCCESS());
        } else {
            yield put(NOTIFY_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

function* getCollectionById({ type, payload }) {
    const { id } = payload;
    try {
        yield put(NOTIFY_LOADING());
        const response = yield call(apiGetCollectionById, id);
        if (response.state == REQUEST_STATE.SUCCESS) {
            yield put(GET_COLLECTION_BY_ID_SUCCESS(response.data));
        } else {
            yield put(NOTIFY_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

function* searchCollection({ type, payload }) {
    try {
        yield delay(600);
        yield put(GET_LIST_COLLECTION(payload));
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

export default function* () {
    yield takeLatest(GET_LIST_COLLECTION().type, getListCollection);
    yield takeLatest(CREATE_COLLECTION().type, createCollection);
    yield takeLatest(UPDATE_COLLECTION().type, updateCollection);
    yield takeLatest(DELETE_COLLECTION().type, deleteCollection);
    yield takeLatest(GET_COLLECTION_BY_ID().type, getCollectionById);
    yield takeLatest(SEARCH_COLLECTION().type, searchCollection);
}
