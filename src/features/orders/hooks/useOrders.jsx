import { useState } from 'react';
import { message } from 'antd';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from '../../../hooks/useDebounce';
import {
    getOrders, createOrder, updateOrder, deleteOrder, getOrderTotalValue, getOrderRevenueReport
} from '../../../api/orders';

export const useOrders = () => {
    const queryClient = useQueryClient();

    // UI State
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);

    // Pagination & Search State
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 500);

    // Report State
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // --- 1. QUERY: List Orders (Có phân trang & search) ---
    const { data: responseData, isLoading: loadingList } = useQuery({
        queryKey: ['orders', page, pageSize, debouncedSearch],
        queryFn: () => getOrders({
            page,
            limit: pageSize,
            search: debouncedSearch
        }),
        placeholderData: keepPreviousData, // Giữ data cũ khi chuyển trang
    });

    // Chuẩn hóa data (Giả sử BE trả về { data: [], meta: { total: 100 } })
    // Nếu BE của bạn trả về mảng trực tiếp thì cần sửa lại logic này
    const orders = responseData?.data || [];
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

    // --- 2. QUERY: Total Value ---
    const { data: totalData } = useQuery({
        queryKey: ['orderTotal', orders],
        queryFn: getOrderTotalValue
    });
    const totalValue = totalData?.totalValue || 0;

    // --- 3. QUERY: Report ---
    const { data: revenueReport = [], refetch: fetchReport, isFetching: loadingReport } = useQuery({
        queryKey: ['orderReport', startDate, endDate],
        queryFn: () => getOrderRevenueReport(startDate, endDate),
        enabled: false,
    });

    // --- Mutations ---
    const createMutation = useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            message.success('Tạo thành công');
            queryClient.invalidateQueries(['orders']);
            queryClient.invalidateQueries(['orderTotal']);
            closeModal();
        },
        onError: (err) => message.error(err.message)
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateOrder(id, data),
        onSuccess: () => {
            message.success('Cập nhật thành công');
            queryClient.invalidateQueries(['orders']);
            queryClient.invalidateQueries(['orderTotal']);
            closeModal();
        },
        onError: (err) => message.error(err.message)
    });

    const deleteMutation = useMutation({
        mutationFn: deleteOrder,
        onSuccess: () => {
            message.success('Xóa thành công');
            queryClient.invalidateQueries(['orders']);
            queryClient.invalidateQueries(['orderTotal']);
        },
        onError: (err) => message.error(err.message)
    });

    // --- Handlers ---
    const handleSearch = (term) => {
        setSearchTerm(term);
        setPage(1); // Reset về trang 1 khi search
    };

    const handleRevenueReport = () => {
        if (!startDate || !endDate) return message.warning('Vui lòng chọn ngày!');
        fetchReport();
        // Scroll xuống dưới để xem báo cáo
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 300);
    };

    const handleDelete = (id) => deleteMutation.mutate(id);
    const handleFormSubmit = (val) => editingOrder ? updateMutation.mutate({ id: editingOrder._id, data: val }) : createMutation.mutate(val);
    const openModal = (r) => { setEditingOrder(r); setIsModalVisible(true); };
    const closeModal = () => { setIsModalVisible(false); setEditingOrder(null); };

    const isLoading = loadingList || loadingReport || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

    return {
        orders,
        pagination,
        totalValue,
        revenueReport,
        loading: isLoading,
        searchTerm,
        setSearchTerm: handleSearch,
        startDate, setStartDate, endDate, setEndDate,
        isModalVisible, editingOrder, openModal, closeModal,
        handleRevenueReport, handleDelete, handleFormSubmit
    };
};