import { REQUEST_STATE } from 'app-configs/index.js';
import { UPLOAD } from 'app-data/fetch';
import { GET, POST, DELETE, PUT } from 'app-data/fetch';
// Data Flow: Step 1

export const apiUploadFile = async (file) => {
    console.log('file: ', file);
    try {
        const response = await UPLOAD('/media/', file, { isFullPath: false });
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

export const apiFileById = async (id) => {
    try {
        const response = await GET('/media/' + id, { isFullPath: false });
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
