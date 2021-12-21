import { REQUEST_STATE } from 'app-configs/index.js';
import { GET, POST, DELETE, PUT } from 'app-data/fetch';

export const apiCreateArticles = async (params) => {
    try {
        const response = await POST('/admin/articles/', params, { isFullPath: false });
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

export const apiListArticles = async (params) => {
    try {
        const response = await GET('/articles/', params, { isFullPath: false });
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

export const apiGetArticlesById = async (id) => {
    try {
        const response = await GET('/articles/' + id, { isFullPath: false });
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
