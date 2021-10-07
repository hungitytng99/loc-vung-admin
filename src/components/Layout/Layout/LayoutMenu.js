import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Layout, Menu, Image } from 'antd';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import 'components/Layout/Layout/LayoutMenu.sass';
import { LOCAL_STORAGE } from 'helpers/localStorage';
import { ROUTES } from 'app-configs';
import { I18LANGUAGE } from 'app-configs';
const { Sider, Content, Header } = Layout;

export const sliderWidth = {
    normal: 250,
    collapse: 65,
};
function LayoutMenu(props) {
    const { children } = props;
    const { t } = useTranslation();
    const [collapseSider, setCollapseSider] = useState(localStorage.getItem(LOCAL_STORAGE.collapseSider) === 'true');
    const history = useHistory();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                // trigger={null}
                collapsible
                collapsed={collapseSider}
                onCollapse={() => {
                    localStorage.setItem(LOCAL_STORAGE.collapseSider, !collapseSider);
                    setCollapseSider(!collapseSider);
                }}
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
                        {ROUTES.map((route) => {
                            if (route.displayOnSidebar) {
                                return (
                                    <Menu.Item key={route.href} className="menu-hover" icon={route.icon}>
                                        <Link to={route.href} style={{ color: '#fff' }}>
                                            {t(route.label)}
                                        </Link>
                                    </Menu.Item>
                                );
                            }
                            return <></>;
                        })}
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
                <Header className="header"></Header>
                <Content
                    className="site-layout-background"
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

LayoutMenu.propTypes = {};

export default LayoutMenu;
