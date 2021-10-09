import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Layout, Menu, Image } from 'antd';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import 'components/Layout/Layout/AdminLayout.sass';
import { LOCAL_STORAGE } from 'helpers/localStorage';
import { I18LANGUAGE } from 'app-configs';
import AdminHeader from 'components/Layout/Header/AdminHeader';
import { MODULES } from 'app-configs';
const { Sider, Content } = Layout;

export const sliderWidth = {
    normal: 250,
    collapse: 65,
};
function AdminLayout(props) {
    const { children } = props;
    const { t } = useTranslation();
    const [collapseSider, setCollapseSider] = useState(localStorage.getItem(LOCAL_STORAGE.collapseSider) === 'true');
    const history = useHistory();

    function handleCollapse() {
        localStorage.setItem(LOCAL_STORAGE.collapseSider, !collapseSider);
        setCollapseSider(!collapseSider);
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapseSider}
                onCollapse={handleCollapse}
                style={{ position: 'fixed', top: '0', minHeight: '100vh' }}
                width={sliderWidth.normal}
                collapsedWidth={sliderWidth.collapse}
            >
                <div className="flex-col-between" style={{ height: 'calc( 100vh - 45px )' }}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[history.location.pathname]}>
                        <Link to={'/'} style={{ display: 'block', padding: '8px' }}>
                            <Image
                                className="icon-home-page"
                                width="100%"
                                src={
                                    collapseSider
                                        ? 'https://image.similarpng.com/very-thumbnail/2020/04/Beautiful-Facebook-logo-icon-social-media-png.png'
                                        : 'https://bizweb.dktcdn.net/100/367/937/themes/740363/assets/logo.png?1630998054887'
                                }
                                preview={false}
                            />
                        </Link>
                        {
                            Object.keys(MODULES).map((key) => {
                                if (MODULES[key].displayOnSidebar) {
                                    return (
                                        <Menu.Item key={MODULES[key].route} className="menu-hover" icon={MODULES[key].icon}>
                                            <Link to={MODULES[key].route} style={{ color: '#fff' }}>
                                                {t(MODULES[key].key)}
                                            </Link>
                                        </Menu.Item>
                                    );
                                }
                                return <></>;
                            })
                        }
                    </Menu>
                    <Menu
                        theme="dark"
                        style={{
                            border: 'none',
                            backgroundColor: '#292f4c',
                        }}
                        defaultSelectedKeys={['nothing']}
                    >
                        <Menu.Item key={localStorage.getItem(I18LANGUAGE)}>
                            <div
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const lng = localStorage.getItem(I18LANGUAGE) === 'vi' ? 'en' : 'vi';
                                    localStorage.setItem(I18LANGUAGE, lng);
                                    i18n.changeLanguage(lng);
                                }}
                            >
                                <span style={{ color: '#fff' }}>{t('key')}</span>
                            </div>
                        </Menu.Item>
                    </Menu>
                </div>
            </Sider>
            <Layout
                className="site-layout"
                style={
                    collapseSider
                        ? { marginLeft: `${sliderWidth.collapse}px` }
                        : { marginLeft: `${sliderWidth.normal}px` }
                }
            >
                <AdminHeader collapseSider={collapseSider} handleCollapse={handleCollapse} />
                <Content
                    className="admin-layout__content"
                    style={{
                        margin: '90px 30px 24px 30px',
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
