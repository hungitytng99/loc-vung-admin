import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import 'react-medium-image-zoom/dist/styles.css';
import './SettingPanel.sass';
import UpdateProfileDetail from '../UpdateProfileDetail/UpdateProfileDetail';
import ChangePassword from '../ChangePassword/ChangePassword';
import { useHistory } from 'react-router';

const { TabPane } = Tabs;
function SettingPanel({ currentTab }) {
    const [activeTab, setActiveTab] = useState(currentTab);
    const history = useHistory();
    useEffect(() => {
        setActiveTab(currentTab);
    }, [currentTab]);
    const { t } = useTranslation();
    return (
        <div>
            <Row>
                <Col span={24}>
                    <Col offset={6} span={12} className="accountSetting">
                        <div className="accountSettingCreateHeader">
                            <ListHeader title={t('accountSetting')} />
                        </div>
                        <Tabs
                            defaultActiveKey={activeTab}
                            activeTab={activeTab}
                            onTabClick={(tabKey) => {
                                history.push(`#${tabKey}`);
                            }}
                            tabPosition="left"
                        >
                            <TabPane
                                className="accountSettingProfile"
                                tab={t('profileDetailInformation')}
                                key="project-detail"
                            >
                                <UpdateProfileDetail />
                            </TabPane>
                            <TabPane tab="changePassword" key="change-password">
                                <ChangePassword />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Col>
            </Row>
        </div>
    );
}

export default React.memo(SettingPanel);
