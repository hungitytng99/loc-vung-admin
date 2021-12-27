import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import AccountSetting from './components/SettingPanel/SettingPanel';
import { childRoutes } from './route';
const Vendor = (props) => {
    return (
        <Suspense fallback={<Spin />}>
            <Switch>
                <Route exact path="/account-setting">
                    <AccountSetting />
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
