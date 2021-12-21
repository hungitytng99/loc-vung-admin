import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, Router, Redirect, useRouteMatch } from 'react-router-dom';
import 'antd/dist/antd.css';
import AppRoute from './containers/app/AppRoute';
import AuthenticationRoute from './containers/authentication/AuthenticationRoute';
import { notification, Spin } from 'antd';
import history from './helpers/history';
import { listAppRoutes, listAuthenticationRoutes } from 'router';
import { ConnectedRouter } from 'connected-react-router';
import NotFound from 'components/NotFound';
import AdminLayout from 'components/Layout/Layout/AdminLayout';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RESET_NOTIFY_STATE } from 'redux/actions/notify';
import { REQUEST_STATE } from 'app-configs';
import { useTranslation } from 'react-i18next';

console.log('listAppRoutes =>', listAppRoutes);
console.log('listAuthenticationRoutes =>', listAuthenticationRoutes);

function App() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const notify = useSelector((state) => state.notify);
    useEffect(() => {
        if (notify.requestState === REQUEST_STATE.SUCCESS) {
            notification.success({
                message: t('success'),
            });
            dispatch(RESET_NOTIFY_STATE());
        } else if (notify.requestState === REQUEST_STATE.ERROR) {
            notification.error({
                message: t('fail'),
            });
            dispatch(RESET_NOTIFY_STATE());
        }
    }, [notify.requestState]);
    return (
        <ConnectedRouter history={history}>
            <Suspense fallback={<Spin></Spin>}>
                <Switch>
                    {listAppRoutes.map(({ path, exactContainer = true }) => (
                        <Route path={path} render={() => <AppRoute />} key={path} exact={exactContainer} />
                    ))}
                    {listAuthenticationRoutes.map(({ path, exactContainer = true }) => (
                        <Route path={path} render={() => <AuthenticationRoute />} key={path} exact={exactContainer} />
                    ))}
                    <Route path="*">
                        <AdminLayout>
                            <NotFound />
                        </AdminLayout>
                    </Route>
                </Switch>
            </Suspense>
        </ConnectedRouter>
    );
}

export default App;
