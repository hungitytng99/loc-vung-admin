import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';

// 2. UI flow: copy folder and config route
export default {
    path: MODULES.dashboardModule.route,
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
        await initModules([MODULES.dashboardModule], 'app');
        return import('.');
    }),
};

export const childRoutes = [];
