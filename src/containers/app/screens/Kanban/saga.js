import { delay, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { get_kanban_board } from './actions/kanban';

export const board = {
    tasks: {},
    columns: {},
    columnOrder: [],
};

function* getKanbanBoard({ type, payload }) {
    try {
    } catch (e) {
        console.error('we got error in saga.js', e);
    }
}
export default function* () {
    yield takeEvery(get_kanban_board().type, getKanbanBoard);
}
