import { REQUEST_STATE } from 'app-configs/index.js';
import { GET, POST, DELETE, PUT } from 'app-data/fetch';
// Data Flow: Step 1

export const apiCreateCollection = async (params) => {
    try {
        const response = await POST('/collections/', params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.result,
            total: response.total,
        };
    } catch (error) {
        console.log('error', error);
        return {
            state: REQUEST_STATE.ERROR,
            message: error.message,
        };
    }
};
export const apiListCollection = async (params) => {
    try {
        const response = await GET('/collections/', params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.result,
            total: response.total,
        };
    } catch (error) {
        console.log('error', error);
        return {
            state: REQUEST_STATE.ERROR,
            message: error.message,
        };
    }
};

export const apiGetCollectionById = async (id) => {
    try {
        const response = await GET('/collections/' + id);
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

export const apiUpdateCollection = async (id, params) => {
    try {
        const response = await PUT('/admin/collections/' + id, params, { isFullPath: false });
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

export const apiDeleteCollection = async (id) => {
    try {
        const response = await DELETE('/admin/collections/' + id, { isFullPath: false });
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
