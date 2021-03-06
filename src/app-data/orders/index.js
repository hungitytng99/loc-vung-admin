import { REQUEST_STATE } from 'app-configs/index.js';
import { GET, POST, DELETE, PUT } from 'app-data/fetch';

export const apiCreateOrder = async (params) => {
    try {
        const response = await POST('/orders/', params, { isFullPath: false });
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

export const apiListOrder = async (params) => {
    try {
        const response = await GET('/admin/orders', params, { isFullPath: false });
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

export const apiGetOrderById = async (id) => {
    try {
        const response = await GET('/orders/' + id, {}, { isFullPath: false });
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

export const apiChangeOrderToComming = async (id, status) => {
    try {
        const response = await PUT('/admin/orders/' + id, { status }, { isFullPath: false });
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

export const apiChangeOrderToDoneOrCancel = async (id, status) => {
    try {
        const response = await PUT('/user/orders/' + id, { status }, { isFullPath: false });
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

export const apiGetOrderByUserId = async (userid) => {
    try {
        const response = await GET('/users/' + userid + '/orders/', { isFullPath: false });
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
