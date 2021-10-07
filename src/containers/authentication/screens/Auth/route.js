import { lazy } from 'react';

const container = 'authentication';

export default {
    path: '/auth',
    exact: true,
    isPrivate: false,
    component: lazy(async () => {
        return import('.');
    }),
};
