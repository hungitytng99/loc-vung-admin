import { apiListProduct } from 'app-data/product';
import { take, fork, delay, put, takeLatest, call } from 'redux-saga/effects';
import { get_list_product } from './actions/action';

function* getListProduct({ type, payload }) {
    try {
        console.log('ENTER HERE');
        const result = yield call(apiListProduct, payload.pagination);
        console.log('result: ', result);
    } catch (e) {}
}

export default function* () {
    yield takeLatest(get_list_product().type, getListProduct);
}
