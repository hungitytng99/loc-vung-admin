import React, { useEffect, useState } from 'react';
import { Button, Layout, Space, Table, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import reqwest from 'reqwest';
import { numberWithCommas } from 'helpers/format';
import { DeleteOutlined, FormOutlined, SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import 'containers/app/screens/Product/components/ListProduct/ListProduct.sass';
import { Link } from 'react-router-dom';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { Input } from 'antd';
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
        return {
            results: params.pagination.pageSize,
            page: params.pagination.current,
            ...params,
        };
    }

    function fetchData(params) {
        setLoading(true);
        reqwest({
            url: 'http://103.163.118.206:1236/api/product',
            method: 'get',
            type: 'json',
            data: getRandomuserParams(params),
        }).then((response) => {
            console.log('response: ', response);
            setLoading(false);
            setData(response.data);
            setPagination({
                ...params.pagination,
                total: 100,
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
        fetchData({ pagination });
    }, []);
    return (
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
                    width: '65%',
                },
                {
                    title: t('price'),
                    dataIndex: 'price',
                    width: '10%',
                    render: (price) => numberWithCommas(price),
                },
                {
                    title: t('discount') + '%',
                    dataIndex: 'discount',
                    width: '10%',
                },
                {
                    title: t('newPrice'),
                    dataIndex: 'new_price',
                    width: '10%',
                    render: (price) => numberWithCommas(price),
                },
                {
                    title: t('action'),
                    key: 'action',
                    dataIndex: 'action',
                    width: '3%',
                    render: (_, record) => {
                        return (
                            <div className="list-product__action">
                                <Tooltip className="list-product__action-edit text-grey-300" title={t('editProduct')}>
                                    <Link style={{ display: 'block' }} to={`/product/edit-product/${record.id}`}>
                                        <FormOutlined />
                                    </Link>
                                </Tooltip>
                                <div style={{ width: '4px' }}></div>
                                <Tooltip
                                    className="list-product__action-delete text-grey-300"
                                    title={t('deleteProduct')}
                                >
                                    <DeleteOutlined
                                        onClick={() => {
                                            handleDeleteProduct(record);
                                        }}
                                    />
                                </Tooltip>
                            </div>
                        );
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
                            <Link to="/product/add-hot-product">{t('addHotProduct')}</Link>
                        </Button>
                        <Button type="primary">
                            <Link to="/product/create">{t('addProduct')}</Link>
                        </Button>
                    </Space>
                </ListHeader>
            )}
            rowKey={(record) => record.id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            bordered
            scroll={{ x: 1500 }}
        />
    );
}

export default ListProduct;
