import React, { useEffect, useState } from 'react';
import { Button, Table, Row, Col, Form, Tooltip, Popconfirm, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { GET_LIST_CONTACT } from '../../actions/action';
import 'react-medium-image-zoom/dist/styles.css';
import { REQUEST_STATE } from 'app-configs';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import './ContactPage.sass';
import { I18LANGUAGE_KEY } from 'app-configs';

function VendorPage(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState({
        offset: 0,
        limit: 10,
    });
    const contactList = useSelector((state) => state.contact?.list);
    const [formEditVendor] = Form.useForm();

    function handleTableChange(pagina, filters) {
        setPagination({
            ...pagina,
            offset: pagina.current === 1 ? 0 : (pagina.current - 1) * pagina.pageSize,
            limit: pagina.pageSize,
            total: contactList?.total,
        });
        dispatch(
            GET_LIST_CONTACT({
                pagination: {
                    ...pagina,
                    offset: pagina.current === 1 ? 0 : (pagina.current - 1) * pagina.pageSize,
                    limit: pagina.pageSize,
                },
                ...filters,
            }),
        );
    }

    useEffect(() => {
        dispatch(GET_LIST_CONTACT({ pagination }));
    }, [dispatch]);

    useEffect(() => {
        setPagination({ ...pagination, total: contactList?.total });
    }, [contactList?.total]);

    return (
        <div className="contactPage">
            {contactList?.state === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
            <Row>
                <Col span={24} className="contactPageList">
                    <Form form={formEditVendor} component={false}>
                        <Table
                            columns={[
                                {
                                    title: t('id'),
                                    dataIndex: 'id',
                                    width: '5%',
                                },
                                {
                                    title: t('customerName'),
                                    dataIndex: 'customerName',
                                    width: '20%',
                                },
                                {
                                    title: t('customerEmail'),
                                    dataIndex: 'customerEmail',
                                    width: '20%',
                                },
                                {
                                    title: t('customerPhone'),
                                    dataIndex: 'customerPhone',
                                    width: '20%',
                                },
                                {
                                    title: t('message'),
                                    dataIndex: 'message',
                                    width: '20%',
                                },
                                {
                                    title: t('createdAt'),
                                    dataIndex: 'createdAt',
                                    width: '20%',
                                    render: (createdAt) =>
                                        new Date(createdAt).toLocaleString(localStorage.getItem(I18LANGUAGE_KEY)),
                                },
                            ]}
                            title={() => <ListHeader title={t('listCustomerContact')}></ListHeader>}
                            rowKey={(record) => record.id}
                            dataSource={contactList?.data ?? []}
                            pagination={pagination}
                            loading={contactList?.state === REQUEST_STATE.REQUEST}
                            onChange={handleTableChange}
                            bordered
                        />
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default React.memo(VendorPage);
