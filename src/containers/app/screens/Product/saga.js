import { REQUEST_STATE } from 'app-configs';
import { apiListProduct } from 'app-data/product';
import { take, fork, delay, put, takeLatest, call } from 'redux-saga/effects';
import { get_list_product, get_list_product_success } from './actions/action';

function* getListProduct({ type, payload }) {
    try {
        const response = yield call(apiListProduct, payload.pagination);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(get_list_product_success(response.data));
        } else {
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* () {
    yield takeLatest(get_list_product().type, getListProduct);
}
