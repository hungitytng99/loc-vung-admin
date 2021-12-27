import { REQUEST_STATE } from 'app-configs/index.js';
import { GET, POST, DELETE, PUT } from 'app-data/fetch';

export const apiUpdateShopInfo = async (params) => {
    try {
        const response = await POST('/shop-infor/', params, { isFullPath: false });
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

export const apiGetShopInfo = async (params) => {
    try {
        const response = await GET('/shop-infor/', params, { isFullPath: false });
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
