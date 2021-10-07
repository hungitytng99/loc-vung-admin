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

export const apiListTabView = async (params) => {
    const response = await GET('/user_board_view/', params);
    return response.data;
};
