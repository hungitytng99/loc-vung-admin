import { Spin } from 'antd';
import { REQUEST_STATE } from 'app-configs';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListArticle from './components/ListProduct/ListArticle';
import { childRoutes } from './route';
const Product = (props) => {
    const notify = useSelector((state) => state.notify);
    return (
        <Suspense fallback={<Spin />}>
            {notify.requestState === REQUEST_STATE.REQUEST && <FullPageLoading />}

            <Switch>
                <Route exact path="/article">
                    <ListArticle />
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
