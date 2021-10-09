import React from 'react';
import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';
import CreatePost from './components/CreatePost/CreatePost';

export default {
    path: MODULES.postModule.route,
    exact: true,
    component: lazy(async () => {
        await initModules([MODULES.postModule], 'app');
        return import('.');
    }),
};

export const childRoutes = [
    {
        path: '/post/create',
        exact: true,
        isPrivate: true,
        childComponent: <CreatePost />,
        component: lazy(async () => {
            await initModules([MODULES.postModule], 'app');
            return import('.');
        }),
    },
    // {
    //     path: '/product/add-hot-product',
    //     exact: true,
    //     isPrivate: true,
    //     childComponent: <AddHotProduct />,
    //     component: lazy(async () => {
    //         await initModules([MODULES.postModule], 'app');
    //         return import('.');
    //     }),
    // },
    // {
    //     path: '/product/edit-product/:id',
    //     exact: true,
    //     isPrivate: true,
    //     childComponent: <EditProduct />,
    //     component: lazy(async () => {
    //         await initModules([MODULES.postModule], 'app');
    //         return import('.');
    //     }),
    // },
];
