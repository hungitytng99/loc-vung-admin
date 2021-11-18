import { REQUEST_STATE } from 'app-configs';
import { apiUploadFile } from 'app-data/media';
import { apiCreateProduct } from 'app-data/product';
import { apiListProduct } from 'app-data/product';
import { take, fork, delay, put, takeLatest, call } from 'redux-saga/effects';
import {
    create_product,
    create_product_fail,
    create_product_success,
    get_list_product,
    get_list_product_success,
} from './actions/action';

function* getListProduct({ type, payload }) {
    try {
        const response = yield call(apiListProduct, payload.pagination);
        const allProductsResponse = yield call(apiListProduct);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                get_list_product_success({
                    products: response.data,
                    allProducts: allProductsResponse.data,
                }),
            );
        } else {
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* createProduct({ type, payload }) {
    try {
        const listImagesIdUpload = [];
        for (let i = 0; i < payload.media.length; i++) {
            const responseUpload = yield call(apiUploadFile, payload.media[i]);
            console.log('responseUpload: ', responseUpload);
            listImagesIdUpload.push(Number(responseUpload.data[0].id));
        }
        const newParams = {
            ...payload,
            media: listImagesIdUpload,
            featureImageId: listImagesIdUpload[0],
        };

        const responseCreate = yield call(apiCreateProduct, newParams);
        if (responseCreate.state == REQUEST_STATE.SUCCESS) {
            yield put(create_product_success(responseCreate.data));
        } else {
            yield put(create_product_fail());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* () {
    yield takeLatest(get_list_product().type, getListProduct);
    yield takeLatest(create_product().type, createProduct);
}
