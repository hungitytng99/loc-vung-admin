import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import ContactPage from './components/ContactPage/ContactPage';
import { childRoutes } from './route';
const Vendor = (props) => {
    return (
        <Suspense fallback={<Spin />}>
            <Switch>
                <Route exact path="/contact">
                    <ContactPage />
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
