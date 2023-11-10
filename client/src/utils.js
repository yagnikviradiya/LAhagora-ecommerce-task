import { userType } from "./constants";

export const isAuthenticated = () => {
    // Check if a token exists in local storage
    return localStorage.getItem('token') !== null;
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const logoutUser = () => {
    // Remove token from local storage
    removeUserCredential();
    window.location.replace('/')
};

export const getUserRole = () => {
    // Retrieve the user's role from the token or another source
    return localStorage.getItem('roal');
};

export const isStoreOwner = () => {
    // Retrieve the user's roal from the token or another source
    return localStorage.getItem('roal') === userType.STOREOWNER;
};

export const storeUserCredential = (token, roal) => {
    localStorage.setItem('token', token);
    localStorage.setItem('roal', roal);
};

export const removeUserCredential = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roal');
};
