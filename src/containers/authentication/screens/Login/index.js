import { Button, Checkbox, Form, Input, notification, Spin } from 'antd';
import { TOKEN_KEY } from 'app-configs';
import { REQUEST_STATE } from 'app-configs';
import { isEmptyValue } from 'helpers/check';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { LOGIN } from 'redux/actions/user';
import styles from './Login.module.sass';

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user);
    const { t } = useTranslation();

    const onFinish = (values) => {
        dispatch(LOGIN(values));
    };

    useEffect(() => {
        if (Cookies.get(TOKEN_KEY)) {
            history.push('/');
        }
    }, [user.profile, history]);

    useEffect(() => {
        if (user.authState == REQUEST_STATE.ERROR) {
            notification.error({
                duration: 2,
                message: t('loginFail'),
                description: t(user.errorMessageKey),
            });
        }
    }, [user.authState]);
    return (
        <div className={styles.login}>
            <div className={styles.loginForm}>
                <div className={styles.loginFormSignIn}>{t('signIn')}</div>
                <Form
                    name="basic"
                    initialValues={JSON.parse(localStorage.getItem('rememberUser'))}
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
                        <Input
                            placeholder={t('pleaseEnterYourEmailAddress')}
                            className={styles.loginFormInput}
                            placeholder={t('emailAddress')}
                        />
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
                        <Input.Password placeholder={t('pleaseEnterYourPassword')} className={styles.loginFormInput} />
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
                        <Button
                            disabled={user.authState === REQUEST_STATE.REQUEST}
                            style={{ width: '100%' }}
                            type="primary"
                            htmlType="submit"
                        >
                            {user.authState === REQUEST_STATE.REQUEST ? <Spin /> : t('login')}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
