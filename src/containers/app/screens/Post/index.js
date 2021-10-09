import ListHeader from 'components/Layout/ListHeader/ListHeader';
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import ListPost from './components/ListPost/ListPost';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Spin } from 'antd';
import { childRoutes } from './route';

const Product = (props) => {
    const { t } = useTranslation();

    return (
        <Suspense fallback={<Spin />}>
            <Switch>
                <Route exact path="/post">
                    <ListPost />
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

export default Product;
