import React from 'react';
import ListHeader from 'components/Layout/ListHeader/ListHeader';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './CreateProduct.sass';
import { Form, Input, Button, Checkbox } from 'antd';

function CreateProduct(props) {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="create-product">
            <ListHeader title={t('addProduct')}>
                <Button type="primary">
                    <Link to="/product">{t('back')}</Link>
                </Button>
            </ListHeader>
            <div className="create-product__form">
                <Form
                    name="basic"
                    form={form}
                    // labelCol={{
                    //   span: 4,
                    // }}
                    // wrapperCol={{
                    //   span: 20,
                    // }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="inline"
                    size="large"
                >
                    <Form.Item
                        className="create-product__item"
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className="create-product__item"
                        label="Username"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className="create-product__item"
                        label="Username"
                        name="xxx"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        className="create-product__item"
                        label="Username"
                        name="xxx"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <div className="create-product__submit">
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {t('submit')}
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default CreateProduct;
