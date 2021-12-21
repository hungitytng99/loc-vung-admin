export function GET_LIST_ARTICLE(payload) {
    return {
        type: 'GET_LIST_ARTICLE',
        payload,
    };
}

export function GET_LIST_ARTICLE_SUCCESS(payload) {
    return {
        type: 'GET_LIST_ARTICLE_SUCCESS',
        payload,
    };
}

export function GET_LIST_ARTICLE_FAIL(payload) {
    return {
        type: 'GET_LIST_ARTICLE_FAIL',
        payload,
    };
}

export function CREATE_ARTICLE(payload) {
    return {
        type: 'CREATE_ARTICLE',
        payload,
    };
}

export function CREATE_ARTICLE_SUCCESS(payload) {
    return {
        type: 'CREATE_ARTICLE_SUCCESS',
        payload,
    };
}

export function CREATE_ARTICLE_FAIL(payload) {
    return {
        type: 'CREATE_ARTICLE_FAIL',
        payload,
    };
}

export function RESET_CREATE_ARTICLE_STATE(payload) {
    return {
        type: 'RESET_CREATE_ARTICLE_STATE',
        payload,
    };
}
