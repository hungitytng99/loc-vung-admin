import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row, Upload } from 'antd';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import './EditArticle.sass';
import CKEditor from 'components/Editor/CKEditor';
import { Form } from 'antd';
import { isEmptyValue } from 'helpers/check';
import { PlusOutlined } from '@ant-design/icons';
import {
    GET_DETAIL_ARTICLE_BY_ID,
    RESET_GET_DETAIL_ARTICLE_BY_ID,
    RESET_UPDATE_ARTICLE_STATE,
    UPDATE_ARTICLE,
} from '../../actions/action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { REQUEST_STATE } from 'app-configs';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import { getImageWithId } from 'helpers/media';

function editArticle(props) {
    const { t } = useTranslation();
    const [articleImages, setArticleImages] = useState([]);
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const articleId = history.location.pathname.replace('/articles/edit-articles/', '');
    const articleUpdate = useSelector((state) => state?.articles?.update);
    const [form] = Form.useForm();

    function onContentChange(value) {
        form.setFieldsValue({
            content: value,
        });
        setContent(value);
    }

    function onFinish(values) {
        console.log('values: ', values);
        dispatch(
            UPDATE_ARTICLE({
                article: values,
                originArticle: articleUpdate?.data,
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
        dispatch(
            GET_DETAIL_ARTICLE_BY_ID({
                id: articleId,
            }),
        );
    }, [dispatch]);

    useEffect(() => {
        if (articleUpdate?.getDetailState === REQUEST_STATE.SUCCESS) {
            form.setFieldsValue({
                title: articleUpdate?.data?.title,
                description: articleUpdate?.data?.description,
            });
            setArticleImages([
                {
                    url: getImageWithId(articleUpdate?.data?.avatar),
                },
            ]);
            setContent(articleUpdate?.data?.content);
        }
    }, [articleUpdate?.data]);

    useEffect(() => {
        if (articleUpdate?.state === REQUEST_STATE.SUCCESS) {
            form.resetFields();
            setContent('');
            setArticleImages([]);
            history.push(`/articles/`);
            dispatch(RESET_UPDATE_ARTICLE_STATE());
        }
    }, [articleUpdate?.state]);

    return (
        <div className="editArticle">
            {(articleUpdate?.getDetailState === REQUEST_STATE.REQUEST ||
                articleUpdate?.state === REQUEST_STATE.REQUEST) && <FullPageLoading opacity={0.8} />}
            <div className="editArticleHeader">
                <ListHeader title={t('editArticle')}>
                    <Button type="primary">
                        <Link to="/articles">{t('back')}</Link>
                    </Button>
                </ListHeader>
            </div>
            <div className="editArticleForm">
                <Form name="basic" form={form} onFinish={onFinish} autoComplete="off" layout="inline" size="large">
                    <Col span={12}>
                        <Form.Item
                            className="editArticleItem"
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
                        <Form.Item className="editArticleItem" label={t('description')} name="description">
                            <Input style={{ fontSize: '14px' }} placeholder={t('enterDescription')} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            className="editArticleItem"
                            label={t('articleImage')}
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
                                        if (articleImages.length === 0) {
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
                            className="editArticleFormEditor"
                            label={t('content')}
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

                    <div className="editArticleSubmit">
                        <Button size="middle" type="primary" htmlType="submit">
                            {t('submit')}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default editArticle;
