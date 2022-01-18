import { REQUEST_STATE } from 'app-configs';
import { apiGetArticlesById } from 'app-data/articles';
import { apiDeleteArticle } from 'app-data/articles';
import { apiCreateArticles } from 'app-data/articles';
import { apiUpdateArticle } from 'app-data/articles';
import { apiListArticles } from 'app-data/articles';
import { apiUploadFile } from 'app-data/media';
import { put, takeLatest, call } from 'redux-saga/effects';
import { NOTIFY_SUCCESS } from 'redux/actions/notify';
import { NOTIFY_ERROR } from 'redux/actions/notify';
import {
    CREATE_ARTICLE,
    CREATE_ARTICLE_FAIL,
    CREATE_ARTICLE_SUCCESS,
    DELETE_ARTICLE,
    DELETE_ARTICLE_FAIL,
    DELETE_ARTICLE_SUCCESS,
    GET_DETAIL_ARTICLE_BY_ID,
    GET_DETAIL_ARTICLE_BY_ID_SUCCESS,
    GET_LIST_ARTICLE,
    GET_LIST_ARTICLE_SUCCESS,
    UPDATE_ARTICLE,
    UPDATE_ARTICLE_FAIL,
    UPDATE_ARTICLE_SUCCESS,
} from './actions/action';

function* getListArticle({ type, payload }) {
    const { pagination } = payload;
    try {
        let filterParams = { ...pagination };
        const response = yield call(apiListArticles, filterParams);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                GET_LIST_ARTICLE_SUCCESS({
                    listArticle: response.data ?? [],
                    total: response?.total,
                }),
            );
        } else {
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

function* deleteArticle({ type, payload }) {
    const { id } = payload;
    try {
        const response = yield call(apiDeleteArticle, id);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                DELETE_ARTICLE_SUCCESS({
                    article: response.data,
                }),
            );
            yield put(NOTIFY_SUCCESS());
        } else {
            yield put(DELETE_ARTICLE_FAIL());
            yield put(NOTIFY_ERROR());
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

function* updateArticle({ type, payload }) {
    const { article, originArticle } = payload;
    try {
        let avatarId = null;
        if (!article?.media) {
            avatarId = originArticle?.avatar;
        } else {
            const responseUpload = yield call(apiUploadFile, article.media?.file?.originFileObj);
            if (responseUpload.state === REQUEST_STATE.SUCCESS) {
                avatarId = responseUpload?.data[0]?.id;
            } else if (responseUpload.state === REQUEST_STATE.ERROR) {
                yield put(NOTIFY_ERROR());
                return;
            }
        }

        delete article.media;
        const responseUpdate = yield call(apiUpdateArticle, originArticle?.id, {
            ...article,
            avatar: avatarId,
        });
        if (responseUpdate?.state === REQUEST_STATE.SUCCESS) {
            yield put(UPDATE_ARTICLE_SUCCESS());
            yield put(NOTIFY_SUCCESS());
        } else if (responseUpdate?.state === REQUEST_STATE.ERROR) {
            yield put(UPDATE_ARTICLE_FAIL());
            yield put(NOTIFY_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

function* getDetailArticleById({ type, payload }) {
    try {
        const response = yield call(apiGetArticlesById, payload?.id);
        if (response?.state === REQUEST_STATE.SUCCESS) {
            yield put(GET_DETAIL_ARTICLE_BY_ID_SUCCESS(response.data?.article));
        } else if (response?.state === REQUEST_STATE.ERROR) {
            yield put(GET_DETAIL_ARTICLE_BY_ID_SUCCESS());
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
    yield takeLatest(DELETE_ARTICLE().type, deleteArticle);
    yield takeLatest(GET_DETAIL_ARTICLE_BY_ID().type, getDetailArticleById);
    yield takeLatest(UPDATE_ARTICLE().type, updateArticle);
}
