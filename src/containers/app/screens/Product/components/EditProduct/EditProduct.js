import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, Col, Divider, Modal, notification } from 'antd';

import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import './EditProduct.sass';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_STATUS } from 'app-configs';
import { PlusOutlined } from '@ant-design/icons';
import { REQUEST_STATE } from 'app-configs';
import { GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_SUCCESS } from '../../actions/action';
import store from 'redux/index';
import { getImageWithId } from 'helpers/media';

const { Option } = Select;

function EditProduct({ match }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const history = useHistory();

    const [productImages, setProductImages] = useState([]);
    const [previewProductStatus, setPreviewProductStatus] = useState({
        image: '',
        title: '',
        isShow: false,
    });
    const product = useSelector((state) => state.product);
    const notify = useSelector((state) => state.notify);

    const onFinish = (values) => {
        const params = { ...values, media: productImages, status: t(values.status) };
        dispatch(CREATE_PRODUCT(params));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function onSelectStatusChange(value) {
        console.log(value);
    }

    function handleHidePreviewModal() {
        setPreviewProductStatus({
            isShow: false,
        });
    }

    function handleRemoveProductImages(file) {
        const index = productImages.indexOf(file);
        const newFileList = productImages.slice();
        newFileList.splice(index, 1);
        setProductImages(newFileList);
    }

    function beforeUpload(file) {
        console.log('filexxx: ', file);
        const isValidImage = VALID_IMAGE_TYPES.includes(file.type);
        const isValidSize = file.size / 1024 / 1024 < Configs.FILE_MAXIMUM;
        if (!isValidImage) {
            console.log('IF 1');
            notification.error({
                message: t('uploadError'),
                description: t('pleaseUploadAValidImageFormat'),
            });
        } else if (!isValidSize) {
            console.log('IF 2');
            notification.error({
                message: t('uploadError'),
                description: t('imageSizeMustSmallerThan5MB'),
            });
        } else {
            console.log('ENTER HERE');
            setProductImages([...productImages, file]);
        }
        console.log('ENTER HERE');
        return false;
    }

    useEffect(() => {
        dispatch(
            GET_PRODUCT_BY_ID({
                id: history.location.pathname.replace('/product/edit-product/', ''),
            }),
        );
    }, [history.location.pathname]);
    useEffect(() => {
        console.log('productImages: ', productImages);
    }, [productImages]);

    useEffect(() => {
        if (product.detail) {
            form.setFieldsValue(product.detail);
            if (product.detail.media.length > 0) {
                const listProductImages = product.detail.media.map((img) => {
                    return {
                        uid: img.id,
                        name: img.link,
                        url: getImageWithId(img.id),
                    };
                });
                setProductImages(listProductImages);
            }
        }
    }, [product.detail]);

    useEffect(() => {
        if (notify.requestState === REQUEST_STATE.SUCCESS) {
            form.resetFields();
            setProductImages([]);
        }
    }, [notify.requestState]);
    return (
        <div className="edit-product">
            <ListHeader title={t('editProduct')}>
                <Button type="primary">
                    <Link to="/product">{t('back')}</Link>
                </Button>
            </ListHeader>
            <div className="edit-product__form">
                <Form
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="inline"
                    size="large"
                >
                    <div className="editProductLabel">{t('productInformation')}</div>
                    <Col span={24}></Col>
                    <Col span={8}>
                        <Form.Item
                            className="edit-product__item"
                            label={t('productName')}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseFillThisField'),
                                },
                            ]}
                        >
                            <Input
                                style={{ fontSize: '14px' }}
                                placeholder={t('enterProductName')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="edit-product__item"
                            label={t('description')}
                            name="description"
                        >
                            <Input
                                style={{ fontSize: '14px' }}
                                placeholder={t('enterProductDescription')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="edit-product__item"
                            label={t('status')}
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseFillThisField'),
                                },
                            ]}
                        >
                            <Select
                                style={{ width: 160 }}
                                onChange={onSelectStatusChange}
                                size="middle"
                            >
                                {PRODUCT_STATUS.map((productStatus) => {
                                    return (
                                        <Option
                                            key={productStatus.value}
                                            value={productStatus.value}
                                        >
                                            {t(productStatus.value)}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            className="edit-product__item"
                            label={t('price')}
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseFillThisField'),
                                },
                            ]}
                        >
                            <Input
                                style={{ fontSize: '14px' }}
                                type="number"
                                placeholder={t('enterProductPrice')}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            className="edit-product__item"
                            label={t('comparePrice')}
                            name="comparePrice"
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseFillThisField'),
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
                        <Form.Item
                            className="edit-product__item"
                            label={t('productUrl')}
                            name="url"
                        >
                            <Input
                                style={{ fontSize: '14px' }}
                                placeholder={t('enterProductURL')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="edit-product__item"
                            label={t('vendorId')}
                            name="vendorId"
                        >
                            <Input
                                style={{ fontSize: '14px' }}
                                placeholder={t('enterProductVendor')}
                            />
                        </Form.Item>
                    </Col>

                    <Divider />
                    <Col span={24}>
                        <div className="editProductLabel">{t('listProjectImages')}</div>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            className="edit-product__item"
                            label={t('media')}
                            name="media"
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || productImages.length === 0) {
                                            return Promise.reject(
                                                new Error(t('youMustUploadAtLeast1Image')),
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Upload
                                listType="picture-card"
                                fileList={productImages}
                                beforeUpload={beforeUpload}
                                onRemove={handleRemoveProductImages}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Col>

                    <div className="edit-product__submit">
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
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
