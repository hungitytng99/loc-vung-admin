import React from 'react';
import { Button } from 'antd';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './EditProduct.sass';

function EditProduct(props) {
    const { t } = useTranslation();
    return (
        <div className="edit-product">
            <ListHeader title={t('editProduct')}>
                <Button type="primary">
                    <Link to="/product">{t('back')}</Link>
                </Button>
            </ListHeader>
        </div>
    );
}

export default EditProduct;
