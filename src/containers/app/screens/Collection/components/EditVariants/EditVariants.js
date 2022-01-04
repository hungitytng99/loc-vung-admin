import React, { useEffect } from 'react';
import { Button, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { isEmptyValue } from 'helpers/check';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GET_COLLECTION_BY_ID } from '../../actions/action';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import './EditVariants.sass';

const EditVariants = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const collectionId = history.location.pathname.replace('/collection/edit-variant/', '');
    const collectionUpdate = useSelector((state) => state.collection.update);

    useEffect(() => {
        if (isEmptyValue(collectionUpdate.data) && String(collectionUpdate.data?.id) !== String(collectionId)) {
            dispatch(GET_COLLECTION_BY_ID({ id: collectionId }));
        }
    }, [collectionUpdate.data]);

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };

    return (
        <div className="editVariant">
            <ListHeader title={t('configForCollectionVariants')}>
                <Space size="small">
                    <Button type="primary">
                        <Link to="/collection">{t('back')}</Link>
                    </Button>
                </Space>
            </ListHeader>
        </div>
    );
};

export default EditVariants;
