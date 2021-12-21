import { REQUEST_STATE } from 'app-configs';
import { apiCreateArticles } from 'app-data/articles';
import { apiListArticles } from 'app-data/articles';
import { apiUploadFile } from 'app-data/media';
import { take, fork, delay, put, takeLatest, call } from 'redux-saga/effects';
import { NOTIFY_LOADING } from 'redux/actions/notify';
import { NOTIFY_SUCCESS } from 'redux/actions/notify';
import { NOTIFY_ERROR } from 'redux/actions/notify';
import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_SUCCESS } from '../Product/actions/action';
import {
    CREATE_ARTICLE,
    CREATE_ARTICLE_FAIL,
    CREATE_ARTICLE_SUCCESS,
    GET_LIST_ARTICLE,
    GET_LIST_ARTICLE_SUCCESS,
} from './actions/action';

function* getListArticle({ type, payload }) {
    const { pagination } = payload;
    try {
        let filterParams = { ...pagination };
        const response = yield call(apiListArticles, filterParams);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                GET_LIST_ARTICLE_SUCCESS({
                    listArticle: response.data,
                }),
            );
        } else {
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

function* createArticle({ type, payload }) {
    const { article } = payload;
    try {
        const responseUpload = yield call(apiUploadFile, article.media?.file?.originFileObj);
        if (responseUpload.state === REQUEST_STATE.SUCCESS) {
            const response = yield call(apiCreateArticles, {
                ...article,
                avatar: responseUpload.data[0]?.id,
                media: null,
            });
            if (response.state === REQUEST_STATE.SUCCESS) {
                yield put(CREATE_ARTICLE_SUCCESS());
                yield put(NOTIFY_SUCCESS());
            } else if (response.state === REQUEST_STATE.ERROR) {
                yield put(CREATE_ARTICLE_FAIL());
                yield put(NOTIFY_ERROR());
            }
        } else if (responseUpload.state === REQUEST_STATE.ERROR) {
            yield put(NOTIFY_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

export default function* () {
    yield takeLatest(GET_LIST_ARTICLE().type, getListArticle);
    yield takeLatest(CREATE_ARTICLE().type, createArticle);
}
