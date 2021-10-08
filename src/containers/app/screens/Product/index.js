import React from 'react';
import { Layout } from 'antd';

import { useTranslation } from 'react-i18next';

const { Content } = Layout;

const Product = (props) => {
    const { t } = useTranslation();
    return (
        <div>
            Product
        </div>
    );
};

export default Product;
