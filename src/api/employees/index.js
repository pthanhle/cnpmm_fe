import axiosClient from '../config/axiosClient';
import { EMPLOYEE_ENDPOINTS } from './endpoints';

export const getEmployees = (params) => {
    return axiosClient.get(EMPLOYEE_ENDPOINTS.LIST, { params });
};

export const getEmployeeById = (id) => {
    return axiosClient.get(EMPLOYEE_ENDPOINTS.DETAIL(id));
};

export const createEmployee = (data) => {
    return axiosClient.post(EMPLOYEE_ENDPOINTS.CREATE, data);
};

export const updateEmployee = (id, data) => {
    return axiosClient.put(EMPLOYEE_ENDPOINTS.UPDATE(id), data);
};

export const deleteEmployee = (id) => {
    return axiosClient.delete(EMPLOYEE_ENDPOINTS.DELETE(id));
};