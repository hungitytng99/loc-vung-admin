import React, { lazy } from 'react';
import { Switch, Route, Router, Redirect, useRouteMatch } from 'react-router-dom';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import AppRoute from './containers/app/AppRoute';
import AuthenticationRoute from './containers/authentication/AuthenticationRoute';
import { Spin } from 'antd';
import history from './helpers/history';
import NotFound from './components/NotFound';
import { listAppRoutes, listAuthenticationRoutes } from 'router';
import { initLocalStorage } from 'helpers/localStorage';
import { ConnectedRouter } from 'connected-react-router';
import { auth } from 'redux/actions/user';

console.log('listAppRoutes =>', listAppRoutes);
console.log('listAuthenticationRoutes =>', listAuthenticationRoutes);

initLocalStorage(false);

function App() {
    const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch(auth());
    // }, [dispatch]);

    return (
        <ConnectedRouter history={history}>
            <React.Suspense fallback={<Spin></Spin>}>
                <Switch>
                    {listAppRoutes.map(({ path, exactContainer = true }) => (
                        <Route path={path} render={() => <AppRoute />} key={path} exact={exactContainer} />
                    ))}
                    {listAuthenticationRoutes.map(({ path, exactContainer = true }) => (
                        <Route path={path} render={() => <AuthenticationRoute />} key={path} exact={exactContainer} />
                    ))}
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </React.Suspense>
        </ConnectedRouter>
    );
}

export default process.env.NODE_ENV === 'development' ? require('react-hot-loader/root').hot(App) : App;
