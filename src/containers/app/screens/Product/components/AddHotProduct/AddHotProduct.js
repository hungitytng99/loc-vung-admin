import React from 'react';
import { Button } from 'antd';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './AddHotProduct.sass';

function AddHotProduct(props) {
    const { t } = useTranslation();
    return (
        <div className="add-product">
            <ListHeader title={t('addHotProduct')}>
                <Button type="ghost">
                    <Link to="/product">{t('back')}</Link>
                </Button>
            </ListHeader>
        </div>
    );
}

export default AddHotProduct;
