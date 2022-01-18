import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row, Upload } from 'antd';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import './CreateArticle.sass';
import CKEditor from 'components/Editor/CKEditor';
import { Form } from 'antd';
import { isEmptyValue } from 'helpers/check';
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { CREATE_ARTICLE, RESET_CREATE_ARTICLE_STATE } from '../../actions/action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { REQUEST_STATE } from 'app-configs';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';

function CreateArticle(props) {
    const { t } = useTranslation();
    const [articleImages, setArticleImages] = useState([]);
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const articleCreate = useSelector((state) => state?.articles?.create);

    const [form] = Form.useForm();

    function onContentChange(value) {
        form.setFieldsValue({
            content: value,
        });
        setContent(value);
    }

    function onFinish(values) {
        dispatch(
            CREATE_ARTICLE({
                article: values,
            }),
        );
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
        setArticleImages(fileList);
    }
    useEffect(() => {
        if (articleCreate?.state === REQUEST_STATE.SUCCESS) {
            form.resetFields();
            setContent('');
            setArticleImages([]);
            dispatch(RESET_CREATE_ARTICLE_STATE());
            history.push(`/articles/`);
        }
    }, [articleCreate?.state]);

    return (
        <div className="createArticle">
            {articleCreate?.state === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
            <div className="createArticleHeader">
                <ListHeader title={t('createArticle')}>
                    <Button type="ghost">
                        <Link to="/articles">{t('back')}</Link>
                    </Button>
                </ListHeader>
            </div>
            <div className="createArticleForm">
                <Form
                    name="basic"
                    form={form}
                    initialValues={{
                        content: '',
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="inline"
                    size="large"
                >
                    <Col span={12}>
                        <Form.Item
                            className="createArticleItem"
                            label={t('title')}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                        >
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterTitle')} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            className="createArticleItem"
                            label={t('description')}
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                            name="description"
                        >
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterDescription')} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            className="createArticleItem"
                            label={t('media')}
                            name="media"
                            required
                            rules={[
                                {
                                    required: true,
                                    message: t('thisFieldIsRequired'),
                                },
                            ]}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || articleImages.length === 0) {
                                            return Promise.reject(new Error(t('youMustUploadImageForArticle')));
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
                                fileList={articleImages}
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
                    <Col span={16}>
                        <Form.Item
                            className="createArticleFormEditor"
                            label={t('Content')}
                            name="content"
                            required
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (isEmptyValue(getFieldValue('content'))) {
                                            return Promise.reject(new Error(t('youMustEnterContentForThisArticle')));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <CKEditor onTextChange={onContentChange} initContent={content} />
                        </Form.Item>
                    </Col>

                    <div className="createArticleSubmit">
                        <Button size="middle" type="primary" htmlType="submit">
                            {t('submit')}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default CreateArticle;
