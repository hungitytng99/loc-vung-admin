// List icon for routes
import React from 'react';
import {
    ProfileOutlined,
    UserOutlined,
    ShopOutlined,
    CreditCardOutlined,
    EditOutlined,
    ShoppingCartOutlined,
    DashboardOutlined,
} from '@ant-design/icons';
// SWAGGER:
// http://locvungshop.southeastasia.cloudapp.azure.com:4000/api-docs/
export const Configs = {
    BASE_API: 'http://locvungshop.southeastasia.cloudapp.azure.com:4000/api/v1',
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

export const ACTION_TYPE = {
    CREATE: 'CREATE',
    LIST: 'LIST',
    VIEW: 'VIEW',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    UNMOUNT: 'UNMOUNT',
};

// 1. UI flow: add router
export const MODULES = {
    dashboardModule: {
        key: 'dashboard', // Unique
        path: 'Dashboard', // Folder name in `src/containers/app/screens`
        route: '/', // Route defined
        icon: <DashboardOutlined />, // Icon
        displayOnSidebar: true,
    },
    categoryModule: {
        key: 'category',
        path: 'Category',
        route: '/category',
        icon: <ProfileOutlined />,
        displayOnSidebar: true,
    },
    productModule: {
        key: 'product',
        path: 'Product',
        route: '/product',
        icon: <ShopOutlined />,
        displayOnSidebar: true,
    },
    orderModule: {
        key: 'order',
        path: 'Order',
        route: '/order',
        icon: <ShoppingCartOutlined />,
        displayOnSidebar: true,
    },
    postModule: {
        key: 'post',
        path: 'Post',
        route: '/post',
        icon: <EditOutlined />,
        displayOnSidebar: true,
    },
    userModule: {
        key: 'user',
        path: 'User',
        route: '/user',
        icon: <UserOutlined />,
        displayOnSidebar: true,
    },
    paymnetModule: {
        key: 'payment',
        path: 'Payment',
        route: '/payment',
        icon: <CreditCardOutlined />,
        displayOnSidebar: true,
    },
};
