import React, { useEffect, useState } from 'react';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import './CreateCollection.sass';
import { Form, Input, Button, Select, Upload, Col, Divider, Modal, Checkbox, Row, Tooltip, Badge } from 'antd';
import { COLLECTION_STATUS } from 'app-configs';
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_COLLECTION } from '../../actions/action';
import { REQUEST_STATE } from 'app-configs';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import { getBase64 } from 'helpers/media';

const { Option } = Select;

function CreateCollection(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [collectionImages, setCollectionImages] = useState([]);
    const [hasOptions, setHasOptions] = useState(false);
    const history = useHistory();

    const [previewCollectionStatus, setPreviewCollectionStatus] = useState({
        image: '',
        title: '',
        isShow: false,
    });
    const collectionCreate = useSelector((state) => state.collection.create);
    const collectionUpdate = useSelector((state) => state.collection.update);

    const notify = useSelector((state) => state.notify);

    const onFinish = (values) => {
        dispatch(CREATE_COLLECTION({ params: values }));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
        if (collectionCreate?.state === REQUEST_STATE.SUCCESS) {
            form.resetFields();
            setCollectionImages([]);
            if (hasOptions && collectionUpdate?.data.id) {
                history.push(`/collection/edit-variant/${collectionUpdate?.data.id}`);
            }
        }
    }, [collectionCreate?.state]);

    return (
        <div className="create-collection">
            {collectionCreate?.state === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
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

export default CreateCollection;
