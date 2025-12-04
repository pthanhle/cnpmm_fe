import axiosClient from '@/api/config/axiosClient';
import { BOOKING_ENDPOINTS } from './endpoints';

export const getBookings = (params) => axiosClient.get(BOOKING_ENDPOINTS.GET_ALL, { params });
export const createBooking = (data) => axiosClient.post(BOOKING_ENDPOINTS.CREATE, data);
export const updateBookingStatus = (id, status) => axiosClient.patch(BOOKING_ENDPOINTS.UPDATE_STATUS(id), { status });
export const getBookingStats = (year) => axiosClient.get(BOOKING_ENDPOINTS.STATS, { params: { year } });
export const verifyBooking = (token) => axiosClient.get(BOOKING_ENDPOINTS.VERIFY(token));