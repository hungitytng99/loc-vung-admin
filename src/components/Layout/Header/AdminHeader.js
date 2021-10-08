import React from 'react';
import { Avatar, Layout, Menu, Dropdown, Divider, Badge } from 'antd';
import 'components/Layout/Header/AdminHeader.sass';
import { sliderWidth } from 'components/Layout/Layout/AdminLayout';
import { BarsOutlined, BellOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useTranslation } from 'react-i18next';

const { Header } = Layout;

function AdminHeader({ collapseSider, handleCollapse }) {
    const { t } = useTranslation();
    return (
        <Header
            className="header"
            style={collapseSider ? { left: `${sliderWidth.collapse}px` } : { left: `${sliderWidth.normal}px` }}
        >
            <div className="header__bars" onClick={handleCollapse}>
                <BarsOutlined />
            </div>
            <div className="header__right">
                <div className="header__right-notify">
                    <Badge dot={true}>
                        <BellOutlined className="notify__icon" style={{ fontSize: '20px', color: '#646464'}} />
                    </Badge>
                </div>
                <Dropdown
                    overlay={
                        <Menu style={{ width: '200px', padding: '6px 0px' }}>
                            <div className="username">
                                <strong>Username</strong>
                                <div className="active" />
                            </div>
                            <Divider style={{ margin: '2px' }} />
                            <Menu.Item>
                                <div>{t('changePassword')}</div>
                            </Menu.Item>
                            <Menu.Item>
                                <div>{t('accountSetting')}</div>
                            </Menu.Item>
                            <Divider style={{ margin: '2px' }} />
                            <Menu.Item>
                                <div style={{ fontWeight: '550', color: '#666' }}>{t('logout')}</div>
                            </Menu.Item>
                        </Menu>
                    }
                    placement="bottomRight"
                    arrow
                    trigger={['click']}
                >
                    <Avatar size={40} className="header__right-avatar">
                        USER
                    </Avatar>
                </Dropdown>
            </div>
        </Header>
    );
}

export default AdminHeader;
