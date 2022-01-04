import { REQUEST_STATE } from 'app-configs/index.js';
import { GET, POST, DELETE, PUT } from 'app-data/fetch';

export const apiCreateVariant = async (productId, params) => {
    try {
        const response = await POST(`/admin/products/${productId}/variants`, params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response,
        };
    } catch (error) {
        console.log('error', error);
        return {
            state: REQUEST_STATE.ERROR,
            message: error.message,
        };
    }
};

export const apiUpdateVariant = async (productId, variantId, params) => {
    console.log('params: ', params);
    try {
        const response = await PUT(`/admin/products/${productId}/variants/${variantId}`, params, { isFullPath: false });
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

export const apiDeleteVariant = async (variantId, params) => {
    try {
        const response = await DELETE(`/admin/variants/${variantId}`, params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response,
        };
    } catch (error) {
        console.log('error', error);
        return {
            state: REQUEST_STATE.ERROR,
            message: error.message,
        };
    }
};
