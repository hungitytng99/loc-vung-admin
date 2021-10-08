export const LOCAL_STORAGE = {
    collapseSider: 'collapseSider',
    TOKEN: 'token',
};

export function initLocalStorage(value) {
    localStorage.getItem(LOCAL_STORAGE.collapseSider) === null &&
        localStorage.setItem(LOCAL_STORAGE.collapseSider, value);
}

function getValue(key = '', type = '') {
    const value = localStorage.getItem(key);
}

export default {};
