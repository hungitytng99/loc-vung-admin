import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Button, Layout, Popconfirm, Space, Table, Tooltip, Tag, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, FormOutlined, SearchOutlined, LoadingOutlined, RiseOutlined } from '@ant-design/icons';
import 'containers/app/screens/Order/components/ListOrder/ListOrder.sass';
import { Link } from 'react-router-dom';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DELETE_ORDER, GET_LIST_ORDER, SEARCH_ORDER } from '../../actions/action';
import { getImageWithId } from 'helpers/media';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { REQUEST_STATE } from 'app-configs';
import { ORDER_STATUS } from 'app-configs';
import ImageLoading from 'components/Loading/ImageLoading/ImageLoading';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';

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
                title: searchParams,
                ...filters,
            }),
        );
    }

    function handleDeleteOrder(order) {
        dispatch(DELETE_ORDER(order));
    }

    function onSearch(e) {
        setSearchParams(() => e.target.value);
        dispatch(
            SEARCH_ORDER({
                pagination,
                ...currentFilter,
                title: e.target.value,
            }),
        );
    }

    useEffect(() => {
        dispatch(GET_LIST_ORDER({ pagination }));
    }, [dispatch]);

    useEffect(() => {
        setPagination({ ...pagination, total: orders.totalOrder });
    }, [orders.totalOrder]);

    // test api
    // useEffect(() => {
    //     (async () => {
    //         const response = await apiListOrder({});
    //         console.log('test api:' + response);
    //     })();
    // }, []);

    return (
        <div className="list-order">
            {orders.requestState === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
            <Table
                columns={[
                    {
                        title: t('id'),
                        dataIndex: 'id',
                        width: '2%',
                    },
                    {
                        title: t('userId'),
                        dataIndex: 'userId',
                        width: '12%',
                    },
                    {
                        title: t('name'),
                        dataIndex: 'customerName',
                        width: '12%',
                    },
                    {
                        title: t('phone'),
                        dataIndex: 'customerPhone',
                        width: '12%',
                    },
                    {
                        title: t('dia chi'),
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
                        // dataIndex: 'deliveryMethod',
                        width: '12%',
                    },
                    {
                        title: t('create at'),
                        dataIndex: 'createdAt',
                        width: '12%',
                    },
                    // {
                    //     title: t('action'),
                    //     key: 'action',
                    //     dataIndex: 'action',
                    //     width: '3%',
                    //     render: (_, record) => {
                    //         return (
                    //             <div className="list-order__action">
                    //                 <Tooltip className="list-order__action-edit text-grey-300" title={t('editOrder')}>
                    //                     <Link style={{ display: 'block' }} to={`/order/edit-order/${record.id}`}>
                    //                         <FormOutlined />
                    //                     </Link>
                    //                 </Tooltip>
                    //                 <div style={{ width: '4px' }}></div>
                    //                 <Popconfirm
                    //                     title={`${t('areYouSureToDeleteThisOrder')}?`}
                    //                     okText={t('yes')}
                    //                     cancelText={t('cancel')}
                    //                     onConfirm={() => {
                    //                         handleDeleteOrder(record);
                    //                     }}
                    //                 >
                    //                     <Tooltip
                    //                         className="list-order__action-delete text-grey-300"
                    //                         title={t('deleteOrder')}
                    //                     >
                    //                         <DeleteOutlined style={{ paddingTop: '6px' }} />
                    //                     </Tooltip>
                    //                 </Popconfirm>
                    //                 <div style={{ width: '4px' }}></div>
                    //                 <Tooltip
                    //                     className="list-order__action-set text-grey-300"
                    //                     title={t('setAsHotOrder')}
                    //                 >
                    //                     <RiseOutlined style={{ paddingTop: '6px' }} />
                    //                 </Tooltip>
                    //             </div>
                    //         );
                    //     },
                    // },
                ]}
                title={() => (
                    <ListHeader title={t('listOrder')}>
                        <Space size="small">
                            <Input
                                size="middle"
                                placeholder={`${t('searchOrder')}...`}
                                prefix={
                                    orders.state === REQUEST_STATE.REQUEST ? <LoadingOutlined /> : <SearchOutlined />
                                }
                                value={searchParams}
                                onChange={onSearch}
                            />
                            <Button type="ghost">
                                <Link to="/order/add-hot-order">{t('addHotOrder')}</Link>
                            </Button>
                            <Button type="primary">
                                <Link to="/order/create">{t('addOrder')}</Link>
                            </Button>
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
