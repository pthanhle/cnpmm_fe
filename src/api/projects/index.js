import axiosClient from '../config/axiosClient';
import { PROJECT_ENDPOINTS } from './endpoints';

// [UPDATE] Gộp chung get và search, filter vào đây
// params: { page, limit, search, status }
export const getProjects = (params) => {
    return axiosClient.get(PROJECT_ENDPOINTS.GET_ALL, { params });
};

export const getProjectById = (id) => axiosClient.get(PROJECT_ENDPOINTS.GET_BY_ID(id));

export const createProject = (data) => axiosClient.post(PROJECT_ENDPOINTS.CREATE, data);

export const updateProject = (id, data) => axiosClient.put(PROJECT_ENDPOINTS.UPDATE(id), data);

export const deleteProject = (id) => axiosClient.delete(PROJECT_ENDPOINTS.DELETE(id));

export const searchProjects = (keyword) => {
    return axiosClient.get(PROJECT_ENDPOINTS.SEARCH, { params: { keyword } });
};

export const getProjectMemberStats = () => axiosClient.get(PROJECT_ENDPOINTS.STATS_MEMBER);