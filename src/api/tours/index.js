import axiosClient from '@/api/config/axiosClient';
import { TOUR_ENDPOINTS } from './endpoints';

export const getTours = (params) => axiosClient.get(TOUR_ENDPOINTS.GET_ALL, { params });
export const getTourById = (id) => axiosClient.get(TOUR_ENDPOINTS.GET_BY_ID(id));
export const createTour = (data) => axiosClient.post(TOUR_ENDPOINTS.CREATE, data);
export const updateTour = (id, data) => axiosClient.patch(TOUR_ENDPOINTS.UPDATE(id), data); // Backend dùng PATCH
export const deleteTour = (id) => axiosClient.delete(TOUR_ENDPOINTS.DELETE(id));