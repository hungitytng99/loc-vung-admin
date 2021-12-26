import React from 'react';
import { Button } from 'antd';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './EditCategory.sass';

function EditCategory(props) {
    const { t } = useTranslation();
    return (
        <div className="edit-category">
            <ListHeader title={t('editCategory')}>
                <Button type="ghost">
                    <Link to="/category">{t('back')}</Link>
                </Button>
            </ListHeader>
        </div>
    );
}

export default EditCategory;
