import React, { useEffect, useState } from 'react';
import { Button, Table, Row, Col, Form, Tooltip, Popconfirm, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    CREATE_VENDOR,
    DELETE_VENDOR,
    GET_LIST_VENDOR,
    RESET_CREATE_VENDOR_STATE,
    RESET_DELETE_VENDOR_STATE,
    RESET_UPDATE_VENDOR_STATE,
    UPDATE_VENDOR,
} from '../../actions/action';
import 'react-medium-image-zoom/dist/styles.css';
import { REQUEST_STATE } from 'app-configs';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import './VendorPage.sass';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { NOTIFY_SUCCESS } from 'redux/actions/notify';
import { useRef } from 'react';

function VendorPage(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState({
        offset: 0,
        limit: 10,
    });
    const [currentVendorEdit, setCurrentVendorEdit] = useState();

    const [formCreateVendor] = Form.useForm();
    const vendorList = useSelector((state) => state?.vendor?.list);
    const vendorCreate = useSelector((state) => state?.vendor?.create);
    const vendorDelete = useSelector((state) => state?.vendor?.delete);
    const vendorUpdate = useSelector((state) => state?.vendor?.update);

    const [isShowEditVendor, setIsShowEditVendor] = useState(false);

    const [formEditVendor] = Form.useForm();
    const onCreateVendor = (values) => {
        dispatch(CREATE_VENDOR({ vendor: values }));
    };

    function openEditVendorModal(vendor) {
        setCurrentVendorEdit(vendor);
        setIsShowEditVendor(true);
    }

    function confirmEditVendor(values) {
        setIsShowEditVendor(false);
        dispatch(
            UPDATE_VENDOR({
                id: currentVendorEdit.id,
                ...values,
            }),
        );
    }

    function confirmDeleteVendor(id) {
        dispatch(DELETE_VENDOR({ id }));
    }

    function handleTableChange(pagina, filters) {
        setPagination({
            ...pagina,
            offset: pagina.current === 1 ? 0 : (pagina.current - 1) * pagina.pageSize,
            limit: pagina.pageSize,
            total: vendorList?.total,
        });
        dispatch(
            GET_LIST_VENDOR({
                pagination: {
                    ...pagina,
                    offset: pagina.current === 1 ? 0 : (pagina.current - 1) * pagina.pageSize,
                    limit: pagina.pageSize,
                },
                ...filters,
            }),
        );
    }

    useEffect(() => {
        dispatch(GET_LIST_VENDOR({ pagination }));
    }, [dispatch]);

    useEffect(() => {
        if (
            vendorCreate?.state === REQUEST_STATE.SUCCESS ||
            vendorDelete?.state === REQUEST_STATE.SUCCESS ||
            vendorUpdate?.state === REQUEST_STATE.SUCCESS
        ) {
            formCreateVendor.resetFields();
            dispatch(NOTIFY_SUCCESS());
            dispatch(RESET_CREATE_VENDOR_STATE());
            dispatch(RESET_DELETE_VENDOR_STATE());
            dispatch(RESET_UPDATE_VENDOR_STATE());
        }
    }, [vendorCreate?.state, vendorDelete?.state, vendorUpdate?.state, dispatch]);

    useEffect(() => {
        setPagination({ ...pagination, total: vendorList?.total });
    }, [vendorList?.total]);

    useEffect(() => {
        if (isShowEditVendor) {
            formEditVendor.setFieldsValue({ name: currentVendorEdit.name });
        } else {
            formEditVendor.setFieldsValue({ name: '' });
        }
    }, [isShowEditVendor]);

    return (
        <div className="vendorPage">
            {(vendorCreate?.state === REQUEST_STATE.REQUEST ||
                vendorList?.state === REQUEST_STATE.REQUEST ||
                vendorDelete?.state === REQUEST_STATE.REQUEST ||
                vendorUpdate?.state === REQUEST_STATE.REQUEST) && <FullPageLoading opacity={0.8} />}
            <Row>
                <Col span={8} className="vendorPageCreate">
                    <div className="vendorPageCreateHeader">
                        <ListHeader title={t('createVendor')} />
                    </div>
                    <Form
                        name="createVendor"
                        form={formCreateVendor}
                        initialValues={{}}
                        onFinish={onCreateVendor}
                        autoComplete="off"
                        layout="inline"
                        size="large"
                    >
                        <Col span={24}>
                            <Form.Item
                                className="createVendorItem"
                                label={t('vendorName')}
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: t('thisFieldIsRequired'),
                                    },
                                ]}
                            >
                                <Input style={{ fontSize: '14px' }} placeholder={t('enterVendorName')} />
                            </Form.Item>
                        </Col>
                        <div className="createVendorSubmit">
                            <Button size="middle" type="primary" htmlType="submit">
                                {t('create')}
                            </Button>
                        </div>
                    </Form>
                </Col>
                <Col span={16} className="vendorPageList">
                    <Form form={formEditVendor} component={false}>
                        <Table
                            columns={[
                                {
                                    title: t('id'),
                                    dataIndex: 'id',
                                    width: '5%',
                                },
                                {
                                    title: t('vendorName'),
                                    dataIndex: 'name',
                                    width: '80%',
                                },
                                {
                                    title: t('action'),
                                    key: 'action',
                                    dataIndex: 'action',
                                    width: '5%',
                                    render: (_, record) => {
                                        return (
                                            <div className="vendorPageAction">
                                                <Tooltip
                                                    className="vendorPageActionEdit text-grey-300"
                                                    title={t('editVendor')}
                                                >
                                                    <FormOutlined
                                                        onClick={() => openEditVendorModal(record)}
                                                        style={{ marginTop: '5px' }}
                                                    />
                                                </Tooltip>
                                                <div style={{ width: '4px' }}></div>
                                                <Popconfirm
                                                    title={`${t('areYouSureToDeleteThisVendor')}?`}
                                                    okText={t('yes')}
                                                    cancelText={t('cancel')}
                                                    onConfirm={() => {
                                                        confirmDeleteVendor(record.id);
                                                    }}
                                                >
                                                    <Tooltip
                                                        className="vendorPageActionDelete text-grey-300"
                                                        title={t('deleteVendor')}
                                                    >
                                                        <DeleteOutlined style={{ paddingTop: '6px' }} />
                                                    </Tooltip>
                                                </Popconfirm>
                                                <div style={{ width: '4px' }}></div>
                                            </div>
                                        );
                                    },
                                },
                            ]}
                            title={() => <ListHeader title={t('listVendor')}></ListHeader>}
                            rowKey={(record) => record.id}
                            dataSource={vendorList?.data ?? []}
                            pagination={pagination}
                            loading={vendorList?.state === REQUEST_STATE.REQUEST}
                            onChange={handleTableChange}
                            bordered
                        />
                    </Form>
                </Col>
            </Row>
            <Modal
                visible={isShowEditVendor}
                title={t('editVendor')}
                footer={null}
                onCancel={() => setIsShowEditVendor(false)}
            >
                <Form form={formEditVendor} name="editVendorModal" onFinish={confirmEditVendor}>
                    <Form.Item
                        name="name"
                        label={t('newName')}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{ marginBottom: '16px' }}
                    >
                        <Input v />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '0px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={() => setIsShowEditVendor(false)} type="ghost" style={{ marginRight: '10px' }}>
                            {t('cancel')}
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {t('submit')}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default React.memo(VendorPage);
