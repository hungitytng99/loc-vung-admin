import React from 'react';
import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';

export default {
    path: MODULES.contactModule.route,
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
        await initModules([MODULES.contactModule], 'app');
        return import('.');
    }),
};

export const childRoutes = [];
