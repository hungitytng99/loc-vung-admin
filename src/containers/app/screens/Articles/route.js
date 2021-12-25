import React from 'react';
import { MODULES } from 'app-configs';
import { lazy } from 'react';
import { initModules } from 'router/index';
import CreateArticle from './components/CreateArticle/CreateArticle';
import EditArticles from './components/EditArticle/EditArticle';
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
        path: '/articles/create',
        exact: true,
        isPrivate: true,
        childComponent: <CreateArticle />,
        component: lazy(async () => {
            await initModules([MODULES.articleModule], 'app');
            return import('.');
        }),
    },
    {
        path: '/articles/edit-articles/:id',
        exact: true,
        isPrivate: true,
        childComponent: <EditArticles />,
        component: lazy(async () => {
            await initModules([MODULES.articleModule], 'app');
            return import('.');
        }),
    },
];
