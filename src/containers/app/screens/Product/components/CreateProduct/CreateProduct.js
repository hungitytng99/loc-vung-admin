import React from 'react';
import { Button } from 'antd';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './CreateProduct.sass';

function CreateProduct(props) {
    const { t } = useTranslation();
    return (
        <div className="add-product">
            <ListHeader title={t('addProduct')}>
                <Button type="primary">
                    <Link to="/product">{t('back')}</Link>
                </Button>
            </ListHeader>
        </div>
    );
}

export default CreateProduct;
