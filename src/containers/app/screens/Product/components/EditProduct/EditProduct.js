import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, Col, Divider, Modal, Checkbox, Row, Tooltip, Switch } from 'antd';

import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_STATUS } from 'app-configs';
import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { REQUEST_STATE } from 'app-configs';
import {
    GET_LIST_VENDOR,
    GET_PRODUCT_BY_ID,
    GET_PRODUCT_BY_ID_SUCCESS,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS_STATE,
} from '../../actions/action';
import { getImageWithId } from 'helpers/media';
import { getBase64 } from 'helpers/media';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import { isEmptyValue } from 'helpers/check';
import { MODULES } from 'app-configs';
import CKEditor from 'components/Editor/CKEditor';
import './EditProduct.sass';
import { GET_LIST_COLLECTION } from 'containers/app/screens/Collection/actions/action';

const { Option } = Select;

function EditProduct({ match }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const history = useHistory();
    const productId = history.location.pathname.replace('/product/edit-product/', '');
    const [hasOptions, setHasOptions] = useState(false);
    const [isBestSelling, setIsBestSelling] = useState(false);
    const [content, setContent] = useState('');
    const [vendorId, setVendorId] = useState(null);
    const collectionList = useSelector((state) => state?.collection?.list);

    const [productImages, setProductImages] = useState([]);
    const [previewProductStatus, setPreviewProductStatus] = useState({
        image: '',
        title: '',
        isShow: false,
    });
    const vendorList = useSelector((state) => state?.vendor?.list);
    const product = useSelector((state) => state?.product?.update);

    const onFinish = (values) => {
        const params = {
            ...values,
            media: productImages,
            status: t(values.status),
            vendorId: vendorId,
            options: values.options
                ? values.options.map((option) => {
                      return {
                          ...option,
                          values: option.values.map((value) => value.value),
                      };
                  })
                : values.options,
        };
        dispatch(UPDATE_PRODUCT({ params, id: productId }));
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

    function onContentChange(value) {
        form.setFieldsValue({
            description: value,
        });
        setContent(value);
    }

    function handleSelectVendor(value) {
        setVendorId(value);
    }
    useEffect(() => {
        dispatch(
            GET_PRODUCT_BY_ID({
                id: productId,
            }),
        );
    }, [history.location.pathname]);

    useEffect(() => {
        if (product?.data && product.getDetailState === REQUEST_STATE.SUCCESS) {
            const mapStatus =
                PRODUCT_STATUS.find((productStatus) => productStatus.value === product.data.status) ??
                PRODUCT_STATUS[0];
            setHasOptions(!isEmptyValue(product.data.options));
            form.setFieldsValue({
                ...product.data,
                collections: product?.data?.collections.map((collection) => collection?.id),
                status: mapStatus.value,
                availableNumber: product.data?.availableNumber ?? 0,
                options: product.data.options
                    ? product.data.options.map((option) => {
                          return {
                              ...option,
                              values: option.values.map((value) => ({ value })),
                          };
                      })
                    : [''],
            });

            setContent(product.data.description);
            setVendorId(product.data?.vendor?.id);
            setIsBestSelling(product.data?.bestSelling);
            if (product?.data?.media?.length > 0) {
                const listProductImages = product.data.media.map((img) => {
                    return {
                        uid: img.id,
                        name: img.link,
                        url: getImageWithId(img.id),
                    };
                });
                setProductImages(listProductImages);
            }
        }
    }, [product.data, product.getDetailState]);

    useEffect(() => {
        if (product.state === REQUEST_STATE.SUCCESS) {
            history.push('/product');
            dispatch(UPDATE_PRODUCT_SUCCESS_STATE());
        }
    }, [product.state]);

    useEffect(() => {
        dispatch(GET_LIST_VENDOR({ pagination: {} }));
        dispatch(GET_LIST_COLLECTION({ pagination: {} }));
    }, []);

    return (
        <div className="editProduct">
            {(product?.state === REQUEST_STATE.REQUEST || product?.getDetailState === REQUEST_STATE.REQUEST) && (
                <FullPageLoading opacity={0.8} />
            )}
            <ListHeader title={t('editProduct')}>
                <Button type="ghost">
                    <Link to="/product">{t('back')}</Link>
                </Button>
                <Button type="primary" style={{ marginLeft: '15px' }}>
                    <Link to={`${MODULES.productModule.route}/edit-variant/${productId}`}>{t('configVariant')}</Link>
                </Button>
            </ListHeader>
            <div className="editProduct__form">
                <Form
                    name="basic"
                    form={form}
                    initialValues={{
                        options: [
                            {
                                title: '',
                                values: [''],
                            },
                        ],
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="inline"
                    size="large"
                >
                    <Form.Item className="editProduct__item" name="bestSelling" label={t('isBestSelling')}>
                        <Switch checked={isBestSelling} onChange={() => setIsBestSelling(!isBestSelling)} />
                    </Form.Item>
                    <Col className="flex-height-center" style={{ marginBottom: '10px' }} span={24}>
                        <span className="createProductLabel">{t('productStatus')}</span>
                        <Tooltip title={t('theProductWillBeHiddenOrVisibleFromAllSalesChannel ')}>
                            <QuestionCircleOutlined className="createProductLabelInfo" style={{ marginLeft: '6px' }} />
                        </Tooltip>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="editProduct__item"
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
                                            {t(productStatus.value)}
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
                            className="editProduct__item"
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
                        <Form.Item
                            className="editProduct__item"
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
                            className="editProduct__item"
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
                    <Col span={8}>
                        <Form.Item className="editProduct__item" label={t('productUrl')} name="url">
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterProductURL')} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item className="create-product__item" label={t('collection')} name="collections">
                            <Select mode="multiple" loading={collectionList?.state === REQUEST_STATE.REQUEST}>
                                {collectionList?.data &&
                                    collectionList?.data.map((collection) => {
                                        return <Option value={collection?.id}>{collection?.title}</Option>;
                                    })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item className="create-product__item" label={t('vendor')}>
                            <Select
                                onChange={handleSelectVendor}
                                value={vendorId}
                                style={{ width: 120 }}
                                loading={vendorList?.state === REQUEST_STATE.REQUEST}
                            >
                                {vendorList?.data &&
                                    vendorList?.data.map((vendor) => {
                                        return <Option value={vendor?.id}>{vendor?.name}</Option>;
                                    })}
                            </Select>
                        </Form.Item>
                    </Col>
                    {/* <Col span={8}>
                        <Form.Item className="editProduct__item" label={t('availableProducts')} name="availableNumber">
                            <Input
                                type="number"
                                style={{ fontSize: '14px' }}
                                placeholder={t('enternumberOfAvailableProducts')}
                            />
                        </Form.Item>
                    </Col> */}
                    <Col span={24}>
                        <Form.Item className="editProduct__item" label={t('description')} name="description">
                            <CKEditor onTextChange={onContentChange} initContent={content} />
                        </Form.Item>
                    </Col>
                    <Divider style={{ margin: '10px 0px' }} />
                    <Col span={24}>
                        <div className="createProductLabel">{t('listProductImages')}</div>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            className="editProduct__item"
                            label={t('media')}
                            name="media"
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

                    <div className="editProductSubmit">
                        <Form.Item>
                            <Button size="middle" type="primary" htmlType="submit">
                                {t('submit')}
                            </Button>
                        </Form.Item>
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

export default EditProduct;
