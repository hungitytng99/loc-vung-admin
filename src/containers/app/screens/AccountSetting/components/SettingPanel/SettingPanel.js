import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import 'react-medium-image-zoom/dist/styles.css';
import './SettingPanel.sass';
import UpdateProfileDetail from '../UpdateProfileDetail/UpdateProfileDetail';
import ChangePassword from '../ChangePassword/ChangePassword';

const { TabPane } = Tabs;
function SettingPanel(props) {
    const { t } = useTranslation();
    return (
        <div>
            <Row>
                <Col span={24}>
                    <Col offset={6} span={12} className="accountSetting">
                        <div className="accountSettingCreateHeader">
                            <ListHeader title={t('accountSetting')} />
                        </div>
                        <Tabs tabPosition="left">
                            <TabPane className="accountSettingProfile" tab={t('profileDetailInformation')} key="1">
                                <UpdateProfileDetail />
                            </TabPane>
                            <TabPane tab="changePassword" key="2">
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
