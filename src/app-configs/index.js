// List icon for routes
import React from 'react';
import { UserOutlined, ShopOutlined, EditOutlined, ShoppingCartOutlined } from '@ant-design/icons';

export const Configs = {
    BASE_API: '',
    DOMAIN: '',

    CURRENT_PAGE: 1,
    FILE_MAXIMUM: 2, //MB
    PAGE_SIZE_20: 20,
    PAGE_SIZE_4: 4,
};

export const REQUEST_STATE = {
    ERROR: 'ERROR',
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
};
export const I18LANGUAGE = 'i18nextLng';

// 1. UI flow: add router
export const MODULES = {
    dashboardModule: {
        key: 'dashboard',
        path: 'Dashboard',
        route: '/',
        icon: <ShopOutlined />,
        displayOnSidebar: true,
    },
    postModule: {
        key: 'post',
        path: 'Post',
        route: '/post',
        icon: <ShopOutlined />,
        displayOnSidebar: true,
    },
    productModule: {
        key: 'product',
        path: 'Product',
        route: '/product',
        icon: <EditOutlined />,
        displayOnSidebar: true,
    }
}
