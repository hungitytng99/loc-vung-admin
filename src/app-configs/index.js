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
export const ROUTES = [
    {
        href: '/',
        label: 'product',
        icon: <ShopOutlined />,
        displayOnSidebar: true,
        childs: [],
    },
    {
        href: '/post',
        label: 'post',
        icon: <EditOutlined />,
        displayOnSidebar: true,
        childs: [],
    },
    {
        href: '/user',
        label: 'userManagement',
        icon: <UserOutlined />,
        displayOnSidebar: true,
        childs: [],
    },
    {
        href: '/order',
        label: 'order',
        icon: <ShoppingCartOutlined />,
        displayOnSidebar: true,
        childs: [],
    },
];

export const I18LANGUAGE = 'i18nextLng';
