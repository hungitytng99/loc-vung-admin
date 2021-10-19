import React from 'react';
import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';
import CreateProduct from './components/CreateProduct/CreateProduct';
import EditProduct from './components/EditProduct/EditProduct';
import AddHotProduct from './components/AddHotProduct/AddHotProduct';

export default {
    path: MODULES.categoryModule.route,
    exact: true,
    component: lazy(async () => {
        await initModules([MODULES.categoryModule], 'app');
        return import('.');
    }),
};

export const childRoutes = [
    {
        path: '/category/create',
        exact: true,
        isPrivate: true,
        childComponent: <CreateProduct />,
        component: lazy(async () => {
            await initModules([MODULES.categoryModule], 'app');
            return import('.');
        }),
    },
    {
        path: '/category/add-hot-product',
        exact: true,
        isPrivate: true,
        childComponent: <AddHotProduct />,
        component: lazy(async () => {
            await initModules([MODULES.categoryModule], 'app');
            return import('.');
        }),
    },
    {
        path: '/category/edit-product/:id',
        exact: true,
        isPrivate: true,
        childComponent: <EditProduct />,
        component: lazy(async () => {
            await initModules([MODULES.categoryModule], 'app');
            return import('.');
        }),
    },
];
