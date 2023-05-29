export const saveLocalStorage = (item) => {
    window.localStorage.setItem('token', item);
    return true;
}

export const getLocalStorage = () => {
    const token = window.localStorage.getItem('token');
    return token;
}

export const deleteLocalStorage = () => {
    window.localStorage.removeItem('token');
    return true;
}