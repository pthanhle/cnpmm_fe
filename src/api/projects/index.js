import axiosClient from '../config/axiosClient';
import { PROJECT_ENDPOINTS } from './endpoints';

export const getProjects = () => {
    return axiosClient.get(PROJECT_ENDPOINTS.GET_ALL);
};

export const getProjectById = (id) => {
    return axiosClient.get(PROJECT_ENDPOINTS.GET_BY_ID(id));
};

export const createProject = (data) => {
    return axiosClient.post(PROJECT_ENDPOINTS.CREATE, data);
};

export const updateProject = (id, data) => {
    return axiosClient.put(PROJECT_ENDPOINTS.UPDATE(id), data);
};

export const deleteProject = (id) => {
    return axiosClient.delete(PROJECT_ENDPOINTS.DELETE(id));
};

export const searchProjects = (search) => {
    return axiosClient.get(PROJECT_ENDPOINTS.SEARCH, { params: { search } });
};

export const getProjectsByStatus = (status) => {
    return axiosClient.get(PROJECT_ENDPOINTS.REPORT_BY_STATUS, { params: { status } });
};

export const getProjectMemberStats = () => {
    return axiosClient.get(PROJECT_ENDPOINTS.STATS_MEMBER);
};