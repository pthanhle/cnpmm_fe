import { useState } from 'react';
import { message } from 'antd';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from '../../../hooks/useDebounce';
import {
    getProjects, createProject, updateProject, deleteProject, getProjectMemberStats
} from '../../../api/projects';

export const useProjects = () => {
    const queryClient = useQueryClient();

    // UI
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    // Pagination, Search, Filter
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState(undefined);

    const debouncedSearch = useDebounce(searchTerm, 500);

    // --- 1. QUERY: Projects List ---
    const { data: responseData, isLoading: loadingList } = useQuery({
        queryKey: ['projects', page, pageSize, debouncedSearch, statusFilter],
        queryFn: () => getProjects({
            page,
            limit: pageSize,
            search: debouncedSearch,
            status: statusFilter
        }),
        placeholderData: keepPreviousData,
    });

    const projects = responseData?.data || [];
    const totalRecords = responseData?.meta?.total || 0;

    const pagination = {
        current: page,
        pageSize: pageSize,
        total: totalRecords,
        showSizeChanger: true,
        onChange: (p, ps) => {
            setPage(p);
            setPageSize(ps);
        }
    };

    // --- 2. QUERY: Stats ---
    const { data: memberStats = [] } = useQuery({
        queryKey: ['projectMemberStats', projects],
        queryFn: getProjectMemberStats
    });

    // --- Mutations ---
    const createMutation = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            message.success('Tạo thành công');
            queryClient.invalidateQueries(['projects']);
            closeModal();
        },
        onError: (err) => message.error(err.message)
    });
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateProject(id, data),
        onSuccess: () => {
            message.success('Cập nhật thành công');
            queryClient.invalidateQueries(['projects']);
            closeModal();
        },
        onError: (err) => message.error(err.message)
    });
    const deleteMutation = useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            message.success('Xóa thành công');
            queryClient.invalidateQueries(['projects']);
        },
        onError: (err) => message.error(err.message)
    });

    // --- Handlers ---
    const handleSearch = (val) => { setSearchTerm(val); setPage(1); };
    const handleStatusFilter = (val) => { setStatusFilter(val); setPage(1); };

    const handleDelete = (id) => deleteMutation.mutate(id);
    const handleFormSubmit = (val) => editingProject ? updateMutation.mutate({ id: editingProject._id, data: val }) : createMutation.mutate(val);
    const openModal = (r) => { setEditingProject(r); setIsModalVisible(true); };
    const closeModal = () => { setIsModalVisible(false); setEditingProject(null); };

    const isLoading = loadingList || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

    return {
        projects,
        pagination,
        memberStats,
        loading: isLoading,
        searchTerm,
        setSearchTerm: handleSearch,
        statusFilter,
        setStatusFilter: handleStatusFilter,
        isModalVisible, editingProject, openModal, closeModal, handleDelete, handleFormSubmit
    };
};