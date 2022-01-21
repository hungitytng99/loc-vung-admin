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
import { GET_COLLECTION_BY_ID, UPDATE_COLLECTION, UPDATE_COLLECTION_SUCCESS_STATE } from '../../actions/action';
import { getImageWithId } from 'helpers/media';
import { getBase64 } from 'helpers/media';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';

function EditCollection({ match }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const history = useHistory();
    const collectionId = match?.params?.id;
    const [collectionImages, setCollectionImages] = useState([]);
    const [previewCollectionStatus, setPreviewCollectionStatus] = useState({
        image: '',
        title: '',
        isShow: false,
    });
    const collection = useSelector((state) => state.collection.update);

    const onFinish = (values) => {
        dispatch(UPDATE_COLLECTION({ params: { ...values, media: collectionImages }, id: collectionId }));
    };

    function handleHidePreviewModal() {
        setPreviewCollectionStatus({
            isShow: false,
        });
    }

    async function handlePreviewProductImage(file) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewProductStatus({
            image: file.url || file.preview,
            isShow: true,
            title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    }

    function handleChangeUploadImage({ fileList }) {
        setCollectionImages(fileList);
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
            form.setFieldsValue({
                title: collection.data.title,
                description: collection.data.description,
            });
            if (collection.data.thumbnailId) {
                const collectionImage = [
                    {
                        uid: collection.data.thumbnailId,
                        name: collection.data.thumbnailId,
                        url: getImageWithId(collection.data.thumbnailId),
                    },
                ];
                setCollectionImages(collectionImage);
            }
        }
    }, [collection.data]);

    useEffect(() => {
        if (collection.state === REQUEST_STATE.SUCCESS) {
            history.push('/collection');
            dispatch(UPDATE_COLLECTION_SUCCESS_STATE());
        }
    }, [collection.state]);

    return (
        <div className="edit-collection">
            {collection.state === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
            <ListHeader title={t('addCollection')}>
                <Button type="primary">
                    <Link to="/collection">{t('back')}</Link>
                </Button>
            </ListHeader>
            <div className="edit-collection__form">
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
                    autoComplete="off"
                    layout="inline"
                    size="large"
                >
                    <Divider style={{ margin: '10px 0px' }} />

                    <Col span={24}>
                        <div className="editCollectionLabel">{t('collectionInformation')}</div>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="edit-collection__item"
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
                        <Form.Item className="edit-collection__item" label={t('description')} name="description">
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterCollectionDescription')} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <div className="editCollectionLabel">{t('collectionImage')}</div>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            className="editProduct__item"
                            label={t('medias')}
                            name="media"
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (collectionImages.length === 0) {
                                            return Promise.reject(new Error(t('youMustUploadAtLeast1Image')));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Upload
                                accept="image/*"
                                onPreview={handlePreviewProductImage}
                                listType="picture-card"
                                customRequest={({ onSuccess }) => onSuccess('ok')}
                                fileList={collectionImages}
                                onChange={handleChangeUploadImage}
                                maxCount={1}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <div className="editCollectionSubmit">
                        <Button size="middle" type="primary" htmlType="submit">
                            {t('submit')}
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
