import React from 'react';
import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';
import CreateCategory from './components/CreateCategory/CreateCategory';
import EditCategory from './components/EditCategory/EditCategory';
import AddHotCategory from './components/AddHotCategory/AddHotCategory';

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
        childComponent: <CreateCategory />,
        component: lazy(async () => {
            await initModules([MODULES.categoryModule], 'app');
            return import('.');
        }),
    },
    {
        path: '/category/add-hot-category',
        exact: true,
        isPrivate: true,
        childComponent: <AddHotCategory />,
        component: lazy(async () => {
            await initModules([MODULES.categoryModule], 'app');
            return import('.');
        }),
    },
    {
        path: '/category/edit-category/:id',
        exact: true,
        isPrivate: true,
        childComponent: <EditCategory />,
        component: lazy(async () => {
            await initModules([MODULES.categoryModule], 'app');
            return import('.');
        }),
    },
];
