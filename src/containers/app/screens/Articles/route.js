import React from 'react';
import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';
import CreateProduct from './components/CreateProduct/CreateProduct';
export default {
    path: MODULES.articleModule.route,
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
        await initModules([MODULES.articleModule], 'app');
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
            await initModules([MODULES.articleModule], 'app');
            return import('.');
        }),
    },
];
