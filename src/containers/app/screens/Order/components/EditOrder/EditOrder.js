import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, Col, Divider, Modal, Checkbox, Row, Tooltip } from 'antd';

import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import './EditOrder.sass';
import { useDispatch, useSelector } from 'react-redux';
import { ORDER_STATUS } from 'app-configs';
import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { REQUEST_STATE } from 'app-configs';
import {
    GET_ORDER_BY_ID,
    GET_ORDER_BY_ID_SUCCESS,
    UPDATE_ORDER,
    UPDATE_ORDER_SUCCESS_STATE,
} from '../../actions/action';
import store from 'redux/index';
import { getImageWithId } from 'helpers/media';
import { getBase64 } from 'helpers/media';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import { isEmptyValue } from 'helpers/check';

const { Option } = Select;

function EditOrder({ match }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const history = useHistory();
    const orderId = history.location.pathname.replace('/order/edit-order/', '');
    const [hasOptions, setHasOptions] = useState(false);

    const [orderImages, setOrderImages] = useState([]);
    const [previewOrderStatus, setPreviewOrderStatus] = useState({
        image: '',
        title: '',
        isShow: false,
    });
    const order = useSelector((state) => state.order.update);
    const notify = useSelector((state) => state.notify);

    const onFinish = (values) => {
        const params = {
            ...values,
            media: orderImages,
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
        dispatch(UPDATE_ORDER({ params, id: orderId }));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function onSelectStatusChange(value) {
        console.log(value);
    }

    function handleHidePreviewModal() {
        setPreviewOrderStatus({
            isShow: false,
        });
    }

    async function handlePreviewOrderImage(file) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewOrderStatus({
            image: file.url || file.preview,
            isShow: true,
            title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    }

    function handleChangeUploadImage({ fileList }) {
        setOrderImages(fileList);
    }

    function handleChangeOptions() {
        setHasOptions(!hasOptions);
    }

    useEffect(() => {
        dispatch(
            GET_ORDER_BY_ID({
                id: orderId,
            }),
        );
    }, [history.location.pathname]);

    useEffect(() => {
        if (order.data) {
            const mapStatus =
                ORDER_STATUS.find((orderStatus) => orderStatus.value === order.data.status) ?? ORDER_STATUS[0];
            setHasOptions(!isEmptyValue(order.data.options));
            form.setFieldsValue({
                ...order.data,
                status: mapStatus.value,
                options: order.data.options
                    ? order.data.options.map((option) => {
                          return {
                              ...option,
                              values: option.values.map((value) => ({ value })),
                          };
                      })
                    : [''],
            });
            if (order.data.media.length > 0) {
                const listOrderImages = order.data.media.map((img) => {
                    return {
                        uid: img.id,
                        name: img.link,
                        url: getImageWithId(img.id),
                    };
                });
                setOrderImages(listOrderImages);
            }
        }
    }, [order.data]);

    useEffect(() => {
        if (order.state === REQUEST_STATE.SUCCESS) {
            history.push('/order');
            dispatch(UPDATE_ORDER_SUCCESS_STATE());
        }
    }, [order.state]);

    return (
        <div className="create-order">
            {order.state === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
            <ListHeader title={t('addOrder')}>
                <Button type="primary">
                    <Link to="/order">{t('back')}</Link>
                </Button>
            </ListHeader>
            <div className="create-order__form">
                <Form
                    name="basic"
                    form={form}
                    initialValues={{
                        remember: true,
                        status: ORDER_STATUS[0].value,
                        options: [
                            {
                                id: 12,
                                title: 'testt',
                                orderId: 73,
                                position: 1,
                                values: [
                                    {
                                        value: 'testt',
                                    },
                                    {
                                        value: '123',
                                    },
                                ],
                            },
                        ],
                        availableNumber: 0,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="inline"
                    size="large"
                >
                    <Col className="flex-height-center" style={{ marginBottom: '10px' }} span={24}>
                        <span className="createOrderLabel">{t('orderStatus')}</span>
                        <Tooltip title={t('theOrderWillBeHiddenOrVisibleFromAllSalesChannel ')}>
                            <QuestionCircleOutlined className="createOrderLabelInfo" style={{ marginLeft: '6px' }} />
                        </Tooltip>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="create-order__item"
                            label={t('status')}
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                        >
                            <Select style={{ width: 160 }} onChange={onSelectStatusChange} size="middle">
                                {ORDER_STATUS.map((orderStatus) => {
                                    return (
                                        <Option key={orderStatus.value} value={orderStatus.value}>
                                            {t(orderStatus.value)}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Divider style={{ margin: '10px 0px' }} />

                    <Col span={24}>
                        <div className="createOrderLabel">{t('orderInformation')}</div>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="create-order__item"
                            label={t('orderName')}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                        >
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterOrderName')} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item className="create-order__item" label={t('description')} name="description">
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterOrderDescription')} />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            className="create-order__item"
                            label={t('price')}
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                        >
                            <Input style={{ fontSize: '14px' }} type="number" placeholder={t('enterOrderPrice')} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="create-order__item"
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
                                placeholder={t('enterOrderComparePrice')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item className="create-order__item" label={t('orderUrl')} name="url">
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterOrderURL')} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item className="create-order__item" label={t('vendorId')} name="vendorId">
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterOrderVendor')} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item className="create-order__item" label={t('availableOrders')} name="availableNumber">
                            <Input
                                type="number"
                                style={{ fontSize: '14px' }}
                                placeholder={t('enternumberOfAvailableOrders')}
                            />
                        </Form.Item>
                    </Col>
                    <Divider style={{ margin: '10px 0px' }} />
                    <Col span={24}>
                        <div className="createOrderLabel">{t('listOrderImages')}</div>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            className="create-order__item"
                            label={t('media')}
                            name="media"
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || orderImages.length === 0) {
                                            return Promise.reject(new Error(t('youMustUploadAtLeast1Image')));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Upload
                                accept="image/*"
                                onPreview={handlePreviewOrderImage}
                                listType="picture-card"
                                customRequest={({ onSuccess }) => onSuccess('ok')}
                                fileList={orderImages}
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
                        <div className="createOrderLabel">{t('options')}</div>
                    </Col>
                    <Checkbox checked={hasOptions} onChange={handleChangeOptions}>
                        <span>{t('thisOrderHasOptionsLikeSizeOrColor')}</span>
                    </Checkbox>
                    <Col span={24}></Col>
                    {hasOptions && (
                        <>
                            <Form.List name="options">
                                {(fields, { add, remove }) => (
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
                                        </Col>
                                        <Row>
                                            {fields.map((field, index) => {
                                                return (
                                                    <>
                                                        <Col
                                                            span={7}
                                                            key={field.key}
                                                            className="createOrderListOptions"
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
                                                                        className="createOrderDeleteOption"
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
                                                                                                className="createOrderDeleteOption"
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

                    <div className="createOrderSubmit">
                        <Form.Item>
                            <Button size="middle" type="primary" htmlType="submit">
                                {t('submit')}
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
                <Modal
                    visible={previewOrderStatus.isShow}
                    title={previewOrderStatus.title}
                    footer={null}
                    onCancel={handleHidePreviewModal}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewOrderStatus.image} />
                </Modal>
            </div>
        </div>
    );
}

export default EditOrder;
