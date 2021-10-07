import {
    REQUEST_STATE,
    Configs,
} from 'containers/app/screens/Kanban/configs/configs.js';
import {
    GET,
    PUT,
    POST,
    DELETE,
    cancelRequest,
    getTokenSource,
} from 'containers/app/screens/Kanban/data-source/fetch.js';

export const apiGetProjectDetail = async (params) => {
    const response = await GET('/project/' + params.projectId);

    return response.data;
};

export const apiSaveProjectStatus = async (params) => {
    const response = await PUT('/field/option/drag', params);
    return response.data;
};
