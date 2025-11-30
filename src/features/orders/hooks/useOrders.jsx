import { useState } from 'react';
import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderTotalValue,
    getOrderRevenueReport
} from '../../../api/orders';

export const useOrders = () => {
    const queryClient = useQueryClient();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { data: orders = [], isLoading: loadingOrders } = useQuery({
        queryKey: ['orders'],
        queryFn: getOrders
    });

    const { data: totalData } = useQuery({
        queryKey: ['orderTotal', orders],
        queryFn: getOrderTotalValue
    });
    const totalValue = totalData?.totalValue || 0;

    const { data: revenueReport = [], refetch: fetchReport, isFetching: loadingReport } = useQuery({
        queryKey: ['orderReport', startDate, endDate],
        queryFn: () => getOrderRevenueReport(startDate, endDate),
        enabled: false,
    });

    const createMutation = useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            message.success('Thêm đơn hàng thành công');
            queryClient.invalidateQueries(['orders']);
            queryClient.invalidateQueries(['orderTotal']);
            closeModal();
        },
        onError: (error) => message.error('Lỗi thêm: ' + error.message)
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateOrder(id, data),
        onSuccess: () => {
            message.success('Cập nhật đơn hàng thành công');
            queryClient.invalidateQueries(['orders']);
            queryClient.invalidateQueries(['orderTotal']);
            closeModal();
        },
        onError: (error) => message.error('Lỗi cập nhật: ' + error.message)
    });

    const deleteMutation = useMutation({
        mutationFn: deleteOrder,
        onSuccess: () => {
            message.success('Xóa đơn hàng thành công');
            queryClient.invalidateQueries(['orders']);
            queryClient.invalidateQueries(['orderTotal']);
        },
        onError: (error) => message.error('Lỗi xóa: ' + error.message)
    });

    const handleRevenueReport = () => {
        if (!startDate || !endDate) {
            message.warning('Vui lòng chọn đầy đủ khoảng thời gian.');
            return;
        }
        fetchReport(); // Gọi hàm fetch thủ công
        message.success('Đang tạo báo cáo...');
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 500);
    };

    const handleDelete = (id) => deleteMutation.mutate(id);

    const handleFormSubmit = (values) => {
        if (editingOrder) {
            updateMutation.mutate({ id: editingOrder._id, data: values });
        } else {
            createMutation.mutate(values);
        }
    };

    const openModal = (record = null) => {
        setEditingOrder(record);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setEditingOrder(null);
    };

    const isLoading = loadingOrders || loadingReport || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

    return {
        orders,
        totalValue,
        revenueReport,
        loading: isLoading,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        isModalVisible,
        editingOrder,
        openModal,
        closeModal,
        handleRevenueReport,
        handleDelete,
        handleFormSubmit
    };
};