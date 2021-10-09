import React from 'react';
import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';
import CreateProduct from './components/CreateProduct/CreateProduct';
import EditProduct from './components/EditProduct/EditProduct';
import AddHotProduct from './components/AddHotProduct/AddHotProduct';

export default {
    path: MODULES.productModule.route,
    exact: true,
    component: lazy(async () => {
        await initModules([MODULES.productModule], 'app');
        return import('.');
    }),
};

export const childRoutes = [
    {
        path: '/product/create',
        exact: true,
        isPrivate: true,
        childComponent: <CreateProduct />,
        component: lazy(async () => {
            await initModules([MODULES.productModule], 'app');
            return import('.');
        }),
    },
    {
        path: '/product/add-hot-product',
        exact: true,
        isPrivate: true,
        childComponent: <AddHotProduct />,
        component: lazy(async () => {
            await initModules([MODULES.productModule], 'app');
            return import('.');
        }),
    },
    {
        path: '/product/edit-product/:id',
        exact: true,
        isPrivate: true,
        childComponent: <EditProduct />,
        component: lazy(async () => {
            await initModules([MODULES.productModule], 'app');
            return import('.');
        }),
    },
];
