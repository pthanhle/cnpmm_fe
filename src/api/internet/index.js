import axiosClient from '../config/axiosClient';
import { INTERNET_ENDPOINTS } from './endpoints';

// --- PACKAGES ---
export const getPackages = () => {
    return axiosClient.get(INTERNET_ENDPOINTS.GET_PACKAGES);
};

export const createPackage = (data) => {
    return axiosClient.post(INTERNET_ENDPOINTS.GET_PACKAGES, data);
};

export const updatePackage = (id, data) => {
    return axiosClient.put(`${INTERNET_ENDPOINTS.GET_PACKAGES}/${id}`, data);
};

export const deletePackage = (id) => {
    return axiosClient.delete(`${INTERNET_ENDPOINTS.GET_PACKAGES}/${id}`);
};

// --- CONTRACTS ---
export const getContracts = (search = '') => {
    return axiosClient.get(INTERNET_ENDPOINTS.GET_CONTRACTS, {
        params: { search }
    });
};

export const registerContract = (data) => {
    return axiosClient.post(INTERNET_ENDPOINTS.REGISTER_CONTRACT, data);
};

export const getContractStats = () => {
    return axiosClient.get(INTERNET_ENDPOINTS.GET_STATS);
};

export const sendContractNotification = () => {
    return axiosClient.post(INTERNET_ENDPOINTS.NOTIFY);
};

// --- PAYMENTS ---
export const createPayment = (data) => {
    return axiosClient.post(INTERNET_ENDPOINTS.CREATE_PAYMENT, data);
};

export const getPaymentHistory = (customerId) => {
    return axiosClient.get(INTERNET_ENDPOINTS.GET_HISTORY(customerId));
};