import { Spin } from 'antd';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import VendorPage from './components/VendorPage/VendorPage';
import { childRoutes } from './route';
const Vendor = (props) => {
    console.log('Vendor: ');
    return (
        <Suspense fallback={<Spin />}>
            <Switch>
                <Route exact path="/vendor">
                    <VendorPage />
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

export default Vendor;
