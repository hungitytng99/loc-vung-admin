import { Spin } from 'antd';
import React, { Suspense, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListCollection from './components/ListCollection/ListCollection';
import { childRoutes } from './route';
const Collection = (props) => {
    return (
        <Suspense fallback={<Spin />}>
            <Switch>
                <Route exact path="/collection">
                    <ListCollection />
                </Route>
                {childRoutes.map((route) => (
                    <Route key={route.path} exact={route.exact} path={route.path}>
                        {route.component}
                    </Route>
                ))}
            </Switch>
        </Suspense>
    );
};

export default Collection;
