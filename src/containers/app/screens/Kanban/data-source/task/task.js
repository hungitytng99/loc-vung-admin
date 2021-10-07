import {
    REQUEST_STATE,
    Configs,
} from 'containers/app/screens/Kanban/configs/configs.js';
import { GET, POST } from 'containers/app/screens/Kanban/data-source/fetch.js';

// phaseId = "asd7asda"
export const apiGetListTaskByPhase = async (params) => {
    const response = await GET('/task', params);
    return response.data;
};

export const apiCreateTaskInPhase = async (params) => {
    const response = await POST('/task', params);
    return response.data;
};
