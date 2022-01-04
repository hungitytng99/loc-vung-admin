import React from 'react';
import { Button } from 'antd';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './AddHotCollection.sass';

function AddHotCollection(props) {
    const { t } = useTranslation();
    return (
        <div className="add-collection">
            <ListHeader title={t('addHotCollection')}>
                <Button type="primary">
                    <Link to="/collection">{t('back')}</Link>
                </Button>
            </ListHeader>
        </div>
    );
}

export default AddHotCollection;
