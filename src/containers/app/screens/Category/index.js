import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CreateProduct from './components/CreateCategory/CreateCategory';
import ListProduct from './components/ListCategory/ListCategory';
import { childRoutes } from './route';
const Category = (props) => {
    return (
        <Suspense fallback={<Spin />}>
            <Switch>
                <Route exact path="/category">
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

export default Category;
