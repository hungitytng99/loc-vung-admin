import React from 'react';
import { Button } from 'antd';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './AddHotOrder.sass';

function AddHotOrder(props) {
    const { t } = useTranslation();
    return (
        <div className="add-order">
            <ListHeader title={t('addHotOrder')}>
                <Button type="primary">
                    <Link to="/order">{t('back')}</Link>
                </Button>
            </ListHeader>
        </div>
    );
}

export default AddHotOrder;
