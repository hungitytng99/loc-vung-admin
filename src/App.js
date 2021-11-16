import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, Router, Redirect, useRouteMatch } from 'react-router-dom';
import 'antd/dist/antd.css';
import AppRoute from './containers/app/AppRoute';
import AuthenticationRoute from './containers/authentication/AuthenticationRoute';
import { Spin } from 'antd';
import history from './helpers/history';
import { listAppRoutes, listAuthenticationRoutes } from 'router';
import { ConnectedRouter } from 'connected-react-router';
import NotFound from 'components/NotFound';
import AdminLayout from 'components/Layout/Layout/AdminLayout';

console.log('listAppRoutes =>', listAppRoutes);
console.log('listAuthenticationRoutes =>', listAuthenticationRoutes);

function App() {
    return (
        <ConnectedRouter history={history}>
            <Suspense fallback={<Spin></Spin>}>
                <Switch>
                    {listAppRoutes.map(({ path, exactContainer = true }) => (
                        <Route
                            path={path}
                            render={() => <AppRoute />}
                            key={path}
                            exact={exactContainer}
                        />
                    ))}
                    {listAuthenticationRoutes.map(({ path, exactContainer = true }) => (
                        <Route
                            path={path}
                            render={() => <AuthenticationRoute />}
                            key={path}
                            exact={exactContainer}
                        />
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
