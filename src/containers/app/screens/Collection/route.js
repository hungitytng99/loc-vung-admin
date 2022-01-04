import React from 'react';
import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';
import CreateCollection from './components/CreateCollection/CreateCollection';
import EditCollection from './components/EditCollection/EditCollection';
import AddHotCollection from './components/AddHotCollection/AddHotCollection';
import TestComponent from './components/TestComponent/TestComponent';
import EditVariants from './components/EditVariants/EditVariants';

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
        childComponent: <CreateCollection />,
        component: lazy(async () => {
            await initModules([MODULES.collectionModule], 'app');
            return import('.');
        }),
    },
    {
        path: '/collection/add-hot-collection',
        exact: true,
        isPrivate: true,
        childComponent: <AddHotCollection />,
        component: lazy(async () => {
            await initModules([MODULES.collectionModule], 'app');
            return import('.');
        }),
    },
    {
        path: '/collection/edit-collection/:id',
        exact: true,
        isPrivate: true,
        childComponent: <EditCollection />,
        component: lazy(async () => {
            await initModules([MODULES.collectionModule], 'app');
            return import('.');
        }),
    },
    {
        path: '/collection/edit-variant/:id',
        exact: true,
        isPrivate: true,
        childComponent: <EditVariants />,
        component: lazy(async () => {
            await initModules([MODULES.collectionModule], 'app');
            return import('.');
        }),
    },

    {
        path: '/collection/test',
        exact: true,
        isPrivate: true,
        childComponent: <TestComponent />,
        component: lazy(async () => {
            await initModules([MODULES.collectionModule], 'app');
            return import('.');
        }),
    },
];
