import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import AdminLayout from 'components/Layout/Layout/AdminLayout';
import { Spin } from 'antd';
import PrivateRoute from 'router/PrivateRoute';
import PublicRoute from 'router/PublicRoute';
import { appRoutes } from 'router/index';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import { Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from 'app-configs';

function AppRoute() {
    console.debug('token: ', Cookies.get(TOKEN_KEY));
    return (
        <AdminLayout>
            <Suspense fallback={<FullPageLoading />}>
                <Switch>
                    {appRoutes.map(({ component: Component, exact = true, path, isPrivate, ...rest }) => {
                        if (isPrivate) {
                            return (
                                <PrivateRoute key={path} component={Component} exact={exact} path={path} {...rest} />
                            );
                        } else
                            return <PublicRoute key={path} exact={exact} path={path} component={Component} {...rest} />;
                    })}
                </Switch>
            </Suspense>
        </AdminLayout>
    );
}

export default AppRoute;
