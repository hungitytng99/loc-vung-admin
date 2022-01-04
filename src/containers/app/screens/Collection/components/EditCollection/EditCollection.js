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
        const params = {
            ...values,
            media: collectionImages,
            status: t(values.status),
            options: values.options
                ? values.options.map((option) => {
                      return {
                          ...option,
                          values: option.values.map((value) => value.value),
                      };
                  })
                : values.options,
        };

        dispatch(UPDATE_COLLECTION({ params, id: collectionId }));
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

    async function handlePreviewCollectionImage(file) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewCollectionStatus({
            image: file.url || file.preview,
            isShow: true,
            title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    }

    function handleChangeUploadImage({ fileList }) {
        setCollectionImages(fileList);
    }

    function handleChangeOptions() {
        setHasOptions(!hasOptions);
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
            const mapStatus =
                COLLECTION_STATUS.find((collectionStatus) => collectionStatus.value === collection.data.status) ??
                COLLECTION_STATUS[0];
            setHasOptions(!isEmptyValue(collection.data.options));
            form.setFieldsValue({
                ...collection.data,
                status: mapStatus.value,
                options: collection.data.options
                    ? collection.data.options.map((option) => {
                          return {
                              ...option,
                              values: option.values.map((value) => ({ value })),
                          };
                      })
                    : [''],
            });
            if (collection.data.media.length > 0) {
                const listCollectionImages = collection.data.media.map((img) => {
                    return {
                        uid: img.id,
                        name: img.link,
                        url: getImageWithId(img.id),
                    };
                });
                setCollectionImages(listCollectionImages);
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
                        options: [
                            {
                                title: '',
                                values: [''],
                            },
                        ],
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="inline"
                    size="large"
                >
                    <Col className="flex-height-center" style={{ marginBottom: '10px' }} span={24}>
                        <span className="createCollectionLabel">{t('collectionStatus')}</span>
                        <Tooltip title={t('theCollectionWillBeHiddenOrVisibleFromAllSalesChannel ')}>
                            <QuestionCircleOutlined
                                className="createCollectionLabelInfo"
                                style={{ marginLeft: '6px' }}
                            />
                        </Tooltip>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="create-collection__item"
                            label={t('status')}
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                        >
                            <Select style={{ width: 160 }} onChange={onSelectStatusChange} size="middle">
                                {COLLECTION_STATUS.map((collectionStatus) => {
                                    return (
                                        <Option key={collectionStatus.value} value={collectionStatus.value}>
                                            {t(collectionStatus.value)}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
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
                            label={t('price')}
                            name="price"
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
                    <Col span={8}>
                        <Form.Item
                            className="create-collection__item"
                            label={t('comparePrice')}
                            name="comparePrice"
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                        >
                            <Input
                                style={{ fontSize: '14px' }}
                                type="number"
                                placeholder={t('enterCollectionComparePrice')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item className="create-collection__item" label={t('collectionUrl')} name="url">
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterCollectionURL')} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item className="create-collection__item" label={t('vendorId')} name="vendorId">
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterCollectionVendor')} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            className="create-collection__item"
                            label={t('availableCollections')}
                            name="availableNumber"
                        >
                            <Input
                                type="number"
                                style={{ fontSize: '14px' }}
                                placeholder={t('enternumberOfAvailableCollections')}
                            />
                        </Form.Item>
                    </Col>
                    <Divider style={{ margin: '10px 0px' }} />
                    <Col span={24}>
                        <div className="createCollectionLabel">{t('listCollectionImages')}</div>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            className="create-collection__item"
                            label={t('media')}
                            name="media"
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || collectionImages.length === 0) {
                                            return Promise.reject(new Error(t('youMustUploadAtLeast1Image')));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Upload
                                accept="image/*"
                                onPreview={handlePreviewCollectionImage}
                                listType="picture-card"
                                customRequest={({ onSuccess }) => onSuccess('ok')}
                                fileList={collectionImages}
                                onChange={handleChangeUploadImage}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Divider style={{ margin: '10px 0px' }} />
                    <Col span={24}>
                        <div className="createCollectionLabel">{t('options')}</div>
                    </Col>
                    <Checkbox checked={hasOptions} onChange={handleChangeOptions}>
                        <span>{t('thisCollectionHasOptionsLikeSizeOrColor')}</span>
                    </Checkbox>
                    <Col span={24}></Col>
                    {hasOptions && (
                        <>
                            <Form.List
                                name="options"
                                rules={[
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || value.length === 0) {
                                                return Promise.reject(new Error(t('youMustAddAtLeast1Option')));
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <Col span={24}>
                                        <Col span={24}>
                                            <Button
                                                size="middle"
                                                type="ghost"
                                                onClick={() => add()}
                                                icon={<PlusOutlined />}
                                                disabled={
                                                    form.getFieldValue('options')
                                                        ? form.getFieldValue('options').length > 2
                                                        : false
                                                }
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    margin: '6px 0px 14px 0px',
                                                }}
                                            >
                                                {t('addOption')}
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Col>
                                        <Row>
                                            {fields.map((field, index) => {
                                                return (
                                                    <>
                                                        <Col
                                                            span={7}
                                                            key={field.key}
                                                            className="createCollectionListOptions"
                                                            style={{
                                                                marginTop: '6px',
                                                                border: '1px solid rgba(0, 0, 0, 0.2)',
                                                                padding: '0px 0px 10px 15px',
                                                            }}
                                                        >
                                                            <Row
                                                                style={{
                                                                    fontWeight: 500,
                                                                    height: '37px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <span>{t('optionName')}</span>
                                                            </Row>
                                                            <Row>
                                                                <Col span={22}>
                                                                    <Form.Item
                                                                        {...field}
                                                                        name={[field.name, 'title']}
                                                                        fieldKey={[field.fieldKey, 'title']}
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message: t('thisFieldIsRequired'),
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Input
                                                                            size="middle"
                                                                            placeholder={t('enterOptionName')}
                                                                            style={{
                                                                                height: '37px',
                                                                            }}
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col
                                                                    style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        height: '37px',
                                                                    }}
                                                                    span={2}
                                                                >
                                                                    <DeleteOutlined
                                                                        className="createCollectionDeleteOption"
                                                                        style={{ marginRight: '8px' }}
                                                                        onClick={() => remove(field.name)}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row
                                                                style={{
                                                                    fontWeight: 500,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    margin: '6px 0px 10px 0px',
                                                                }}
                                                            >
                                                                <span>{t('optionValues')}</span>
                                                            </Row>

                                                            <Form.List
                                                                name={[field.name, 'values']}
                                                                rules={[
                                                                    ({ getFieldValue }) => ({
                                                                        validator(_, value) {
                                                                            if (!value || value.length === 0) {
                                                                                return Promise.reject(
                                                                                    new Error(
                                                                                        t('youMustAddAtLeast1Value'),
                                                                                    ),
                                                                                );
                                                                            }
                                                                            return Promise.resolve();
                                                                        },
                                                                    }),
                                                                ]}
                                                            >
                                                                {(values, { add, remove }, { errors }) => {
                                                                    return (
                                                                        <>
                                                                            <Form.ErrorList errors={errors} />
                                                                            {values.map((value, index) => {
                                                                                return (
                                                                                    <Row
                                                                                        key={value.key}
                                                                                        style={{ margin: '8px 0px' }}
                                                                                    >
                                                                                        <Col span={22}>
                                                                                            <Form.Item
                                                                                                {...value}
                                                                                                name={[
                                                                                                    value.name,
                                                                                                    'value',
                                                                                                ]}
                                                                                                fieldKey={[
                                                                                                    value.fieldKey,
                                                                                                    'value',
                                                                                                ]}
                                                                                                rules={[
                                                                                                    {
                                                                                                        required: true,
                                                                                                        message:
                                                                                                            t(
                                                                                                                'thisFieldIsRequired',
                                                                                                            ),
                                                                                                    },
                                                                                                ]}
                                                                                            >
                                                                                                <Input
                                                                                                    size="middle"
                                                                                                    placeholder={t(
                                                                                                        'enterValue',
                                                                                                    )}
                                                                                                    style={{
                                                                                                        height: '37px',
                                                                                                    }}
                                                                                                />
                                                                                            </Form.Item>
                                                                                        </Col>

                                                                                        <Col
                                                                                            style={{
                                                                                                height: '37px',
                                                                                                display: 'flex',
                                                                                                alignItems: 'center',
                                                                                            }}
                                                                                            span={2}
                                                                                        >
                                                                                            <DeleteOutlined
                                                                                                className="createCollectionDeleteOption"
                                                                                                style={{
                                                                                                    marginRight: '8px',
                                                                                                }}
                                                                                                onClick={() =>
                                                                                                    remove(value.name)
                                                                                                }
                                                                                            />
                                                                                        </Col>
                                                                                    </Row>
                                                                                );
                                                                            })}

                                                                            <Form.Item>
                                                                                <Button
                                                                                    style={{
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        height: '37px',
                                                                                    }}
                                                                                    size="middle"
                                                                                    type="dashed"
                                                                                    onClick={() => add()}
                                                                                    icon={<PlusOutlined />}
                                                                                >
                                                                                    {t('addAnotherValue')}
                                                                                </Button>
                                                                            </Form.Item>
                                                                        </>
                                                                    );
                                                                }}
                                                            </Form.List>
                                                        </Col>
                                                        <Col span={1}></Col>
                                                    </>
                                                );
                                            })}
                                        </Row>
                                    </Col>
                                )}
                            </Form.List>
                        </>
                    )}

                    <div className="createCollectionSubmit">
                        <Form.Item>
                            <Button size="middle" type="primary" htmlType="submit">
                                {t('submit')}
                            </Button>
                        </Form.Item>
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
