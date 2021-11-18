import { REQUEST_STATE } from 'app-configs';
import { apiProfile } from 'app-data/auth';
import Cookies from 'js-cookie';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { LOGIN_SUCCESS } from 'redux/actions/user';
import { LOGOUT } from 'redux/actions/user';

function PrivateRoute({ component: Component, location, ...rest }) {
    const [isAuth, setIsAuth] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const accessToken = Cookies.get('token');
            console.debug('accessToken: ', accessToken);
            if (accessToken) {
                const res = await apiProfile();
                if (res.state === REQUEST_STATE.SUCCESS) {
                    dispatch(LOGIN_SUCCESS(res.data));
                    setIsAuth(1);
                } else if (res.state === REQUEST_STATE.ERROR) {
                    dispatch(LOGOUT());
                    setIsAuth(2);
                }
            } else {
                setIsAuth(2);
            }
        })();
    }, [dispatch]);
    switch (isAuth) {
        case 0:
            return <div></div>;
        case 1:
            return <Route {...rest} render={(props) => <Component {...props} />} />;
        default:
            return <Redirect to={{ pathname: '/auth/login', state: { from: location } }} />;
    }
}

export default PrivateRoute;
