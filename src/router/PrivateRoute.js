import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { select } from 'helpers/reselect';

function PrivateRoute({ component: Component, ...rest }) {
    const history = useHistory();
    const isAuthenticated = useSelector((state) => select(state, 'user.isAuthenticated', false));

    return (
        <Route
            {...rest}
            render={(props) => {
                return isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: history?.location },
                        }}
                    />
                );
            }}
        />
    );
}

export default PrivateRoute;
