import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
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
                    <Route key={route.path} exact={route.exact} path={route.path}>
                        {route.component}
                    </Route>
                ))}
            </Switch>
        </Suspense>
    );
};

export default Product;
