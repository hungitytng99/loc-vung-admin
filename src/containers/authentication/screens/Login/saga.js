import { take, fork, delay, put, takeEvery, call } from 'redux-saga/effects';
import {
    actionTypes,
    loginSuccess,
    registerSuccess,
    registerFailure,
} from './action';
import { authSuccess, authFailure } from '../../../../redux/actions/user';

// import { push } from 'connected-react-router';
import { notifSuccess } from '../../../../helpers/notificatiton';
function* login({ password, username }) {
    try {
    } catch (e) {
        console.log('we got error here', e);
    }
}

function* register({ data }) {
    try {
    } catch (e) {
        console.log('we got error here', e);
    }
}

export default function* () {
    yield takeEvery(actionTypes.LOGIN, login);
    yield takeEvery(actionTypes.REGISTER, register);
}
