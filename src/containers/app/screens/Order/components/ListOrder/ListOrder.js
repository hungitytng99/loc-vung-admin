import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Badge,
    Button,
    Layout,
    Popconfirm,
    Space,
    Table,
    Tooltip,
    Tag,
    notification,
    Select,
    Modal,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { SearchOutlined, LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import 'containers/app/screens/Order/components/ListOrder/ListOrder.sass';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CHANGE_ORDER_STATUS, DELETE_ORDER, GET_LIST_ORDER, SEARCH_ORDER } from '../../actions/action';
import 'react-medium-image-zoom/dist/styles.css';
import { REQUEST_STATE } from 'app-configs';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { ORDER_STATUS } from 'app-configs';

const { Option } = Select;

function ListOrder() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState({
        offset: 0,
        limit: 10,
    });
    const [currentFilter, setCurrentFilter] = useState({});
    const [searchParams, setSearchParams] = useState('');
    const orders = useSelector((state) => state?.order?.list);

    function handleTableChange(pagina, filters, sorter) {
        setPagination({
            ...pagina,
            offset: pagina.current === 1 ? 0 : (pagina.current - 1) * pagina.pageSize,
            limit: pagina.pageSize,
            total: orders.totalOrder,
        });
        setCurrentFilter({
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });

        dispatch(
            GET_LIST_ORDER({
                sortField: sorter.field,
                sortOrder: sorter.order,
                pagination: {
                    ...pagina,
                    offset: pagina.current === 1 ? 0 : (pagina.current - 1) * pagina.pageSize,
                    limit: pagina.pageSize,
                },
                userId: searchParams,
                ...filters,
            }),
        );
    }

    function handleChangeOrderStatus(status, record, handleChangeStatus, defaultStatus) {
        handleChangeStatus(status);
        Modal.confirm({
            title: t('areYouSureToChangeTo') + ' ' + t(`listOrderPage.${status}`),
            icon: <ExclamationCircleOutlined />,
            okText: t('confirm'),
            cancelText: t('cancel'),
            onOk: () => handleConfirmChangeOrderStatus(status, record),
            onCancel: () => handleChangeStatus(defaultStatus),
        });
    }

    function handleConfirmChangeOrderStatus(status, record) {
        dispatch(
            CHANGE_ORDER_STATUS({
                id: record?.id,
                status,
            }),
        );
    }

    function onSearch(e) {
        setSearchParams(e.target.value);

        dispatch(
            SEARCH_ORDER({
                ...currentFilter,
                pagination,
                search: e.target.value,
            }),
        );
    }

    useEffect(() => {
        dispatch(GET_LIST_ORDER({ pagination }));
    }, [dispatch]);

    useEffect(() => {
        setPagination({ ...pagination, total: orders?.totalOrder });
    }, [orders?.totalOrder]);

    return (
        <div className="list-order">
            <Table
                columns={[
                    {
                        title: t('orderCode'),
                        dataIndex: 'code',
                        width: '2%',
                    },

                    {
                        title: t('name'),
                        dataIndex: 'customerName',
                        width: '24%',
                    },
                    {
                        title: t('phone'),
                        dataIndex: 'customerPhone',
                        width: '12%',
                    },
                    {
                        title: t('customerAddress'),
                        dataIndex: 'customerAddress',
                        width: '12%',
                    },
                    {
                        title: t('email'),
                        dataIndex: 'customerEmail',
                        width: '12%',
                    },
                    {
                        title: t('deliveryMethod'),
                        dataIndex: 'paymentMethod',
                        width: '12%',
                    },
                    {
                        title: t('product'),
                        dataIndex: 'orderItems',
                        width: '12%',
                        render: (orderItems) => {
                            return orderItems.map((orderItem, index) => (
                                <div key={orderItem.variant.product.id}>
                                    <Link
                                        to={`/product/edit-product/${orderItem.variant.product.id}`}
                                        style={{ color: '#000' }}
                                    >
                                        <span>{index + 1}. </span>
                                        {orderItem.variant.product.title}
                                    </Link>
                                </div>
                            ));
                        },
                    },
                    {
                        filters: [
                            ...Object.keys(ORDER_STATUS).map((key) => ({
                                value: ORDER_STATUS[key],
                                text: ORDER_STATUS[key],
                            })),
                        ],
                        filterMultiple: false,
                        title: t('status'),
                        dataIndex: 'status',
                        width: '12%',
                        render: (status, record) => {
                            if (status.toUpperCase() === ORDER_STATUS.NEW) {
                                return <Tag color="purple">{t('newOrder').toLocaleUpperCase()}</Tag>;
                            } else if (status.toUpperCase() === ORDER_STATUS.COMMING) {
                                return <Tag color="processing">{t('commingOrder').toLocaleUpperCase()}</Tag>;
                            } else if (status.toUpperCase() === ORDER_STATUS.DONE) {
                                return <Tag color="green">{t('doneOrder').toLocaleUpperCase()}</Tag>;
                            } else {
                                return <Tag color="red">{t('cancelOrder').toLocaleUpperCase()}</Tag>;
                            }
                        },
                    },
                    {
                        title: t('createdAt'),
                        dataIndex: 'createdAt',
                        width: '12%',
                        render: (createdAt) => {
                            return <Moment format="HH:mm:ss DD/MM/YYYY">{createdAt}</Moment>;
                        },
                    },
                    {
                        title: t('action'),
                        dataIndex: 'status',
                        width: '12%',
                        render: (status, record) => {
                            if (status.toUpperCase() === ORDER_STATUS.NEW) {
                                const [status, setStatus] = useState(ORDER_STATUS.NEW);
                                return (
                                    <Select
                                        value={status}
                                        style={{ width: 150 }}
                                        onChange={(values) =>
                                            handleChangeOrderStatus(
                                                values,
                                                record,
                                                (status) => setStatus(status),
                                                ORDER_STATUS.NEW,
                                            )
                                        }
                                    >
                                        <Option value="NEW">{t('newOrder')}</Option>
                                        <Option value="INCOMING">{t('listOrderPage.INCOMING')}</Option>
                                        <Option value="DONE">{t('doneOrder')}</Option>
                                        <Option value="CANCEL">{t('cancelOrder')}</Option>
                                    </Select>
                                );
                            } else if (status.toUpperCase() === ORDER_STATUS.COMMING) {
                                const [status, setStatus] = useState(ORDER_STATUS.COMMING);
                                return (
                                    <Select
                                        value={status}
                                        style={{ width: 150 }}
                                        onChange={(values) =>
                                            handleChangeOrderStatus(
                                                values,
                                                record,
                                                (status) => setStatus(status),
                                                ORDER_STATUS.COMMING,
                                            )
                                        }
                                    >
                                        <Option value="INCOMING">{t('listOrderPage.INCOMING')}</Option>
                                        <Option value="DONE">{t('doneOrder')}</Option>
                                        <Option value="CANCEL">{t('cancelOrder')}</Option>
                                    </Select>
                                );
                            } else {
                                return <div></div>;
                            }
                        },
                    },
                ]}
                title={() => (
                    <ListHeader title={t('listOrderPage')}>
                        <Space size="small">
                            <Input
                                size="middle"
                                placeholder={`${t('searchOrderByCustomer')}...`}
                                prefix={
                                    orders.state === REQUEST_STATE.REQUEST ? <LoadingOutlined /> : <SearchOutlined />
                                }
                                value={searchParams}
                                onChange={onSearch}
                            />
                        </Space>
                    </ListHeader>
                )}
                rowKey={(record) => record.id}
                dataSource={orders.data}
                pagination={pagination}
                loading={orders.state === REQUEST_STATE.REQUEST}
                onChange={handleTableChange}
                bordered
                scroll={{ x: 1500 }}
            />
        </div>
    );
}

export default React.memo(ListOrder);
