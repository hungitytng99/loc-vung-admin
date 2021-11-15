import { Button, Checkbox, Form, Input } from 'antd';
import { isEmptyValue } from 'helpers/check';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { login } from 'redux/actions/user';
import './Login.sass';

export default function index() {
    const dispatch = useDispatch();
    const history = useHistory();
    const authState = useSelector((state) => state.user);

    const onFinish = (values) => {
        dispatch(login(values));
    };

    useEffect(() => {
        if (!isEmptyValue(authState.profile?.token)) {
            history.push('/');
        }
    }, [authState.profile, history]);

    return (
        <div className="login">
            <div className="login__form">
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        email: 'admin@locvung.com',
                        password: 'admin',
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        style={{ marginBottom: '10px' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        style={{ marginBottom: '10px' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{ marginBottom: '8px' }}
                        wrapperCol={{
                            offset: 9,
                            span: 10,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
