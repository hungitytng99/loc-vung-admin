import { dispatch } from '@adobe/redux-saga-promise';
import { Spin } from 'antd';
import { REQUEST_STATE } from 'app-configs';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { NOTIFY_SUCCESS } from 'redux/actions/notify';
import ListArticle from './components/ListArticle/ListArticle';
import { childRoutes } from './route';
const Article = (props) => {
    const notify = useSelector((state) => state.notify);
    const articleDelete = useSelector((state) => state.articles?.delete);
    const articlesList = useSelector((state) => state.articles?.list);

    return (
        <Suspense fallback={<Spin />}>
            {(notify?.requestState === REQUEST_STATE.REQUEST ||
                articleDelete?.state === REQUEST_STATE.REQUEST ||
                articlesList?.state === REQUEST_STATE.REQUEST) && <FullPageLoading opacity={0.8} />}

            <Switch>
                <Route exact path="/articles">
                    <ListArticle />
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

export default Article;
