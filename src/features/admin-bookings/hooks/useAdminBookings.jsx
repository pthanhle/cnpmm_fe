import { useState } from 'react';
import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings, updateBookingStatus } from '@/api/bookings';

export const useAdminBookings = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const rawTourId = searchParams.get('tour');
    const tourId = rawTourId ? rawTourId : undefined;

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data: responseData, isLoading: loadingList } = useQuery({
        queryKey: ['admin-bookings', page, pageSize, tourId],
        queryFn: () => getBookings({
            page,
            limit: pageSize,
            sort: '-createdAt',
            tour: tourId
        }),
        keepPreviousData: true
    });

    const bookings = responseData?.data || [];
    const total = responseData?.meta?.total || 0;

    const updateMutation = useMutation({
        mutationFn: ({ id, status }) => updateBookingStatus(id, status),
        onSuccess: () => {
            message.success('Cập nhật trạng thái thành công');
            queryClient.invalidateQueries(['admin-bookings']);
            queryClient.invalidateQueries(['booking-stats']);
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
        handleStatusChange,
        filteredTourId: tourId
    };
};