import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Button, Layout, Popconfirm, Space, Table, Tooltip, Tag, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, FormOutlined, SearchOutlined, LoadingOutlined, RiseOutlined } from '@ant-design/icons';
import 'containers/app/screens/Product/components/ListProduct/ListProduct.sass';
import { Link } from 'react-router-dom';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { GET_LIST_ARTICLE } from '../../actions/action';
import { getImageWithId } from 'helpers/media';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { REQUEST_STATE } from 'app-configs';
import ImageLoading from 'components/Loading/ImageLoading/ImageLoading';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import './ListArticle.sass';
import { getTextFromHtml } from 'helpers/format';

function ListArticle(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState({
        offset: 0,
        limit: 10,
    });
    const [currentFilter, setCurrentFilter] = useState({});
    const [searchParams, setSearchParams] = useState('');
    const articlesList = useSelector((state) => state.article?.list);
    console.log('articlesList: ', articlesList);

    function handleTableChange(pagina, filters, sorter) {
        setPagination({
            ...pagina,
            offset: pagina.current === 1 ? 0 : (pagina.current - 1) * pagina.pageSize,
            limit: pagina.pageSize,
            total: articlesList.totalProduct,
        });
        setCurrentFilter({
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });

        dispatch(
            GET_LIST_ARTICLE({
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

    // function handleDeleteProduct(product) {
    //     dispatch(DELETE_PRODUCT(product));
    // }

    useEffect(() => {
        dispatch(GET_LIST_ARTICLE({ pagination }));
    }, [dispatch]);

    useEffect(() => {
        setPagination({ ...pagination, total: articlesList?.totalProduct });
    }, [articlesList?.totalProduct]);

    return (
        <div className="listArticle">
            {articlesList?.state === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
            <Table
                columns={[
                    {
                        title: t('id'),
                        dataIndex: 'id',
                        width: '2%',
                    },
                    {
                        title: t('title'),
                        dataIndex: 'title',
                        width: '15%',
                    },
                    {
                        title: t('description'),
                        dataIndex: 'description',
                        width: '20%',
                        render: (description) => {
                            return <div>{description}</div>;
                        },
                    },
                    {
                        title: t('content'),
                        dataIndex: 'content',
                        sorter: true,
                        width: '30%',
                        render: (content) => <div className="text_over_flow_2">{getTextFromHtml(content)}</div>,
                    },
                    {
                        title: t('image'),
                        dataIndex: ['avatar'],
                        width: '5%',
                        render: (avatarId) => {
                            return (
                                <div className="listArticleImages">
                                    <Zoom key={avatarId}>
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
                                                key={avatarId}
                                                src={getImageWithId(avatarId)}
                                                alt={avatarId}
                                                className="listArticleImagesItem"
                                            ></ImageLoading>
                                        </div>
                                    </Zoom>
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
                                <div className="listArticleAction">
                                    <Tooltip className="listArticleActionEdit text-grey-300" title={t('editProduct')}>
                                        <Link style={{ display: 'block' }} to={`/product/edit-product/${record.id}`}>
                                            <FormOutlined />
                                        </Link>
                                    </Tooltip>
                                    <div style={{ width: '4px' }}></div>
                                    <Popconfirm
                                        title={`${t('areYouSureToDeleteThisProduct')}?`}
                                        okText={t('yes')}
                                        cancelText={t('cancel')}
                                        onConfirm={() => {
                                            handleDeleteProduct(record);
                                        }}
                                    >
                                        <Tooltip
                                            className="listArticleActionDelete text-grey-300"
                                            title={t('deleteProduct')}
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
                title={() => (
                    <ListHeader title={t('listArticle')}>
                        <Space size="small">
                            <Button type="primary">
                                <Link to="/article/create">{t('createArticle')}</Link>
                            </Button>
                        </Space>
                    </ListHeader>
                )}
                rowKey={(record) => record.id}
                dataSource={articlesList?.data ?? []}
                pagination={pagination}
                loading={articlesList?.state === REQUEST_STATE.REQUEST}
                onChange={handleTableChange}
                bordered
                scroll={{ x: 1500 }}
            />
        </div>
    );
}

export default React.memo(ListArticle);
