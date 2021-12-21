import React from 'react';
import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';
import CreateArticle from './components/CreateArticle/CreateArticle';
export default {
    path: MODULES.articleModule.route,
    exact: true,
    isPrivate: true,
    component: lazy(async () => {
        await initModules([MODULES.articleModule], 'app');
        return import('.');
    }),
};

export const childRoutes = [
    {
        path: '/article/create',
        exact: true,
        isPrivate: true,
        childComponent: <CreateArticle />,
        component: lazy(async () => {
            await initModules([MODULES.articleModule], 'app');
            return import('.');
        }),
    },
];
