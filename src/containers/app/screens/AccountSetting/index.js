import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SettingPanel from './components/SettingPanel/SettingPanel';
import { childRoutes } from './route';
const Vendor = (props) => {
    return (
        <Suspense fallback={<Spin />}>
            <Switch>
                <Route path="/account-setting">
                    <SettingPanel currentTab={props?.location?.hash?.replace('#', '') ?? null} />
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

export default Vendor;
