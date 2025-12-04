import axiosClient from '../../api/config/axiosClient';
import { AUTH_ENDPOINTS } from './endpoints';

export const loginAPI = (data) => {
    return axiosClient.post(AUTH_ENDPOINTS.LOGIN, data);
};

export const signupAPI = (data) => {
    return axiosClient.post(AUTH_ENDPOINTS.SIGNUP, data);
};