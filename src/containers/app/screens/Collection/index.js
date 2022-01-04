import { Spin } from 'antd';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { login } from 'redux/actions/user';
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
                        {route.childComponent}
                    </Route>
                ))}
            </Switch>
        </Suspense>
    );
};

export default Collection;
