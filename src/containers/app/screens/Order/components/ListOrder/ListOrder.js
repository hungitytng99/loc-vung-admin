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
                        title: t('orderName'),
                        dataIndex: 'title',
                        width: '40%',
                    },
                    {
                        title: t('status'),
                        dataIndex: 'status',
                        width: '5%',
                        filters: ORDER_STATUS.map((status) => ({
                            value: status.value,
                            text: t(status.value),
                        })),
                        filterMultiple: false,
                        render: (status) => {
                            const mapStatus =
                                ORDER_STATUS.find((orderStatus) => orderStatus.value === status) ?? ORDER_STATUS[0];
                            return (
                                <Tag color={mapStatus.color} key={mapStatus.value}>
                                    {t(mapStatus.value).toLocaleUpperCase()}
                                </Tag>
                            );
                        },
                    },
                    {
                        title: t('price'),
                        dataIndex: 'price',
                        sorter: true,
                        width: '7%',
                        render: (price) => price.formatMoney(),
                    },
                    {
                        title: t('comparePrice'),
                        dataIndex: 'comparePrice',
                        width: '7%',
                        render: (price) => price.formatMoney(),
                    },
                    {
                        title: t('stockStatus'),
                        dataIndex: 'availableNumber',
                        width: '5%',
                        render: (availableNumber) => availableNumber ?? 0,
                    },
                    {
                        title: t('orderImages'),
                        dataIndex: ['media'],
                        width: '18%',
                        render: (medias = []) => {
                            return (
                                <div className="listOrderImages">
                                    {medias.map((media) => {
                                        return (
                                            <Zoom key={media.id}>
                                                <div
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        overflow: 'hidden',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <ImageLoading
                                                        key={media.id}
                                                        src={getImageWithId(media.id)}
                                                        alt={media.link}
                                                        className="listOrderImagesItem"
                                                    ></ImageLoading>
                                                </div>
                                            </Zoom>
                                        );
                                    })}
                                </div>
                            );
                        },
                    },
                    {
                        title: t('action'),
                        key: 'action',
                        dataIndex: 'action',
                        width: '3%',
                        render: (_, record) => {
                            return (
                                <div className="list-order__action">
                                    <Tooltip className="list-order__action-edit text-grey-300" title={t('editOrder')}>
                                        <Link style={{ display: 'block' }} to={`/order/edit-order/${record.id}`}>
                                            <FormOutlined />
                                        </Link>
                                    </Tooltip>
                                    <div style={{ width: '4px' }}></div>
                                    <Popconfirm
                                        title={`${t('areYouSureToDeleteThisOrder')}?`}
                                        okText={t('yes')}
                                        cancelText={t('cancel')}
                                        onConfirm={() => {
                                            handleDeleteOrder(record);
                                        }}
                                    >
                                        <Tooltip
                                            className="list-order__action-delete text-grey-300"
                                            title={t('deleteOrder')}
                                        >
                                            <DeleteOutlined style={{ paddingTop: '6px' }} />
                                        </Tooltip>
                                    </Popconfirm>
                                    <div style={{ width: '4px' }}></div>
                                    <Tooltip
                                        className="list-order__action-set text-grey-300"
                                        title={t('setAsHotOrder')}
                                    >
                                        <RiseOutlined style={{ paddingTop: '6px' }} />
                                    </Tooltip>
                                </div>
                            );
                        },
                    },
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
