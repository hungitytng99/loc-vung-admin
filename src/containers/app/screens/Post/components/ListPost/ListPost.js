import { Button } from 'antd';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './ListPost.sass';

function ListPost(props) {
    const { t } = useTranslation();
    return (
        <div className="list-post">
            <ListHeader title={t('listPost')}>
                <Button type="primary">
                    <Link to="/post/create">{t('createPost')}</Link>
                </Button>
            </ListHeader>
        </div>
    );
}

export default ListPost;
