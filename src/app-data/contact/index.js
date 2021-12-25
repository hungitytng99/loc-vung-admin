import { REQUEST_STATE } from 'app-configs/index.js';
import { GET, POST, DELETE, PUT } from 'app-data/fetch';

export const apiCreateContact = async (params) => {
    try {
        const response = await POST('/contacts/', params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response?.result,
        };
    } catch (error) {
        console.log('error', error);
        return {
            state: REQUEST_STATE.ERROR,
            message: error.message,
        };
    }
};

export const apiListContact = async (id) => {
    try {
        const response = await GET('/admin/contacts/', { isFullPath: false });
        console.log('response: ', response);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response?.result,
            total: response?.total,
        };
    } catch (error) {
        console.log('error', error);
        return {
            state: REQUEST_STATE.ERROR,
            message: error.message,
        };
    }
};

export const apiGetContactById = async (id) => {
    try {
        const response = await GET('/admin/contacts/' + id, {}, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response?.result,
        };
    } catch (error) {
        console.log('error', error);
        return {
            state: REQUEST_STATE.ERROR,
            message: error.message,
        };
    }
};
