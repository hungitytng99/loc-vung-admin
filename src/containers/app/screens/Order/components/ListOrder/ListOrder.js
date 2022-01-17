import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Button, Layout, Popconfirm, Space, Table, Tooltip, Tag, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, FormOutlined, SearchOutlined, LoadingOutlined, RiseOutlined } from '@ant-design/icons';
import 'containers/app/screens/Order/components/ListOrder/ListOrder.sass';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DELETE_ORDER, GET_LIST_ORDER, SEARCH_ORDER } from '../../actions/action';
import { getImageWithId } from 'helpers/media';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { REQUEST_STATE } from 'app-configs';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { ORDER_STATUS } from 'app-configs';

function ListOrder({ hasOptions }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState({
        offset: 0,
        limit: 10,
    });
    const [currentFilter, setCurrentFilter] = useState({});
    const [searchParams, setSearchParams] = useState('');
    const orders = useSelector((state) => state.order.list);

    function handleTableChange(pagina, filters, sorter) {
        console.log('pagina, filters, sorter: ', pagina, filters, sorter);
        console.log('searchParams: ', searchParams);
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

    function handleDeleteOrder(order) {
        dispatch(DELETE_ORDER(order));
    }

    function onSearch(e) {
        console.log(' e.target.value: ', e.target.value);
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
        setPagination({ ...pagination, total: orders.totalOrder });
    }, [orders.totalOrder]);

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
                        dataIndex: 'deliveryMethod',
                        width: '12%',
                    },
                    {
                        title: t('product'),
                        dataIndex: 'orderItems',
                        width: '12%',
                        render: (orderItems) => {
                            return orderItems.map((orderItem, index) => (
                                <ul>
                                    <li>
                                        <Link to={`/product/edit-product/${orderItem.variant.product.id}`}>
                                            {orderItem.variant.product.title}
                                        </Link>
                                    </li>
                                </ul>
                            ));
                        },
                    },
                    {
                        title: t('status'),
                        dataIndex: 'status',
                        width: '12%',
                        render: (status, record) => {
                            if (status.toUpperCase() === ORDER_STATUS.NEW) {
                                return <Tag color="purple">{t('newOrder').toLocaleUpperCase()}</Tag>;
                            } else if (status.toUpperCase() === ORDER_STATUS.COMMING) {
                                return <Tag color="processing">{t('delivery').toLocaleUpperCase()}</Tag>;
                            } else if (status.toUpperCase() === ORDER_STATUS.DONE) {
                                return <Tag color="green">{t('done').toLocaleUpperCase()}</Tag>;
                            } else {
                                return <Tag color="red">{t('cancel').toLocaleUpperCase()}</Tag>;
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
                ]}
                title={() => (
                    <ListHeader title={t('listOrder')}>
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
