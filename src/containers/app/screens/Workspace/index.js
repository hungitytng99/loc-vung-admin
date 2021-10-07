import React from 'react';
import { Layout } from 'antd';

import 'assets/scss/Workspace.scss';
import { useTranslation } from 'react-i18next';

const { Content } = Layout;

const Workspace = (props) => {
    const { t } = useTranslation();
    return (
        <Layout style={{ height: '100vh' }}>
            <Content id="workspace-content-container">{t('content')}</Content>
        </Layout>
    );
};

export default Workspace;
