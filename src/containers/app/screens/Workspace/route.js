import { lazy } from 'react';
import { initModules } from '../../../../router/index';
import { kanbanModule } from '../Kanban/route';
export const workspaceModule = { key: 'workspace', path: 'Workspace' };

export default {
    path: '/admin',
    exact: true,
    component: lazy(async () => {
        await initModules([workspaceModule, kanbanModule], 'app');
        return import('.');
    }),
};

