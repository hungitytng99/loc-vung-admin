import React, { useEffect, useState } from 'react';
import { Button, Layout, Popconfirm, Space, Table, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import reqwest from 'reqwest';
import { numberWithCommas } from 'helpers/format';
import {
    DeleteOutlined,
    FormOutlined,
    SearchOutlined,
    LoadingOutlined,
    RiseOutlined,
    ConsoleSqlOutlined,
} from '@ant-design/icons';
import 'containers/app/screens/Category/components/ListCategory/ListCategory.sass';
import { Link } from 'react-router-dom';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { Input } from 'antd';
import Moment from 'react-moment';
import moment from 'moment';
import { apiListProduct } from 'app-data/product';
import { apiListArticles } from 'app-data/articles';
import { apiGetArticlesById } from 'app-data/articles';
const { Search } = Input;

function ListCategory(props) {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        categorysPerPage: 10,
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

    function handleDeleteCategory(category) {
        console.log('category: ', category);
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

    // test api
    useEffect(() => {
        (async () => {
            const response = await apiListArticles({
                limmit: 1,
                offset: 1,
            });
            console.log('funtion 2:' + response);
        })();
    }, []);
    useEffect(() => {
        (async () => {
            const response = await apiGetArticlesById({
                id: 1,
            });
            console.log('funtion 2:' + response);
        })();
    }, []);
    // end test
    return (
        <div className="list-category">
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
                    <ListHeader title={t('listCategory')}>
                        <Space size="small">
                            <Input
                                size="middle"
                                placeholder={`${t('searchcategory')}...`}
                                prefix={isSearch ? <LoadingOutlined /> : <SearchOutlined />}
                                onChange={onSearch}
                            />
                            <Button type="ghost">
                                <Link to="/category/add-hot-category">{t('Add HotCategory')}</Link>
                            </Button>
                            <Button type="primary">
                                <Link to="/category/create">{t('Add Category')}</Link>
                            </Button>
                        </Space>
                    </ListHeader>
                )}
                // [
                //     {
                //         id: 1.
                //         name: "category 1"
                //     },
                //     {
                //         id: 2.
                //         name: "category 1"
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

export default React.memo(ListCategory);
