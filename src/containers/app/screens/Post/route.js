import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';

export default {
    path: MODULES.postModule.route,
    exact: true,
    component: lazy(async () => {
        await initModules([MODULES.postModule], 'app');
        return import('.');
    }),
};
