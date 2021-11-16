import { Button, Checkbox, Form, Input } from 'antd';
import { isEmptyValue } from 'helpers/check';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { login } from 'redux/actions/user';
import styles from './Login.module.sass';

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const authState = useSelector((state) => state.user);
    const { t } = useTranslation();

    const onFinish = (values) => {
        dispatch(login(values));
    };

    useEffect(() => {
        if (!isEmptyValue(authState.profile?.token)) {
            history.push('/');
        }
    }, [authState.profile, history]);

    return (
        <div className={styles.login}>
            <div className={styles.loginForm}>
                <div className={styles.loginFormSignIn}>{t('signIn')}</div>
                <Form
                    name="basic"
                    initialValues={{
                        email: 'admin@locvung.com',
                        password: 'admin',
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <div className={styles.loginFormLabel}>{t('emailAddress')}</div>
                    <Form.Item
                        name="email"
                        style={{ marginBottom: '10px', display: 'flex' }}
                        rules={[
                            {
                                required: true,
                                message: t('pleaseInputYourEmail'),
                            },
                        ]}
                    >
                        <Input className={styles.loginFormInput} placeholder={t('emailAddress')} />
                    </Form.Item>
                    <div className={styles.loginFormLabel}>{t('password')}</div>
                    <Form.Item
                        name="password"
                        style={{ marginBottom: '10px' }}
                        rules={[
                            {
                                required: true,
                                message: t('pleaseInputYourPassword'),
                            },
                        ]}
                    >
                        <Input.Password className={styles.loginFormInput} />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{ marginBottom: '8px' }}
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                        <Checkbox className={styles.rememberMe}>{t('rememberMe')}</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                            {t('login')}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
