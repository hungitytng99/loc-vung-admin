import { REQUEST_STATE } from 'app-configs/index.js';
import { GET, POST, DELETE, PUT } from 'app-data/fetch';
// Data Flow: Step 1

export const apiListProduct = async (params) => {
    try {
        const response = await GET('/products/', params, { isFullPath: false });
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

export const apiGetProductById = async (id) => {
    try {
        const response = await GET('/products/' + id);
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

// Create product
/*
    params
    {
        "title": "string",
        "description": "string",
        "status": "string",
        "price": 0,
        "comparePrice": 0,
        "url": "string",
        "vendorId": 0,
        "featureImageId": 0,
        "media": [
            0
        ]
    }
*/

export const apiCreateProduct = async (params) => {
    try {
        const response = await POST('/admin/products/', params, { isFullPath: false });
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

export const apiUpdateProduct = async (id, params) => {
    try {
        const response = await PUT('/admin/products/' + id, params, { isFullPath: false });
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

export const apiDeleteProduct = async (id) => {
    try {
        const response = await DELETE('/admin/products/' + id, { isFullPath: false });
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
