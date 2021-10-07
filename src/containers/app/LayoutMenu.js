import React, { useState } from 'react';
import { Layout, Menu, Image } from 'antd';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import 'assets/scss/LayoutMenu.scss';
const { Sider, Content, Header } = Layout;
import { useHistory } from 'react-router-dom';
import {
  UserOutlined,
} from '@ant-design/icons';
import { LOCAL_STORAGE } from 'helpers/localStorage';
import { ROUTES } from 'app-configs';
import { I18LANGUAGE } from 'app-configs';

export const sliderWidth = {
  normal: 250,
  collapse: 65,
};
function LayoutMenu(props) {
  const { children } = props;
  const { t } = useTranslation();
  const [collapseSider, setCollapseSider] = useState(
    localStorage.getItem(LOCAL_STORAGE.collapseSider) === 'true',
  );
  const history = useHistory();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        // trigger={null}
        collapsible
        collapsed={collapseSider}
        onCollapse={() => {
          localStorage.setItem(
            LOCAL_STORAGE.collapseSider,
            !collapseSider,
          );
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
                src={collapseSider ? "https://image.similarpng.com/very-thumbnail/2020/04/Beautiful-Facebook-logo-icon-social-media-png.png" : "https://bizweb.dktcdn.net/100/367/937/themes/740363/assets/logo.png?1630998054887"}
                preview={false}
              />
            </Link>
            {
              ROUTES.map(route => {
                if (route.displayOnSidebar) {
                  return (
                    <Menu.Item key={route.href} className="menu-hover" icon={route.icon}>
                      <Link to={route.href} style={{ color: "#fff" }}>
                        {t(route.label)}
                      </Link>
                    </Menu.Item>
                  )
                }
              })
            }
          </Menu>

          <Menu
            theme="dark"
            style={{
              border: 'none',
              backgroundColor: '#292f4c',
            }}
            mode="inline"
            triggerSubMenuAction="hover"
            defaultSelectedKeys={['nothing']}
          >
            <Menu.Item
              key={localStorage.getItem(I18LANGUAGE)}
            >
              <Link
                to={'#'}
                style={{ display: 'block', textAlign: 'center' }}
                onClick={(e) => {
                  e.preventDefault();
                  const lng = localStorage.getItem(I18LANGUAGE) === 'vi' ? 'en' : 'vi';
                  localStorage.setItem(I18LANGUAGE, lng);
                  i18n.changeLanguage(lng);
                }}
              >
                <span style={{ color: '#fff' }}>{t('key')}</span>
              </Link>
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
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            backgroundColor: '#fff',
            position: 'fixed',
            top: '0',
            width: '100%',
            borderBottom: '1px solid #eeeeee'
          }}
        >
        </Header>
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

    // <Layout style={{ minHeight: '100vh' }}>
    //   <Sider
    //     className="slide-left-bar"
    //     collapsed={true}
    //     style={{ backgroundColor: '#292f4c', position: 'relative' }}
    //   >
    //     <div className="flex-col-between" style={{ height: '100%' }}>
    //       <Menu
    //         theme="dark"
    //         style={{ border: 'none', backgroundColor: '#292f4c' }}
    //         mode="inline"
    //         triggerSubMenuAction="hover"
    //         defaultSelectedKeys={['1']}
    //       >

    //         <Menu.Item
    //           className="menu-hover"
    //           key="2222222"
    //           icon={<BellOutlined className="icon-menu" />}
    //           onClick={handleClickActiveNoti}
    //         >
    //           <div>
    //             <div id="Popover1" type="button">
    //               {t('notification')}
    //             </div>
    //           </div>
    //         </Menu.Item>
    //         <Menu.Item
    //           className="menu-hover"
    //           key="3"
    //           icon={<SettingOutlined className="icon-menu" />}
    //         >
    //           <Link to={'/settings'}>
    //             <span style={{ color: '#fff' }}>{t('settings')}</span>
    //           </Link>
    //         </Menu.Item>
    //       </Menu>


    //     </div>
    //   </Sider>
    //   <Content>{children}</Content>
    // </Layout>
  );
}

LayoutMenu.propTypes = {};

export default LayoutMenu;
