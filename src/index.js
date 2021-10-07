import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux';
import App from './App';
import './helpers/format';
import i18n from 'languages';
import { I18nextProvider } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </Provider>,
    document.getElementById('root'),
);

serviceWorker.unregister();
