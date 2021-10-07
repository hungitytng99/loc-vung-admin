import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import LayoutMenu from './LayoutMenu';
import { Spin } from 'antd';
import PrivateRoute from '../../router/PrivateRoute';
import PublicRoute from '../../router/PublicRoute';
import { appRoutes } from 'router/index';
console.log('appRoutes', appRoutes);

function AppRoute() {
    return (
        <LayoutMenu>
            <Suspense fallback={<Spin />}>
                <Switch>
                    {appRoutes.map(
                        ({
                            component: Component,
                            exact = true,
                            path,
                            isPrivate,
                            ...rest
                        }) => {
                            if (isPrivate) {
                                return (
                                    <PrivateRoute
                                        key={path}
                                        component={Component}
                                        exact={exact}
                                        path={path}
                                        {...rest}
                                    />
                                );
                            } else
                                return (
                                    <PublicRoute
                                        key={path}
                                        exact={exact}
                                        path={path}
                                        component={Component}
                                        {...rest}
                                    />
                                );
                        },
                    )}
                </Switch>
            </Suspense>
        </LayoutMenu>
    );
}

export default AppRoute;
