import React, { useEffect, useState } from 'react';
import { Button, Layout, Popconfirm, Space, Table, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import reqwest from 'reqwest';
import { numberWithCommas } from 'helpers/format';
import { DeleteOutlined, FormOutlined, SearchOutlined, LoadingOutlined, RiseOutlined } from '@ant-design/icons';
import 'containers/app/screens/Product/components/ListProduct/ListProduct.sass';
import { Link } from 'react-router-dom';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { Input } from 'antd';
import Moment from 'react-moment';
import moment from 'moment';
const { Search } = Input;

function ListProduct(props) {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        productsPerPage: 10,
    });
    const [isSearch, setIsSearch] = useState(false);

    function getRandomuserParams(params) {
        console.log('params: ', params);
        return {
            results: params.pagination.pageSize,
            page: params.pagination.current,
            ...params,
        };
    }

    function fetchData(params) {
        setLoading(true);
        reqwest({
            url: 'http://103.163.118.206:1236/api/category',
            method: 'get',
            type: 'json',
            data: getRandomuserParams(params),
        }).then((response) => {
            console.log('response: ', response);
            setLoading(false);
            setData(response.data);
            setPagination({
                ...params.pagination,
                total: data.length,
            });
        });
    }

    function handleTableChange(pagination, filters, sorter) {
        console.log('sorter: ', sorter);
        console.log('filters: ', filters);
        console.log('pagination: ', pagination);

        fetchData({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    }

    function handleDeleteProduct(product) {
        console.log('product: ', product);
    }

    function onSearch(e) {
        setIsSearch(true);
        console.log(e.target.value);
    }

    useEffect(() => {
        console.log('pagination: ', pagination);
        fetchData({ pagination });
    }, []);

    useEffect(() => {
        console.log('pagination: ', pagination);
    }, [pagination]);

    return (
        <div className="list-product">
            <Table
                columns={[
                    {
                        title: t('id'),
                        dataIndex: 'id',
                        width: '2%',
                    },
                    {
                        title: t('name'),
                        dataIndex: 'name',
                        width: '55%',
                    },
                    {
                        title: t('description'),
                        dataIndex: 'description',
                        width: '10%',
                    },
                    {
                        title: t('slug'),
                        dataIndex: 'slug',
                        width: '11%',
                    },
                    {
                        title: t('create_at'),
                        dataIndex: 'create_at',
                        width: '11%',
                        render: (create_at) => {
                            console.log('create_at: ', create_at);
                            const date = new Date(create_at);
                            return <div>{moment(create_at).format('MM-DD-YYYY hh:mm:ss')}</div>;
                        },
                    },
                    {
                        title: t('update_at'),
                        dataIndex: 'update_at',
                        width: '11%',
                        render: (create_at) => {
                            console.log('update_at: ', create_at);
                            const date = new Date(create_at);
                            return <div>{moment(create_at).format('MM-DD-YYYY hh:mm:ss')}</div>;
                        },
                    },
                ]}
                title={() => (
                    <ListHeader title={t('listProduct')}>
                        <Space size="small">
                            <Input
                                size="middle"
                                placeholder={`${t('searchProduct')}...`}
                                prefix={isSearch ? <LoadingOutlined /> : <SearchOutlined />}
                                onChange={onSearch}
                            />
                            <Button type="ghost">
                                <Link to="/category/add-hot-product">{t('addHotProduct')}</Link>
                            </Button>
                            <Button type="primary">
                                <Link to="/category/create">{t('addProduct')}</Link>
                            </Button>
                        </Space>
                    </ListHeader>
                )}
                // [
                //     {
                //         id: 1.
                //         name: "product 1"
                //     },
                //     {
                //         id: 2.
                //         name: "product 1"
                //     },
                // ]
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                bordered
                scroll={{ x: 1500 }}
            />
        </div>
    );
}

export default React.memo(ListProduct);
