import React from 'react';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import './EditVariantForm.sass';
import { Form, Input, Button, Col, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PRODUCT_VARIANT } from '../../actions/action';
import { REQUEST_STATE } from 'app-configs';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import { getImageWithId } from 'helpers/media';

function EditVariantForm({ variant }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const productVariant = useSelector((state) => state.product.variant);

    const onFinish = (values) => {
        const params = {
            ...values,
            options: variant.options,
        };
        dispatch(UPDATE_PRODUCT_VARIANT({ id: variant.id, productId: productVariant?.data.id, variant: params }));
        // dispatch(CREATE_PRODUCT(params));
    };

    return (
        <div className="editVariantForm">
            <ListHeader title={`${productVariant?.data?.title} (${variant?.publicTitle})`} />
            <Form
                name="basic"
                form={form}
                initialValues={variant}
                onFinish={onFinish}
                autoComplete="off"
                layout="inline"
                size="large"
                style={{ padding: '10px 0px' }}
            >
                <Col span={12}>
                    <Form.Item
                        className="editVariantFormItem"
                        label={t('price')}
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: t('thisFieldIsRequired'),
                            },
                        ]}
                    >
                        <Input style={{ fontSize: '14px' }} type="number" placeholder={t('enterProductPrice')} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        className="editVariantFormItem"
                        label={t('comparePrice')}
                        name="comparePrice"
                        rules={[
                            {
                                required: true,
                                message: t('thisFieldIsRequired'),
                            },
                        ]}
                    >
                        <Input style={{ fontSize: '14px' }} type="number" placeholder={t('enterProductComparePrice')} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item className="editVariantFormItem" label={t('availableProducts')} name="availableNumber">
                        <Input
                            type="number"
                            style={{ fontSize: '14px' }}
                            placeholder={t('enternumberOfAvailableProducts')}
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        className="editVariantFormItem"
                        label={t('productImage')}
                        name="featureImageId"
                        required
                        rules={[
                            {
                                required: true,
                                message: t('thisFieldIsRequired'),
                            },
                        ]}
                    >
                        <Radio.Group
                            onChange={() => {}}
                            value={variant?.featureImageId}
                            style={{ display: 'flex', flexWrap: 'wrap' }}
                        >
                            {productVariant?.data?.media.map((media) => {
                                return (
                                    <>
                                        <Radio
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            value={media?.id}
                                        >
                                            <img
                                                style={{ width: '100%' }}
                                                src={getImageWithId(media?.id)}
                                                alt={media?.link}
                                            />
                                        </Radio>
                                    </>
                                );
                            })}
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <div className="editVariantFormSubmit">
                    <Button size="middle" type="primary" htmlType="submit">
                        {t('update')}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default EditVariantForm;
