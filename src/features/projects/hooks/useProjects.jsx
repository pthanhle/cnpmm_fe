import { useState } from 'react';
import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    searchProjects,
    getProjectsByStatus,
    getProjectMemberStats
} from '../../../api/projects';

export const useProjects = () => {
    const queryClient = useQueryClient();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState(undefined);

    const { data: projects = [], isLoading: loadingProjects } = useQuery({
        queryKey: ['projects', searchTerm, statusFilter],
        queryFn: async () => {
            if (searchTerm.trim()) {
                return await searchProjects(searchTerm);
            }
            if (statusFilter) {
                return await getProjectsByStatus(statusFilter);
            }
            return await getProjects();
        },
        keepPreviousData: true,
    });

    const { data: memberStats = [] } = useQuery({
        queryKey: ['projectMemberStats', projects],
        queryFn: getProjectMemberStats
    });

    const createMutation = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            message.success('Tạo dự án thành công');
            queryClient.invalidateQueries(['projects']);
            closeModal();
        },
        onError: (error) => message.error('Lỗi tạo: ' + error.message)
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateProject(id, data),
        onSuccess: () => {
            message.success('Cập nhật dự án thành công');
            queryClient.invalidateQueries(['projects']);
            closeModal();
        },
        onError: (error) => message.error('Lỗi cập nhật: ' + error.message)
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            message.success('Xóa dự án thành công');
            queryClient.invalidateQueries(['projects']);
        },
        onError: (error) => message.error('Lỗi xóa: ' + error.message)
    });

    const handleSearch = (term) => setSearchTerm(term);

    const handleFilterStatus = () => {
        queryClient.invalidateQueries(['projects']);
    };

    const handleDelete = (id) => deleteMutation.mutate(id);

    const handleFormSubmit = (values) => {
        if (editingProject) {
            updateMutation.mutate({ id: editingProject._id, data: values });
        } else {
            createMutation.mutate(values);
        }
    };

    const openModal = (record = null) => {
        setEditingProject(record);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setEditingProject(null);
    };

    const isLoading = loadingProjects || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

    return {
        projects,
        memberStats,
        loading: isLoading,
        statusFilter,
        setStatusFilter,
        isModalVisible,
        editingProject,
        searchTerm,
        setSearchTerm,
        openModal,
        closeModal,
        handleSearch,
        handleFilterStatus,
        handleDelete,
        handleFormSubmit
    };
};