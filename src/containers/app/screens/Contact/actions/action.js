export function GET_LIST_CONTACT(payload) {
    return {
        type: 'GET_LIST_CONTACT',
        payload,
    };
}

export function GET_LIST_CONTACT_SUCCESS(payload) {
    return {
        type: 'GET_LIST_CONTACT_SUCCESS',
        payload,
    };
}

export function GET_LIST_CONTACT_FAIL(payload) {
    return {
        type: 'GET_LIST_CONTACT_FAIL',
        payload,
    };
}
