import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const TestComponent = () => {
    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };

    return (
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.List name="users">
                {(fields, { add, remove }) => {
                    return (
                        <div>
                            {fields.map((field) => (
                                <>
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'first']}
                                            fieldKey={[field.fieldKey, 'first']}
                                            rules={[{ required: true, message: 'Missing first name' }]}
                                        >
                                            <Input placeholder="First Name" />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    </Space>

                                    <Form.List name={[field.name, 'nicknames']}>
                                        {(nicknames, { add, remove }) => {
                                            return (
                                                <div>
                                                    {nicknames.map((nickname) => (
                                                        <Space key={nickname.key} align="start">
                                                            <Form.Item
                                                                {...nickname}
                                                                name={[nickname.name, 'nickname']}
                                                                fieldKey={[nickname.fieldKey, 'nickname']}
                                                                rules={[
                                                                    { required: true, message: 'Missing nickname' },
                                                                ]}
                                                            >
                                                                <Input placeholder="Nickname" />
                                                            </Form.Item>

                                                            <MinusCircleOutlined
                                                                onClick={() => {
                                                                    remove(nickname.name);
                                                                }}
                                                            />
                                                        </Space>
                                                    ))}

                                                    <Form.Item>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => {
                                                                add();
                                                            }}
                                                            block
                                                        >
                                                            <PlusOutlined /> Add nickname
                                                        </Button>
                                                    </Form.Item>
                                                </div>
                                            );
                                        }}
                                    </Form.List>
                                </>
                            ))}

                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                    }}
                                    block
                                >
                                    <PlusOutlined /> Add field
                                </Button>
                            </Form.Item>
                        </div>
                    );
                }}
            </Form.List>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TestComponent;
