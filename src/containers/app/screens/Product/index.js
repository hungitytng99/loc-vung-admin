import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CreateProduct from './components/CreateProduct/CreateProduct';
import ListProduct from './components/ListProduct/ListProduct';
import { childRoutes } from './route';
const Product = (props) => {
    return (
        <Suspense fallback={<Spin />}>
            <Switch>
                <Route exact path="/product">
                    <ListProduct />
                </Route>
                {childRoutes.map((route) => (
                    <Route exact={route.exact} path={route.path}>
                        {route.childComponent}
                    </Route>
                ))}
            </Switch>
        </Suspense>
    );
};

export default Product;
