import { REQUEST_STATE } from 'app-configs';
import { apiListContact } from 'app-data/contact';
import { put, takeLatest, call } from 'redux-saga/effects';
import { NOTIFY_ERROR } from 'redux/actions/notify';
import { GET_LIST_CONTACT, GET_LIST_CONTACT_FAIL, GET_LIST_CONTACT_SUCCESS } from './actions/action';

function* getListContact({ type, payload }) {
    const { pagination } = payload;
    try {
        const response = yield call(apiListContact, pagination);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                GET_LIST_CONTACT_SUCCESS({
                    listContact: response.data,
                    total: response?.total,
                }),
            );
        } else if (response.state === REQUEST_STATE.ERROR) {
            yield put(GET_LIST_CONTACT_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(NOTIFY_ERROR());
    }
}

export default function* () {
    yield takeLatest(GET_LIST_CONTACT().type, getListContact);
}
