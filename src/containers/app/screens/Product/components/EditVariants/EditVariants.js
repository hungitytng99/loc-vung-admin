import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, Input, Row, Space, Tooltip } from 'antd';
import { MinusCircleOutlined, PlusOutlined, WarningOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { isEmptyValue } from 'helpers/check';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GET_PRODUCT_BY_ID } from '../../actions/action';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import './EditVariants.sass';
import EditVariantForm from '../EditVariantForm/EditVariantForm';
import { REQUEST_STATE } from 'app-configs';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';

const EditVariants = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [productId, setProductId] = useState(history.location.pathname.replace('/product/edit-variant/', ''));
    const productUpdate = useSelector((state) => state.product?.update);
    const productVariant = useSelector((state) => state.product?.variant);

    useEffect(() => {
        if (isEmptyValue(productUpdate.data) && String(productUpdate.data?.id) !== String(productId)) {
            dispatch(GET_PRODUCT_BY_ID({ id: productId }));
        }
    }, [productUpdate?.data]);

    useEffect(() => {
        const newProductId = history.location.pathname.replace('/product/edit-variant/', '');
        if (productId !== newProductId) {
            setProductId(newProductId);
        }
    }, [history.location.pathname]);

    return (
        <div className="editVariant">
            {productVariant?.getDetailState === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
            <ListHeader title={t('configForProductVariants')}>
                <Space size="small">
                    <Tooltip title={t('ifHasErrorPleaseReloadPage')}>
                        <WarningOutlined style={{ marginBottom: '6px' }} />
                    </Tooltip>
                    <Button type="ghost">
                        <Link to="/product">{t('back')}</Link>
                    </Button>
                </Space>
            </ListHeader>
            <div className="editVariantContent">
                <Row>
                    {productUpdate.data?.variants?.map((variant, index) => {
                        return (
                            <>
                                <Col span={11}>
                                    <EditVariantForm variant={variant} />
                                </Col>
                                {index % 2 === 0 && <Col span={2} />}
                                {index % 2 === 1 && <Divider />}
                            </>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
};

export default EditVariants;
