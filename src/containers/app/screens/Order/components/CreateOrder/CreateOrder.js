import React, { useEffect, useState } from 'react';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './CreateOrder.sass';
import {
    Form,
    Input,
    Button,
    Select,
    Upload,
    Col,
    Divider,
    Modal,
    notification,
    Checkbox,
    Space,
    Row,
    Tooltip,
    Badge,
} from 'antd';
import { ORDER_STATUS } from 'app-configs';
import { MinusCircleOutlined, PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { VALID_IMAGE_TYPES } from 'app-configs';
import { Configs } from 'app-configs';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_ORDER } from '../../actions/action';
import { REQUEST_STATE } from 'app-configs';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import { getBase64 } from 'helpers/media';
import Cookies from 'js-cookie';
import { isEmptyValue } from 'helpers/check';
import ListOrder from '../ListOrder/ListOrder';

const { Option } = Select;

function CreateOrder(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [previewOrderStatus, setPreviewOrderStatus] = useState({
        image: '',
        title: '',
        isShow: false,
    });
    const order = useSelector((state) => state.order.create);
    const notify = useSelector((state) => state.notify);
    let addValue = () => {};

    const onFinish = (values) => {
        dispatch(CREATE_ORDER(values));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function handleHidePreviewModal() {
        setPreviewOrderStatus({
            isShow: false,
        });
    }

    useEffect(() => {
        if (notify.requestState === REQUEST_STATE.SUCCESS) {
            form.resetFields();
            setOrderImages([]);
        }
    }, [notify.requestState]);

    return (
        <div className="create-order">
            {order.state === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
            <ListHeader title={t('addOrder')}>
                <Button type="primary">
                    <Link to="/order">{t('back')}</Link>
                </Button>
            </ListHeader>
            <ListOrder hasOptions={hasOptions} />
            <div className="create-order__form">
                <Form
                    name="basic"
                    form={form}
                    initialValues={{
                        remember: true,
                        status: ORDER_STATUS[0].value,
                        options: [
                            {
                                title: '',
                                values: [''],
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
                    <Divider style={{ margin: '10px 0px' }} />

                    <Col span={24}>
                        <div className="createOrderLabel">{t('orderInformation')}</div>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="create-order__item"
                            label={t('userName')}
                            name="userName"
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                        >
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterUserName')} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item className="create-order__item" label={t('userId')} name="userId">
                            <Input style={{ fontSize: '14px' }} type="number" placeholder={t('enteruserId')} />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            className="create-order__item"
                            label={t('phone')}
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                        >
                            <Input style={{ fontSize: '14px' }} type="number" placeholder={t('enterphone')} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="create-order__item"
                            label={t('customerAddress')}
                            name="customerAddress"
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                        >
                            <Input style={{ fontSize: '14px' }} placeholder={t('entercustomerAddress')} />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item className="create-order__item" label={t('email')} name="email">
                            <Input style={{ fontSize: '14px' }} placeholder={t('enteremail')} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item className="create-order__item" label={t('deliveryMethod')} name="deliveryMethod">
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterdeliveryMethod')} />
                        </Form.Item>
                    </Col>

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

export default CreateOrder;
