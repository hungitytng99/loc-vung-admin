import { Spin } from 'antd';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { login } from 'redux/actions/user';
import ListOrder from './components/ListOrder/ListOrder';
import { childRoutes } from './route';
const Order = (props) => {
    return (
        <Suspense fallback={<Spin />}>
            <Switch>
                <Route exact path="/order">
                    <ListOrder />
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

export default Order;
