import React from 'react';
import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';

export default {
    path: MODULES.collectionModule.route,
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
        await initModules([MODULES.collectionModule], 'app');
        return import('.');
    }),
};

export const childRoutes = [
    {
        path: '/collection/create',
        exact: true,
        isPrivate: true,
        component: lazy(async () => {
            await initModules([MODULES.collectionModule], 'app');
            return import('./components/CreateCollection/CreateCollection');
        }),
    },
    {
        path: '/collection/edit-collection/:id',
        exact: true,
        isPrivate: true,
        component: lazy(async () => {
            await initModules([MODULES.collectionModule], 'app');
            return import('./components/EditCollection/EditCollection');
        }),
    },
];
