import { REQUEST_STATE } from 'app-configs';
import { apiListArticles } from 'app-data/articles';
import { take, fork, delay, put, takeLatest, call } from 'redux-saga/effects';
import { NOTIFY_ERROR } from 'redux/actions/notify';
import { GET_LIST_ARTICLE, GET_LIST_ARTICLE_SUCCESS } from './actions/action';

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

export default function* () {
    yield takeLatest(GET_LIST_ARTICLE().type, getListArticle);
}
