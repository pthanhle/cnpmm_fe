import axiosClient from '../config/axiosClient';
import { ORDER_ENDPOINTS } from './endpoints';

export const getOrders = (params) => {
    return axiosClient.get(ORDER_ENDPOINTS.LIST, { params });
};

export const createOrder = (data) => {
    return axiosClient.post(ORDER_ENDPOINTS.CREATE, data);
};

export const updateOrder = (id, data) => {
    return axiosClient.put(ORDER_ENDPOINTS.UPDATE(id), data);
};

export const deleteOrder = (id) => {
    return axiosClient.delete(ORDER_ENDPOINTS.DELETE(id));
};