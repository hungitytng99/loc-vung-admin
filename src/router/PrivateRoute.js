import { REQUEST_STATE } from 'app-configs';
import { apiProfile } from 'app-data/auth';
import { isEmptyValue } from 'helpers/check';
import Cookies from 'js-cookie';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { LOGIN_SUCCESS } from 'redux/actions/user';
import { LOGOUT } from 'redux/actions/user';

function PrivateRoute({ component: Component, location, ...rest }) {
    const isAuthenticated = !isEmptyValue(Cookies.get('token'));
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if (isAuthenticated) {
                const res = await apiProfile();
                if (res.state === REQUEST_STATE.SUCCESS) {
                    dispatch(LOGIN_SUCCESS(res.data));
                } else if (res.state === REQUEST_STATE.ERROR) {
                    dispatch(LOGOUT({ byUser: true }));
                }
            }
        })();
    }, [dispatch, isAuthenticated]);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/auth/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;
