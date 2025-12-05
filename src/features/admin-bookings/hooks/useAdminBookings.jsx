import { useState } from 'react';
import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBookings, updateBookingStatus, getBookingStats } from '@/api/bookings';

export const useAdminBookings = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const currentYear = new Date().getFullYear();

    const { data: responseData, isLoading: loadingList } = useQuery({
        queryKey: ['admin-bookings', page, pageSize],
        queryFn: () => getBookings({ page, limit: pageSize, sort: '-createdAt' }),
        keepPreviousData: true
    });

    const bookings = responseData?.data || [];
    const total = responseData?.meta?.total || 0;

    const updateMutation = useMutation({
        mutationFn: ({ id, status }) => updateBookingStatus(id, status),
        onSuccess: () => {
            message.success('Cập nhật trạng thái thành công');
            queryClient.invalidateQueries(['admin-bookings']);
            queryClient.invalidateQueries(['booking-stats', currentYear]);
        },
        onError: (e) => message.error(e.response?.data?.message || 'Lỗi cập nhật')
    });

    const handleStatusChange = (id, status) => {
        updateMutation.mutate({ id, status });
    };

    return {
        bookings,
        pagination: {
            current: page,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            onChange: (p, ps) => { setPage(p); setPageSize(ps); }
        },
        isLoading: loadingList || updateMutation.isPending,
        handleStatusChange
    };
};