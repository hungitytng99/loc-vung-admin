import { TOKEN_KEY } from 'app-configs';
import { REQUEST_STATE } from 'app-configs';
import { apiProfile } from 'app-data/auth';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import Cookies from 'js-cookie';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { LOGIN_SUCCESS } from 'redux/actions/user';

function PrivateRoute({ component: Component, location, ...rest }) {
    const [isAuth, setIsAuth] = useState(REQUEST_STATE.REQUEST);
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuthencate = useSelector((state) => state.user?.authState);

    useEffect(() => {
        (async () => {
            const accessToken = Cookies.get(TOKEN_KEY);
            if (accessToken) {
                if (isAuthencate !== REQUEST_STATE.SUCCESS) {
                    const res = await apiProfile();
                    if (res.state === REQUEST_STATE.SUCCESS) {
                        dispatch(LOGIN_SUCCESS(res.data));
                        setIsAuth(REQUEST_STATE.SUCCESS);
                    } else if (res.state === REQUEST_STATE.ERROR) {
                        Cookies.remove(TOKEN_KEY);
                        history.push('/auth/login');
                        setIsAuth(REQUEST_STATE.ERROR);
                    }
                } else {
                    setIsAuth(REQUEST_STATE.SUCCESS);
                }
            } else {
                setIsAuth(REQUEST_STATE.ERROR);
            }
        })();
    }, [dispatch]);
    switch (isAuth) {
        case REQUEST_STATE.REQUEST:
            return <FullPageLoading />;
        case REQUEST_STATE.SUCCESS:
            return <Route {...rest} render={(props) => <Component {...props} />} />;
        default:
            return <Redirect to={{ pathname: '/auth/login', state: { from: location } }} />;
    }
}

export default PrivateRoute;
