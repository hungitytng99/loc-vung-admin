import { Button, Col, Form, Input } from 'antd';
import { REQUEST_STATE } from 'app-configs';
import FullPageLoading from 'components/Loading/FullPageLoading/FullPageLoading';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { GET_DETAIL_PROFILE_INFORMATION, UPDATE_PROFILE_INFORMATION } from '../../actions/action';
import './UpdateProfileDetail.sass';

function UpdateProfileDetail(props) {
    const dispatch = useDispatch();
    const profileDetailInformation = useSelector((state) => state?.accountSetting?.detail);
    const profileUpdateInformation = useSelector((state) => state?.accountSetting?.update);
    const [formEditInformation] = Form.useForm();
    const { t } = useTranslation();

    const onUpdateProfileInformation = (values) => {
        dispatch(
            UPDATE_PROFILE_INFORMATION({
                information: values,
            }),
        );
    };

    useEffect(() => {
        dispatch(GET_DETAIL_PROFILE_INFORMATION());
    }, [dispatch]);

    useEffect(() => {
        if (profileDetailInformation?.state === REQUEST_STATE.SUCCESS) {
            formEditInformation.setFieldsValue(profileDetailInformation?.data);
        }
    }, [profileDetailInformation]);

    return (
        <div>
            {profileDetailInformation?.state === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
            {profileUpdateInformation?.state === REQUEST_STATE.REQUEST && <FullPageLoading opacity={0.8} />}
            <div className="updateProfileDetailTitle">{t('updateInfomation')}</div>
            <Form
                name="updateProfileDetail"
                form={formEditInformation}
                initialValues={{
                    shipFee: 0,
                }}
                onFinish={onUpdateProfileInformation}
                autoComplete="off"
                layout="horizontal"
                size="large"
            >
                <Col span={24}>
                    <Form.Item
                        className="updateProfileDetailItem"
                        label={t('shopName')}
                        name="bossName"
                        rules={[
                            {
                                required: true,
                                message: t('thisFieldIsRequired'),
                            },
                        ]}
                    >
                        <Input style={{ fontSize: '14px' }} placeholder={t('enterShopName')} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        className="updateProfileDetailItem"
                        label={t('phone')}
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: t('thisFieldIsRequired'),
                            },
                        ]}
                    >
                        <Input style={{ fontSize: '14px' }} placeholder={t('enterYourPhoneNumber')} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        className="updateProfileDetailItem"
                        label={t('address')}
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: t('thisFieldIsRequired'),
                            },
                        ]}
                    >
                        <Input style={{ fontSize: '14px' }} placeholder={t('enterYourAddress')} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        className="updateProfileDetailItem"
                        label={t('shipFee')}
                        name="shipFee"
                        rules={[
                            {
                                required: true,
                                message: t('thisFieldIsRequired'),
                            },
                        ]}
                    >
                        <Input size="middle" style={{ fontSize: '14px' }} placeholder={t('enterShipFee')} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        className="updateProfileDetailItem"
                        label={t('bankAccountId')}
                        name="bankAccountId"
                        rules={[
                            {
                                required: true,
                                message: t('thisFieldIsRequired'),
                            },
                        ]}
                    >
                        <Input.Password
                            size="middle"
                            style={{ fontSize: '14px' }}
                            placeholder={t('enterYourBankAccountNumber')}
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item className="updateProfileDetailItem" label={t('email')} name="email">
                        <Input style={{ fontSize: '14px' }} placeholder={t('enterYourEmail')} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item className="updateProfileDetailItem" label={t('facebook')} name="facebook">
                        <Input style={{ fontSize: '14px' }} placeholder={t('enterLinkToYourFacebook')} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item className="updateProfileDetailItem" label={t('zalo')} name="zalo">
                        <Input style={{ fontSize: '14px' }} placeholder={t('enterLinkToZaloAccount')} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item className="updateProfileDetailItem" label={t('youtube')} name="youtube">
                        <Input style={{ fontSize: '14px' }} placeholder={t('enterYourYoutubeChannel')} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item className="updateProfileDetailItem" label={t('instagram')} name="instagram">
                        <Input style={{ fontSize: '14px' }} placeholder={t('enterYourInstagram')} />
                    </Form.Item>
                </Col>
                <div className="updateProfileDetailSubmit">
                    <Button size="middle" type="primary" htmlType="submit">
                        {t('update')}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default UpdateProfileDetail;
