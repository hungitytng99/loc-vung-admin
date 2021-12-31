import React from 'react';
import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';
import CreateOrder from './components/CreateOrder/CreateOrder';
import EditOrder from './components/EditOrder/EditOrder';
import AddHotOrder from './components/AddHotOrder/AddHotOrder';
import TestComponent from './components/TestComponent/TestComponent';

export default {
    path: MODULES.orderModule.route,
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
        await initModules([MODULES.orderModule], 'app');
        return import('.');
    }),
};

export const childRoutes = [
    {
        path: '/order/create',
        exact: true,
        isPrivate: true,
        childComponent: <CreateOrder />,
        component: lazy(async () => {
            await initModules([MODULES.orderModule], 'app');
            return import('.');
        }),
    },
    {
        path: '/order/add-hot-order',
        exact: true,
        isPrivate: true,
        childComponent: <AddHotOrder />,
        component: lazy(async () => {
            await initModules([MODULES.orderModule], 'app');
            return import('.');
        }),
    },
    {
        path: '/order/edit-order/:id',
        exact: true,
        isPrivate: true,
        childComponent: <EditOrder />,
        component: lazy(async () => {
            await initModules([MODULES.orderModule], 'app');
            return import('.');
        }),
    },

    {
        path: '/order/test',
        exact: true,
        isPrivate: true,
        childComponent: <TestComponent />,
        component: lazy(async () => {
            await initModules([MODULES.orderModule], 'app');
            return import('.');
        }),
    },
];
