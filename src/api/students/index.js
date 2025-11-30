// src/api/students/index.js
import axiosClient from '../config/axiosClient';
import { STUDENT_ENDPOINTS } from './endpoints';

export const getStudents = () => {
    return axiosClient.get(STUDENT_ENDPOINTS.GET_ALL);
};

export const getStudentById = (id) => {
    return axiosClient.get(STUDENT_ENDPOINTS.GET_BY_ID(id));
};

export const createStudent = (data) => {
    return axiosClient.post(STUDENT_ENDPOINTS.CREATE, data);
};

export const updateStudent = (id, data) => {
    return axiosClient.put(STUDENT_ENDPOINTS.UPDATE(id), data);
};

export const deleteStudent = (id) => {
    return axiosClient.delete(STUDENT_ENDPOINTS.DELETE(id));
};

export const searchStudents = (search) => {
    return axiosClient.get(STUDENT_ENDPOINTS.SEARCH, { params: { search } });
};

export const getStudentStats = () => {
    return axiosClient.get(STUDENT_ENDPOINTS.STATS);
};