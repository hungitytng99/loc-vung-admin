import React, { useState } from 'react';
import { Button } from 'antd';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './CreatePost.sass';
import CKEditor from 'components/Editor/CKEditor';

function CreatePost(props) {
    const { t } = useTranslation();
    const [content, setContent] = useState('<p></p>');
    const [items, setItems] = useState([]);
    return (
        <div className="create-post">
            <ListHeader title={t('createPost')}>
                <Button type="primary">
                    <Link to="/product">{t('back')}</Link>
                </Button>
            </ListHeader>
            <CKEditor onTextChange={setContent} initContent={content} items={items} />
        </div>
    );
}

export default CreatePost;
