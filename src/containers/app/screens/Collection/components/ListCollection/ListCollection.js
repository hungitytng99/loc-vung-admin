import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Button, Layout, Popconfirm, Space, Table, Tooltip, Tag, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, FormOutlined, SearchOutlined, LoadingOutlined, RiseOutlined } from '@ant-design/icons';
import 'containers/app/screens/Collection/components/ListCollection/ListCollection.sass';
import { Link } from 'react-router-dom';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DELETE_COLLECTION, GET_LIST_COLLECTION, SEARCH_COLLECTION } from '../../actions/action';
import { getImageWithId } from 'helpers/media';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { REQUEST_STATE } from 'app-configs';
import { COLLECTION_STATUS } from 'app-configs';
import ImageLoading from 'components/Loading/ImageLoading/ImageLoading';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';

function ListCollection(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState({
        offset: 0,
        limit: 10,
    });
    const [currentFilter, setCurrentFilter] = useState({});
    const [searchParams, setSearchParams] = useState('');
    const collections = useSelector((state) => state.collection?.list);

    function handleTableChange(pagina, filters, sorter) {
        setPagination({
            ...pagina,
            offset: pagina.current === 1 ? 0 : (pagina.current - 1) * pagina.pageSize,
            limit: pagina.pageSize,
            total: collections?.totalCollection,
        });
        setCurrentFilter({
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });

        dispatch(
            GET_LIST_COLLECTION({
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

    function handleDeleteCollection(collection) {
        dispatch(DELETE_COLLECTION(collection));
    }

    function onSearch(e) {
        setSearchParams(() => e.target.value);
        dispatch(
            SEARCH_COLLECTION({
                pagination,
                ...currentFilter,
                title: e.target.value,
            }),
        );
    }

    useEffect(() => {
        dispatch(GET_LIST_COLLECTION({ pagination }));
    }, [dispatch]);

    useEffect(() => {
        setPagination({ ...pagination, total: collections?.totalCollection });
    }, [collections?.totalCollection]);

    return (
        <div className="list-collection">
            {collections?.state === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
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
                        width: '20%',
                    },
                    {
                        title: t('description'),
                        dataIndex: 'description',
                        width: '65%',
                    },
                    {
                        title: t('thumbnailId'),
                        dataIndex: 'thumbnailId',
                        width: '10%',
                        render: (thumbnailId) => {
                            return (
                                <div className="listProductImages">
                                    <Zoom key={thumbnailId}>
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
                                                key={thumbnailId}
                                                src={getImageWithId(thumbnailId)}
                                                alt={thumbnailId}
                                                className="listProductImagesItem"
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
                                <div className="list-collection__action">
                                    <Tooltip
                                        className="list-collection__action-edit text-grey-300"
                                        title={t('editCollection')}
                                    >
                                        <Link
                                            style={{ display: 'block' }}
                                            to={`/collection/edit-collection/${record.id}`}
                                        >
                                            <FormOutlined />
                                        </Link>
                                    </Tooltip>
                                    <div style={{ width: '4px' }}></div>
                                    <Popconfirm
                                        title={`${t('areYouSureToDeleteThisCollection')}?`}
                                        okText={t('yes')}
                                        cancelText={t('cancel')}
                                        onConfirm={() => {
                                            handleDeleteCollection(record);
                                        }}
                                    >
                                        <Tooltip
                                            className="list-collection__action-delete text-grey-300"
                                            title={t('deleteCollection')}
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
                    <ListHeader title={t('listCollection')}>
                        <Space size="small">
                            <Input
                                size="middle"
                                placeholder={`${t('searchCollection')}...`}
                                prefix={
                                    collections?.state === REQUEST_STATE.REQUEST ? (
                                        <LoadingOutlined />
                                    ) : (
                                        <SearchOutlined />
                                    )
                                }
                                value={searchParams}
                                onChange={onSearch}
                            />

                            <Button type="primary">
                                <Link to="/collection/create">{t('addCollection')}</Link>
                            </Button>
                        </Space>
                    </ListHeader>
                )}
                rowKey={(record) => record.id}
                dataSource={collections?.data ?? []}
                pagination={pagination}
                loading={collections?.state === REQUEST_STATE.REQUEST}
                onChange={handleTableChange}
                bordered
                scroll={{ x: 1500 }}
            />
        </div>
    );
}

export default React.memo(ListCollection);
