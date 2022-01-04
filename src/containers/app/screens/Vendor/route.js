import React from 'react';
import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';

export default {
    path: MODULES.vendorModule.route,
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
        await initModules([MODULES.vendorModule], 'app');
        return import('.');
    }),
};

export const childRoutes = [];
