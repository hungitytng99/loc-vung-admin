import { lazy } from 'react';
import { initModules } from 'router/index';
export const workspaceModule = { key: 'workspace', path: 'Workspace' };

export default {
    path: '/',
    exact: true,
    component: lazy(async () => {
        await initModules([workspaceModule], 'app');
        return import('.');
    }),
};
