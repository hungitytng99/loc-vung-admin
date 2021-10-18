import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ component: Component, ...rest }) {
    const history = useHistory();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

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
