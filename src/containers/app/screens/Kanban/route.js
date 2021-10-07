import { lazy } from 'react';
import { initModules } from '../../../../router/index';
export const kanbanModule = { key: 'kanban', path: 'Kanban' };

export default {
    path: '/kanban',
    exact: true,
    component: lazy(async () => {
        await initModules([kanbanModule], 'app');
        return import('.');
    }),
};
