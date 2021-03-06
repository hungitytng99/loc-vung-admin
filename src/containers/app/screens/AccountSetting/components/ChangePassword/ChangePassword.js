import { Button, Col, Form, Input } from 'antd';
import { REQUEST_STATE } from 'app-configs';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_PASSWORD, GET_DETAIL_PROFILE_INFORMATION, UPDATE_PROFILE_INFORMATION } from '../../actions/action';
import './ChangePassword.sass';

function ChangePassword(props) {
    const dispatch = useDispatch();
    const profileChangePassword = useSelector((state) => state?.accountSetting?.changePassword);
    const [formChangePassword] = Form.useForm();
    const { t } = useTranslation();

    const onUpdateProfileInformation = (values) => {
        dispatch(
            CHANGE_PASSWORD({
                password: values,
            }),
        );
    };

    return (
        <div>
            {profileChangePassword?.state === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
            <div className="changePasswordTitle">{t('changePassword')}</div>
            <Form
                name="changePassword"
                form={formChangePassword}
                onFinish={onUpdateProfileInformation}
                autoComplete="off"
                layout="inline"
                size="large"
            >
                <Col span={24}>
                    <Form.Item
                        className="changePasswordItem"
                        label={t('oldPassword')}
                        name="oldPassword"
                        rules={[
                            {
                                required: true,
                                message: t('thisFieldIsRequired'),
                            },
                        ]}
                    >
                        <Input.Password size="middle" placeholder={t('enterOldPassword')} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        className="changePasswordItem"
                        label={t('newPassword')}
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: t('thisFieldIsRequired'),
                            },
                        ]}
                    >
                        <Input.Password size="middle" placeholder={t('enterNewPassword')} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        className="changePasswordItem"
                        label={t('confirmPassword')}
                        name="confirmPassword"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value) {
                                        return Promise.reject(new Error(t('thisFieldIsRequired')));
                                    }
                                    if (getFieldValue('newPassword') !== value) {
                                        return Promise.reject(new Error(t('passwordMustMatch')));
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input.Password size="middle" placeholder={t('confirmNewPassword')} />
                    </Form.Item>
                </Col>
                <div className="changePasswordSubmit">
                    <Button size="middle" type="primary" htmlType="submit">
                        {t('changePassword')}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default ChangePassword;
