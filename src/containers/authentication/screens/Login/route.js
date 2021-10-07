import { lazy } from 'react';
import { initModules } from 'router';
export const loginModule = { key: 'login', path: 'Login' };

const container = 'authentication';
export default {
    path: '/login',
    exact: true,
    isPrivate: false,
    component: lazy(async () => {
        await initModules([loginModule], container);
        return import('.');
    }),
};
