import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, Col, Divider, Modal, Checkbox, Row, Tooltip } from 'antd';

import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import './EditCollection.sass';
import { useDispatch, useSelector } from 'react-redux';
import { COLLECTION_STATUS } from 'app-configs';
import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { REQUEST_STATE } from 'app-configs';
import {
    GET_COLLECTION_BY_ID,
    GET_COLLECTION_BY_ID_SUCCESS,
    UPDATE_COLLECTION,
    UPDATE_COLLECTION_SUCCESS_STATE,
} from '../../actions/action';
import store from 'redux/index';
import { getImageWithId } from 'helpers/media';
import { getBase64 } from 'helpers/media';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import { isEmptyValue } from 'helpers/check';

const { Option } = Select;

function EditCollection({ match }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const history = useHistory();
    const collectionId = history.location.pathname.replace('/collection/edit-collection/', '');
    const [hasOptions, setHasOptions] = useState(false);

    const [collectionImages, setCollectionImages] = useState([]);
    const [previewCollectionStatus, setPreviewCollectionStatus] = useState({
        image: '',
        title: '',
        isShow: false,
    });
    const collection = useSelector((state) => state.collection.update);
    const notify = useSelector((state) => state.notify);

    const onFinish = (values) => {
        dispatch(UPDATE_COLLECTION({ values, id: collectionId }));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function onSelectStatusChange(value) {
        console.log(value);
    }

    function handleHidePreviewModal() {
        setPreviewCollectionStatus({
            isShow: false,
        });
    }

    useEffect(() => {
        dispatch(
            GET_COLLECTION_BY_ID({
                id: collectionId,
            }),
        );
    }, [history.location.pathname]);

    useEffect(() => {
        if (collection.data) {
            form.setFieldsValue(collection.data);
            // const mapStatus =
            //     COLLECTION_STATUS.find((collectionStatus) => collectionStatus.value === collection.data.status) ??
            //     COLLECTION_STATUS[0];
            // setHasOptions(!isEmptyValue(collection.data.options));
            // form.setFieldsValue({
            //     ...collection.data,
            //     status: mapStatus.value,
            //     options: collection.data.options
            //         ? collection.data.options.map((option) => {
            //               return {
            //                   ...option,
            //                   values: option.values.map((value) => ({ value })),
            //               };
            //           })
            //         : [''],
            // });
            // if (collection.data.media.length > 0) {
            //     const listCollectionImages = collection.data.media.map((img) => {
            //         return {
            //             uid: img.id,
            //             name: img.link,
            //             url: getImageWithId(img.id),
            //         };
            //     });
            //     setCollectionImages(listCollectionImages);
            // }
        }
    }, [collection.data]);

    useEffect(() => {
        if (collection.state === REQUEST_STATE.SUCCESS) {
            history.push('/collection');
            dispatch(UPDATE_COLLECTION_SUCCESS_STATE());
        }
    }, [collection.state]);

    return (
        <div className="create-collection">
            {collection.state === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
            <ListHeader title={t('addCollection')}>
                <Button type="primary">
                    <Link to="/collection">{t('back')}</Link>
                </Button>
            </ListHeader>
            <div className="create-collection__form">
                <Form
                    name="basic"
                    form={form}
                    initialValues={{
                        status: COLLECTION_STATUS[0].value,
                        options: [
                            {
                                title: '',
                                values: [''],
                            },
                        ],
                        availableNumber: 0,
                        price: 0,
                        comparePrice: 0,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="inline"
                    size="large"
                >
                    <Divider style={{ margin: '10px 0px' }} />

                    <Col span={24}>
                        <div className="createCollectionLabel">{t('collectionInformation')}</div>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="create-collection__item"
                            label={t('collectionName')}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                        >
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterCollectionName')} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item className="create-collection__item" label={t('description')} name="description">
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterCollectionDescription')} />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            className="create-collection__item"
                            label={t('thumbnailId')}
                            name="thumbnailId"
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                        >
                            <Input style={{ fontSize: '14px' }} type="number" placeholder={t('enterCollectionPrice')} />
                        </Form.Item>
                    </Col>

                    <div className="createCollectionSubmit">
                        <Button size="middle" type="primary" htmlType="submit">
                            {hasOptions ? t('next') : t('submit')}
                        </Button>
                    </div>
                </Form>
                <Modal
                    visible={previewCollectionStatus.isShow}
                    title={previewCollectionStatus.title}
                    footer={null}
                    onCancel={handleHidePreviewModal}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewCollectionStatus.image} />
                </Modal>
            </div>
        </div>
    );
}

export default EditCollection;
