import { REQUEST_STATE } from 'app-configs';
import { GET } from 'app-data/fetch';
import { POST } from 'app-data/fetch';
// Data Flow: Step 1

// Get token
/*
    params
    {
        "deviceId": "string",
    }
*/
export const apiRegisterByDevice = async (params) => {
    try {
        const response = await POST('/auth/register-by-device', params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.result,
        };
    } catch (error) {
        console.log('error', error);
        return {
            state: REQUEST_STATE.ERROR,
            message: error.message,
        };
    }
};

// Get token
/*
    params
    {
        "email": "admin@locvung.com",
        "password": "admin"
    }
*/
export const apiLogin = async (params) => {
    try {
        const response = await POST('/auth/login', params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.result,
        };
    } catch (error) {
        console.log('error', error);
        return {
            state: REQUEST_STATE.ERROR,
            message: error.message,
        };
    }
};

// Get profile
/*
    params
    {
        "email": "admin@locvung.com",
        "password": "admin"
    }
*/
export const apiProfile = async () => {
    try {
        const response = await GET('/me');
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.result,
        };
    } catch (error) {
        console.log('error', error);
        return {
            state: REQUEST_STATE.ERROR,
            message: error.message,
        };
    }
};
