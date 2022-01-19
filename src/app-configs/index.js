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
    GroupOutlined,
    OrderedListOutlined,
} from '@ant-design/icons';
// SWAGGER:
// http://locvungshop.southeastasia.cloudapp.azure.com:4000/api-docs/
export const Configs = {
    BASE_API: process.env.REACT_APP_BASE_API_URL,
    DOMAIN: '',

    HOMEPAGE_ROUTE: '/product',

    CURRENT_PAGE: 1,
    FILE_MAXIMUM: 5, //MB
    PAGE_SIZE_20: 20,
    PAGE_SIZE_4: 4,
};

export const REQUEST_STATE = {
    ERROR: 'ERROR',
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
};

// key store in localStorage, Cookies, Session
export const I18LANGUAGE_KEY = 'i18nextLng';
export const TOKEN_KEY = 'authencation';

export const ACTION_TYPE = {
    CREATE: 'CREATE',
    LIST: 'LIST',
    VIEW: 'VIEW',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    UNMOUNT: 'UNMOUNT',
};

export const PRODUCT_STATUS = [
    { color: 'volcano', value: 'daft' },
    { color: 'green', value: 'active' },
];

export const COLLECTION_STATUS = [
    { color: 'volcano', value: 'daft' },
    { color: 'green', value: 'active' },
];
export const VALID_IMAGE_TYPES = ['image/gif', 'image/jpeg', 'image/png'];

export const ORDER_STATUS = {
    NEW: 'NEW',
    COMMING: 'INCOMING',
    DONE: 'DONE',
    CANCEL: 'CANCEL',
};

// 1. UI flow: add router
export const MODULES = {
    dashboardModule: {
        key: 'dashboard', // Unique
        path: 'Dashboard', // Folder name in `src/containers/app/screens`
        route: '/dashboard', // Route defined
        icon: <DashboardOutlined />, // Icon
        displayOnSidebar: false,
    },
    productModule: {
        key: 'product',
        path: 'Product',
        route: '/product',
        icon: <ShopOutlined />,
        displayOnSidebar: true,
    },
    collectionModule: {
        key: 'collection',
        path: 'Collection',
        route: '/collection',
        icon: <OrderedListOutlined />,
        displayOnSidebar: true,
    },
    articleModule: {
        key: 'articles',
        path: 'Articles',
        route: '/articles',
        icon: <EditOutlined />,
        displayOnSidebar: true,
    },
    orderModule: {
        key: 'order',
        path: 'Order',
        route: '/order',
        icon: <ShoppingCartOutlined />,
        displayOnSidebar: true,
    },
    contactModule: {
        key: 'contact',
        path: 'Contact',
        route: '/contact',
        icon: <UserOutlined />,
        displayOnSidebar: true,
    },
    vendorModule: {
        key: 'vendor',
        path: 'Vendor',
        route: '/vendor',
        icon: <GroupOutlined />,
        displayOnSidebar: true,
    },
    accountSettingModule: {
        key: 'accountSetting',
        path: 'AccountSetting',
        route: '/account-setting',
        displayOnSidebar: false,
    },
};
