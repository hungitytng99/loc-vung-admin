import {
    GET,
    PUT,
    POST,
    DELETE,
    cancelRequest,
    getTokenSource,
} from 'containers/app/screens/Kanban/data-source/fetch.js';

export const apiUpdateField = async (params) => {
    const response = await PUT('/task/update', params);
    return response.data;
};

export const apiSaveField = async (params) => {
    const response = await POST('/task/update_position', params);
    return response.data;
};
