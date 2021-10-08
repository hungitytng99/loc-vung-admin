import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';

export default {
    path: MODULES.productModule.route,
    exact: true,
    component: lazy(async () => {
        await initModules([MODULES.productModule], 'app');
        return import('.');
    }),
};
