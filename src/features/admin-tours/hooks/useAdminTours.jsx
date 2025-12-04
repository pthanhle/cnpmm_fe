import { useState } from 'react';
import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/useDebounce';
import { getTours, createTour, updateTour, deleteTour } from '@/api/tours';

export const useAdminTours = () => {
    const queryClient = useQueryClient();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTour, setEditingTour] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const debouncedSearch = useDebounce(searchTerm, 500);

    const { data: responseData, isLoading } = useQuery({
        queryKey: ['admin-tours', page, pageSize, debouncedSearch],
        queryFn: () => getTours({
            page,
            limit: pageSize,
            search: debouncedSearch
        }),
        keepPreviousData: true
    });

    const tours = responseData?.data || [];
    const total = responseData?.total || 0;

    const createMutation = useMutation({
        mutationFn: createTour,
        onSuccess: () => {
            message.success('Tạo tour thành công');
            queryClient.invalidateQueries(['admin-tours']);
            closeModal();
        },
        onError: (err) => message.error(err.response?.data?.message || 'Lỗi tạo tour')
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateTour(id, data),
        onSuccess: () => {
            message.success('Cập nhật tour thành công');
            queryClient.invalidateQueries(['admin-tours']);
            closeModal();
        },
        onError: (err) => message.error(err.response?.data?.message || 'Lỗi cập nhật')
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTour,
        onSuccess: () => {
            message.success('Xóa tour thành công');
            queryClient.invalidateQueries(['admin-tours']);
        },
        onError: (err) => message.error(err.response?.data?.message || 'Lỗi xóa')
    });

    const handleFormSubmit = (values) => {
        const payload = {
            ...values,
            departureDate: values.departureDate ? values.departureDate.toISOString() : null,
        };

        if (editingTour) {
            updateMutation.mutate({ id: editingTour._id, data: payload });
        } else {
            createMutation.mutate(payload);
        }
    };

    const handleDelete = (id) => deleteMutation.mutate(id);

    const handleSearch = (val) => {
        setSearchTerm(val);
        setPage(1);
    };

    const openModal = (record = null) => {
        setEditingTour(record);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setEditingTour(null);
    };

    const isSubmitting = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

    return {
        tours,
        pagination: {
            current: page,
            pageSize: pageSize,
            total: total,
            onChange: (p, ps) => { setPage(p); setPageSize(ps); }
        },
        isLoading: isLoading || isSubmitting,
        searchTerm,
        handleSearch,
        isModalVisible,
        editingTour,
        openModal,
        closeModal,
        handleFormSubmit,
        handleDelete
    };
};