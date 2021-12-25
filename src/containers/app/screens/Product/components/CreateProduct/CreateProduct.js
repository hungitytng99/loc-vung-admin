import React, { useEffect, useState } from 'react';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import './CreateProduct.sass';
import { Form, Input, Button, Select, Upload, Col, Divider, Modal, Checkbox, Row, Tooltip, Badge } from 'antd';
import { PRODUCT_STATUS } from 'app-configs';
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_PRODUCT } from '../../actions/action';
import { REQUEST_STATE } from 'app-configs';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import { getBase64 } from 'helpers/media';

const { Option } = Select;

function CreateProduct(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [productImages, setProductImages] = useState([]);
    const [hasOptions, setHasOptions] = useState(false);
    const history = useHistory();

    const [previewProductStatus, setPreviewProductStatus] = useState({
        image: '',
        title: '',
        isShow: false,
    });
    const productCreate = useSelector((state) => state.product.create);
    const productUpdate = useSelector((state) => state.product.update);

    const onFinish = (values) => {
        const params = {
            ...values,
            media: productImages,
            status: t(values.status),
            options: values.options
                ? values.options.map((option) => {
                      return {
                          ...option,
                          values: option.values.map((value) => value.value),
                      };
                  })
                : null,
        };
        dispatch(CREATE_PRODUCT(params));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function handleHidePreviewModal() {
        setPreviewProductStatus({
            isShow: false,
        });
    }
    async function handlePreviewProductImage(file) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewProductStatus({
            image: file.url || file.preview,
            isShow: true,
            title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    }

    function handleChangeUploadImage({ fileList }) {
        setProductImages(fileList);
    }

    function handleChangeOptions() {
        setHasOptions(!hasOptions);
    }

    useEffect(() => {
        if (productCreate?.state === REQUEST_STATE.SUCCESS) {
            form.resetFields();
            setProductImages([]);
            if (hasOptions && productUpdate?.data.id) {
                history.push(`/product/edit-variant/${productUpdate?.data.id}`);
            }
        }
    }, [productCreate?.state]);

    return (
        <div className="create-product">
            {productCreate?.state === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
            <ListHeader title={t('addProduct')}>
                <Button type="primary">
                    <Link to="/product">{t('back')}</Link>
                </Button>
            </ListHeader>
            <div className="create-product__form">
                <Form
                    name="basic"
                    form={form}
                    initialValues={{
                        status: PRODUCT_STATUS[0].value,
                        options: [
                            {
                                title: '',
                                values: [''],
                            },
                        ],
                        availableNumber: 0,
                        price: 0,
                        comparePrice: 0,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="inline"
                    size="large"
                >
                    <Col className="flex-height-center" style={{ marginBottom: '10px' }} span={24}>
                        <span className="createProductLabel">{t('productStatus')}</span>
                        <Tooltip title={t('theProductWillBeHiddenOrVisibleFromAllSalesChannel ')}>
                            <QuestionCircleOutlined className="createProductLabelInfo" style={{ marginLeft: '6px' }} />
                        </Tooltip>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="create-product__item"
                            label={t('status')}
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                        >
                            <Select style={{ width: 160 }} size="middle">
                                {PRODUCT_STATUS.map((productStatus) => {
                                    return (
                                        <Option key={productStatus.value} value={productStatus.value}>
                                            <span>{t(productStatus.value)}</span>
                                            <Badge style={{ marginLeft: '4px' }} color={productStatus.color} />
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Divider style={{ margin: '10px 0px' }} />

                    <Col span={24}>
                        <div className="createProductLabel">{t('productInformation')}</div>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="create-product__item"
                            label={t('productName')}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                        >
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterProductName')} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item className="create-product__item" label={t('description')} name="description">
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterProductDescription')} />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            className="create-product__item"
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
                    <Col span={8}>
                        <Form.Item
                            className="create-product__item"
                            label={t('comparePrice')}
                            name="comparePrice"
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                        >
                            <Input
                                style={{ fontSize: '14px' }}
                                type="number"
                                placeholder={t('enterProductComparePrice')}
                            />
                        </Form.Item>
                    </Col>
                    {/* <Col span={8}>
                        <Form.Item className="create-product__item" label={t('productUrl')} name="url">
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterProductURL')} />
                        </Form.Item>
                    </Col> */}
                    <Col span={8}>
                        <Form.Item className="create-product__item" label={t('vendorId')} name="vendorId">
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterProductVendor')} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="create-product__item"
                            label={t('availableProducts')}
                            name="availableNumber"
                        >
                            <Input
                                type="number"
                                style={{ fontSize: '14px' }}
                                placeholder={t('enternumberOfAvailableProducts')}
                            />
                        </Form.Item>
                    </Col>
                    <Divider style={{ margin: '10px 0px' }} />
                    <Col span={24}>
                        <div className="createProductLabel">{t('listProductImages')}</div>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            className="create-product__item"
                            label={t('media')}
                            name="media"
                            required
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || productImages.length === 0) {
                                            return Promise.reject(new Error(t('youMustUploadAtLeast1Image')));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Upload
                                accept="image/*"
                                onPreview={handlePreviewProductImage}
                                listType="picture-card"
                                customRequest={({ onSuccess }) => onSuccess('ok')}
                                fileList={productImages}
                                onChange={handleChangeUploadImage}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Divider style={{ margin: '10px 0px' }} />
                    <Col span={24}>
                        <div className="createProductLabel">{t('options')}</div>
                    </Col>
                    <Checkbox checked={hasOptions} onChange={handleChangeOptions}>
                        <span>{t('thisProductHasOptionsLikeSizeOrColor')}</span>
                    </Checkbox>
                    <Col span={24}></Col>
                    {hasOptions && (
                        <>
                            <Form.List
                                name="options"
                                rules={[
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || value.length === 0) {
                                                return Promise.reject(new Error(t('youMustAddAtLeast1Option')));
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <Col span={24}>
                                        <Col span={24}>
                                            <Button
                                                size="middle"
                                                type="ghost"
                                                onClick={() => add()}
                                                icon={<PlusOutlined />}
                                                disabled={
                                                    form.getFieldValue('options')
                                                        ? form.getFieldValue('options').length > 2
                                                        : false
                                                }
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    margin: '6px 0px 14px 0px',
                                                }}
                                            >
                                                {t('addOption')}
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Col>
                                        <Row>
                                            {fields.map((field, index) => {
                                                return (
                                                    <>
                                                        <Col
                                                            span={7}
                                                            key={field.key}
                                                            className="createProductListOptions"
                                                            style={{
                                                                marginTop: '6px',
                                                                border: '1px solid rgba(0, 0, 0, 0.2)',
                                                                padding: '0px 0px 10px 15px',
                                                            }}
                                                        >
                                                            <Row
                                                                style={{
                                                                    fontWeight: 500,
                                                                    height: '37px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <span>{t('optionName')}</span>
                                                            </Row>
                                                            <Row>
                                                                <Col span={22}>
                                                                    <Form.Item
                                                                        {...field}
                                                                        name={[field.name, 'title']}
                                                                        fieldKey={[field.fieldKey, 'title']}
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message: t('thisFieldIsRequired'),
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Input
                                                                            size="middle"
                                                                            placeholder={t('enterOptionName')}
                                                                            style={{
                                                                                height: '37px',
                                                                            }}
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col
                                                                    style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        height: '37px',
                                                                    }}
                                                                    span={2}
                                                                >
                                                                    <DeleteOutlined
                                                                        className="createProductDeleteOption"
                                                                        style={{ marginRight: '8px' }}
                                                                        onClick={() => remove(field.name)}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row
                                                                style={{
                                                                    fontWeight: 500,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    margin: '6px 0px 10px 0px',
                                                                }}
                                                            >
                                                                <span>{t('optionValues')}</span>
                                                            </Row>

                                                            <Form.List
                                                                name={[field.name, 'values']}
                                                                rules={[
                                                                    ({ getFieldValue }) => ({
                                                                        validator(_, value) {
                                                                            if (!value || value.length === 0) {
                                                                                return Promise.reject(
                                                                                    new Error(
                                                                                        t('youMustAddAtLeast1Value'),
                                                                                    ),
                                                                                );
                                                                            }
                                                                            return Promise.resolve();
                                                                        },
                                                                    }),
                                                                ]}
                                                            >
                                                                {(values, { add, remove }, { errors }) => {
                                                                    return (
                                                                        <>
                                                                            <Form.ErrorList errors={errors} />
                                                                            {values.map((value, index) => {
                                                                                return (
                                                                                    <Row
                                                                                        key={value.key}
                                                                                        style={{ margin: '8px 0px' }}
                                                                                    >
                                                                                        <Col span={22}>
                                                                                            <Form.Item
                                                                                                {...value}
                                                                                                name={[
                                                                                                    value.name,
                                                                                                    'value',
                                                                                                ]}
                                                                                                fieldKey={[
                                                                                                    value.fieldKey,
                                                                                                    'value',
                                                                                                ]}
                                                                                                rules={[
                                                                                                    {
                                                                                                        required: true,
                                                                                                        message:
                                                                                                            t(
                                                                                                                'thisFieldIsRequired',
                                                                                                            ),
                                                                                                    },
                                                                                                ]}
                                                                                            >
                                                                                                <Input
                                                                                                    size="middle"
                                                                                                    placeholder={t(
                                                                                                        'enterValue',
                                                                                                    )}
                                                                                                    style={{
                                                                                                        height: '37px',
                                                                                                    }}
                                                                                                />
                                                                                            </Form.Item>
                                                                                        </Col>

                                                                                        <Col
                                                                                            style={{
                                                                                                height: '37px',
                                                                                                display: 'flex',
                                                                                                alignItems: 'center',
                                                                                            }}
                                                                                            span={2}
                                                                                        >
                                                                                            <DeleteOutlined
                                                                                                className="createProductDeleteOption"
                                                                                                style={{
                                                                                                    marginRight: '8px',
                                                                                                }}
                                                                                                onClick={() =>
                                                                                                    remove(value.name)
                                                                                                }
                                                                                            />
                                                                                        </Col>
                                                                                    </Row>
                                                                                );
                                                                            })}

                                                                            <Form.Item>
                                                                                <Button
                                                                                    style={{
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        height: '37px',
                                                                                    }}
                                                                                    size="middle"
                                                                                    type="dashed"
                                                                                    onClick={() => add()}
                                                                                    icon={<PlusOutlined />}
                                                                                >
                                                                                    {t('addAnotherValue')}
                                                                                </Button>
                                                                            </Form.Item>
                                                                        </>
                                                                    );
                                                                }}
                                                            </Form.List>
                                                        </Col>
                                                        <Col span={1}></Col>
                                                    </>
                                                );
                                            })}
                                        </Row>
                                    </Col>
                                )}
                            </Form.List>
                        </>
                    )}

                    <div className="createProductSubmit">
                        <Button size="middle" type="primary" htmlType="submit">
                            {hasOptions ? t('next') : t('submit')}
                        </Button>
                    </div>
                </Form>
                <Modal
                    visible={previewProductStatus.isShow}
                    title={previewProductStatus.title}
                    footer={null}
                    onCancel={handleHidePreviewModal}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewProductStatus.image} />
                </Modal>
            </div>
        </div>
    );
}

export default CreateProduct;
