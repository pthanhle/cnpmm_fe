import axiosClient from '../config/axiosClient';
import { ORDER_ENDPOINTS } from './endpoints';

export const getOrders = (params) => {
    return axiosClient.get(ORDER_ENDPOINTS.GET_ALL, { params });
};

export const getOrderById = (id) => axiosClient.get(ORDER_ENDPOINTS.GET_BY_ID(id));

export const createOrder = (data) => axiosClient.post(ORDER_ENDPOINTS.CREATE, data);

export const updateOrder = (id, data) => axiosClient.put(ORDER_ENDPOINTS.UPDATE(id), data);

export const deleteOrder = (id) => axiosClient.delete(ORDER_ENDPOINTS.DELETE(id));

export const getOrderTotalValue = () => axiosClient.get(ORDER_ENDPOINTS.TOTAL_VALUE);

export const getOrderRevenueReport = (startDate, endDate) => {
    return axiosClient.get(ORDER_ENDPOINTS.REVENUE_REPORT, {
        params: { startDate, endDate }
    });
};