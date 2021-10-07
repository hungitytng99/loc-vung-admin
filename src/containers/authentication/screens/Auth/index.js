import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { loginAction, registerAction } from '../../redux/actions/authAction';
import { Spin } from 'antd';

const Auth = (props) => {
    const dispatch = useDispatch();
    const { isAuthRequesting } = useSelector((state) => state.user);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <Spin size="large"></Spin>
        </div>
    );
};

export default Auth;
