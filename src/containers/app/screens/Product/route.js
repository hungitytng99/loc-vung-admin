import React from 'react';
import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';

export default {
    path: MODULES.productModule.route,
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
        await initModules([MODULES.productModule], 'app');
        return import('.');
    }),
};

export const childRoutes = [
    {
        path: `${MODULES.productModule.route}/create`,
        exact: true,
        isPrivate: true,
        component: lazy(async () => {
            await initModules([MODULES.productModule, MODULES.vendorModule, MODULES.collectionModule], 'app');
            return import('./components/CreateProduct/CreateProduct');
        }),
    },
    {
        path: `${MODULES.productModule.route}/product/add-hot-product`,
        exact: true,
        isPrivate: true,
        component: lazy(async () => {
            await initModules([MODULES.productModule], 'app');
            return import('./components/AddHotProduct/AddHotProduct');
        }),
    },
    {
        path: `${MODULES.productModule.route}/edit-product/:id`,
        exact: true,
        isPrivate: true,
        component: lazy(async () => {
            await initModules([MODULES.productModule, MODULES.vendorModule, MODULES.collectionModule], 'app');
            return import('./components/EditProduct/EditProduct');
        }),
    },
    {
        path: `${MODULES.productModule.route}/edit-variant/:id`,
        exact: true,
        isPrivate: true,
        component: lazy(async () => {
            await initModules([MODULES.productModule], 'app');
            return import('./components/EditVariants/EditVariants');
        }),
    },
];
