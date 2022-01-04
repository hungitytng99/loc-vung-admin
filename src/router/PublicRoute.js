import { TOKEN_KEY } from 'app-configs';
import Cookies from 'js-cookie';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
function PublicRoute({ component: Component, checkRedirectHome = false, ...rest }) {
    if (Cookies.get(TOKEN_KEY) && checkRedirectHome) {
        return <Redirect to="/" />;
    } else
        return (
            <Route
                {...rest}
                render={(props) => {
                    return <Component {...props} />;
                }}
            />
        );
}
export default PublicRoute;
