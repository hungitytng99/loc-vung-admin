import React, { useEffect } from 'react';
import { Button, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { isEmptyValue } from 'helpers/check';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GET_PRODUCT_BY_ID } from '../../actions/action';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import './EditVariants.sass';

const EditVariants = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const productId = history.location.pathname.replace('/product/edit-variant/', '');
    const productUpdate = useSelector((state) => state.product.update);

    useEffect(() => {
        if (isEmptyValue(productUpdate.data) && String(productUpdate.data?.id) !== String(productId)) {
            dispatch(GET_PRODUCT_BY_ID({ id: productId }));
        }
    }, [productUpdate.data]);

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };

    return (
        <div className="editVariant">
            <ListHeader title={t('configForProductVariants')}>
                <Space size="small">
                    <Button type="primary">
                        <Link to="/product">{t('back')}</Link>
                    </Button>
                </Space>
            </ListHeader>
        </div>
    );
};

export default EditVariants;
