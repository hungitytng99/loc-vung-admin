import { createStore, compose, applyMiddleware } from 'redux';
import { promiseMiddleware } from '@adobe/redux-saga-promise';
import createSagaMiddleware from 'redux-saga';
// import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import history from 'helpers/history';
import rootSaga from './saga';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
// const _routerMiddleware = routerMiddleware(history);
function createSagaInjector(runSaga, rootSaga) {
    const injectedSagas = new Map();

    const isInjected = (key) => injectedSagas.has(key);

    const injectSaga = (key, saga) => {
        if (isInjected(key)) return;
        const task = runSaga(saga);
        injectedSagas.set(key, task);
    };

    injectSaga('root', rootSaga);
    return injectSaga;
}

const store =
    process.env.NODE_ENV === 'development'
        ? createStore(
              createReducer(),
              {},
              composeWithDevTools(applyMiddleware(routerMiddleware(history), promiseMiddleware, sagaMiddleware)),
          )
        : createStore(
              createReducer(),
              {},
              compose(applyMiddleware(routerMiddleware(history), promiseMiddleware, sagaMiddleware)),
          );

store.asyncReducers = {};
store.injectReducer = (key, reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
};

store.injectSaga = createSagaInjector(sagaMiddleware.run, rootSaga);
export default store;
