import React from 'react';

export default function index() {
    return <div>Login</div>;
}

// import React from 'react';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// //import { loginAction, registerAction } from '../../redux/actions/authAction';
// import { Spin } from 'antd';
// import { login, register } from './action';
// import { Form, Input, Card, Button } from 'antd';
// import { select } from 'helpers/reselect';

// const LoginRegister = (props) => {
//     const [form] = Form.useForm();
//     const dispatch = useDispatch();
//     const { isLoginRequesting } = useSelector((state) => select(state, 'login', { isLoginRequesting: false }));
//     const { isAuthenticated } = useSelector((state) => state.user);
//     const onFinish = (values) => {
//         if (tab == 'Login') {
//             dispatch(login(values.password, values.username));
//         } else {
//             delete values.confirm;
//             dispatch(register({ ...values, gender: 'male', role: 'admin' }));
//         }
//         console.log('Input login - register:', values);
//     };

//     const onFinishFailed = (errorInfo) => {
//         console.log('chua nhap dung:', errorInfo);
//     };

//     const listContentTabs = {
//         Login: (
//             <Form
//                 layout="vertical"
//                 name="basic"
//                 size="middle"
//                 initialValues={{ remember: true }}
//                 onFinish={onFinish}
//                 onFinishFailed={onFinishFailed}
//             >
//                 <Form.Item label="Username" name="username">
//                     <Input />
//                 </Form.Item>

//                 <Form.Item label="Password" name="password">
//                     <Input.Password />
//                 </Form.Item>
//                 <Form.Item>
//                     <div className="_center">
//                         <Button
//                             type="primary"
//                             style={{ width: '100%' }}
//                             htmlType="submit"
//                             className="login-form-button"
//                         >
//                             Log in
//                         </Button>
//                     </div>
//                 </Form.Item>
//             </Form>
//         ),
//         Register: (
//             <Form
//                 layout="vertical"
//                 // {...formItemLayout}
//                 form={form}
//                 name="register"
//                 onFinish={onFinish}
//                 onFinishFailed={onFinishFailed}
//                 scrollToFirstError
//             >
//                 <Form.Item
//                     label="Name"
//                     name="name"
//                     rules={[
//                         {
//                             type: 'string',
//                             required: true,
//                             message: 'Please enter your name 6 to 30 charaters!',
//                         },
//                     ]}
//                 >
//                     <Input />
//                 </Form.Item>

//                 <Form.Item
//                     name="email"
//                     label="E-mail"
//                     rules={[
//                         {
//                             type: 'email',
//                             message: 'The input is not valid E-mail!',
//                         },
//                         {
//                             required: true,
//                             message: 'Please input your E-mail!',
//                         },
//                     ]}
//                 >
//                     <Input />
//                 </Form.Item>
//                 <Form.Item
//                     name="password"
//                     label="Password"
//                     rules={[
//                         {
//                             type: 'string',
//                             min: 8,
//                             required: true,
//                             message: 'Must be 8 characters!',
//                         },
//                     ]}
//                     hasFeedback
//                 >
//                     <Input.Password />
//                 </Form.Item>
//                 <Form.Item
//                     name="confirm"
//                     label="Confirm Password"
//                     dependencies={['password']}
//                     hasFeedback
//                     rules={[
//                         {
//                             required: true,
//                             message: 'Please confirm your password!',
//                         },
//                         ({ getFieldValue }) => ({
//                             validator(rule, value) {
//                                 if (!value || getFieldValue('password') === value) {
//                                     return Promise.resolve();
//                                 }
//                                 return Promise.reject('Passwords not match!');
//                             },
//                         }),
//                     ]}
//                 >
//                     <Input.Password />
//                 </Form.Item>
//                 <Form.Item
//                 // {...tailFormItemLayout}
//                 >
//                     <Button type="primary" htmlType="submit">
//                         Register
//                     </Button>
//                 </Form.Item>
//             </Form>
//         ),
//     };

//     const [tab, setTab] = useState('Login');

//     const tabList = [
//         {
//             key: 'Login',
//             tab: 'Login',
//         },
//         {
//             key: 'Register',
//             tab: 'Register',
//         },
//     ];

//     return (
//         <div
//             style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: '100%',
//             }}
//         >
//             {isLoginRequesting ? (
//                 <Spin spinning={isLoginRequesting}>
//                     <Card
//                         style={{ minWidth: '400px' }}
//                         tabList={tabList}
//                         activeTabKey={tab}
//                         onTabChange={(key) => {
//                             setTab(key);
//                         }}
//                     >
//                         {listContentTabs[tab]}
//                     </Card>
//                 </Spin>
//             ) : (
//                 <Card
//                     style={{ minWidth: '400px' }}
//                     tabList={tabList}
//                     activeTabKey={tab}
//                     onTabChange={(key) => {
//                         setTab(key);
//                     }}
//                 >
//                     {listContentTabs[tab]}
//                 </Card>
//             )}
//         </div>
//     );
// };
// LoginRegister.propTypes = {};

// export default LoginRegister;
