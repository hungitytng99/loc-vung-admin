import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tooltip, Tag, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, FormOutlined, SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import 'containers/app/screens/Product/components/ListProduct/ListProduct.sass';
import { Link } from 'react-router-dom';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_PRODUCT, GET_LIST_PRODUCT, SEARCH_PRODUCT } from '../../actions/action';
import { getImageWithId } from 'helpers/media';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { REQUEST_STATE } from 'app-configs';
import { PRODUCT_STATUS } from 'app-configs';
import ImageLoading from 'components/Loading/ImageLoading/ImageLoading';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import './ListProduct.sass';
import { MODULES } from 'app-configs';

function ListProduct(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState({
        offset: 0,
        limit: 10,
    });
    const [currentFilter, setCurrentFilter] = useState({});
    const [searchParams, setSearchParams] = useState('');
    const products = useSelector((state) => state.product?.list);

    function handleTableChange(pagina, filters, sorter) {
        setPagination({
            ...pagina,
            offset: pagina.current === 1 ? 0 : (pagina.current - 1) * pagina.pageSize,
            limit: pagina.pageSize,
            total: products?.totalProduct,
        });
        setCurrentFilter({
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });

        dispatch(
            GET_LIST_PRODUCT({
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

    function handleDeleteProduct(product) {
        dispatch(DELETE_PRODUCT(product));
    }

    function onSearch(e) {
        setSearchParams(e.target.value);
        dispatch(
            SEARCH_PRODUCT({
                pagination,
                ...currentFilter,
                title: e.target.value,
            }),
        );
    }

    useEffect(() => {
        dispatch(GET_LIST_PRODUCT({ pagination }));
    }, [dispatch]);

    useEffect(() => {
        setPagination({ ...pagination, total: products?.totalProduct });
    }, [products?.totalProduct]);

    return (
        <div className="list-product">
            {products?.state === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
            <Table
                columns={[
                    {
                        title: t('id'),
                        dataIndex: 'id',
                        width: '2%',
                    },
                    {
                        title: t('productName'),
                        dataIndex: 'title',
                        width: '20%',
                    },
                    {
                        title: t('vendor'),
                        dataIndex: 'vendor',
                        width: '10%',
                        render: (vendor) => {
                            return <div>{vendor?.name}</div>;
                        },
                    },
                    {
                        title: t('status'),
                        dataIndex: 'status',
                        width: '5%',
                        filters: [
                            ...PRODUCT_STATUS.map((status) => ({
                                value: status.value,
                                text: t(status.value),
                            })),
                            {
                                value: 'bestSelling',
                                text: 'bestSelling',
                            },
                        ],
                        filterMultiple: false,
                        render: (status, record) => {
                            const mapStatus =
                                PRODUCT_STATUS.find((productStatus) => productStatus.value === status) ??
                                PRODUCT_STATUS[0];
                            return (
                                <div key={mapStatus.value}>
                                    <Tag color={mapStatus.color}>{t(mapStatus.value).toLocaleUpperCase()}</Tag>
                                    {record?.bestSelling && (
                                        <Tag style={{ marginTop: '5px' }} color="cyan">
                                            {t('bestSeller').toLocaleUpperCase()}
                                        </Tag>
                                    )}
                                </div>
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
                        title: t('productImages'),
                        dataIndex: ['media'],
                        width: '18%',
                        render: (medias = []) => {
                            return (
                                <div className="listProductImages">
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
                                                        className="listProductImagesItem"
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
                        width: '5%',
                        render: (_, record) => {
                            return (
                                <div className="list-product__action">
                                    <Tooltip
                                        className="list-product__action-edit text-grey-300"
                                        title={t('editProduct')}
                                    >
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
                                            className="list-product__action-delete text-grey-300"
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
                    <ListHeader title={t('listProduct')}>
                        <Space size="small">
                            <Input
                                size="middle"
                                placeholder={`${t('searchProduct')}...`}
                                prefix={
                                    products?.state === REQUEST_STATE.REQUEST ? <LoadingOutlined /> : <SearchOutlined />
                                }
                                value={searchParams}
                                onChange={onSearch}
                            />
                            <Button type="primary">
                                <Link to={`${MODULES.productModule.route}/create`}>{t('addProduct')}</Link>
                            </Button>
                        </Space>
                    </ListHeader>
                )}
                rowKey={(record) => record.id}
                dataSource={products?.data ?? []}
                pagination={pagination}
                loading={products?.state === REQUEST_STATE.REQUEST}
                onChange={handleTableChange}
                bordered
                scroll={{ x: 1500 }}
            />
        </div>
    );
}

export default React.memo(ListProduct);
