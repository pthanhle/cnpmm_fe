import { useState } from 'react';
import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/useDebounce';
import { getTours } from '@/api/tours';
import { createBooking } from '@/api/bookings';

export const usePublicTours = () => {
    const queryClient = useQueryClient();

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);

    const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);

    const debouncedSearch = useDebounce(searchTerm, 500);

    const { data: responseData, isLoading } = useQuery({
        queryKey: ['public-tours', page, debouncedSearch],
        queryFn: () => getTours({
            page,
            limit: 8,
            search: debouncedSearch
        }),
        keepPreviousData: true
    });

    const tours = responseData?.data || [];
    const total = responseData?.total || 0;

    const bookingMutation = useMutation({
        mutationFn: createBooking,
        onSuccess: () => {
            message.success('Đặt tour thành công! Vui lòng kiểm tra email.');
            queryClient.invalidateQueries(['public-tours']);
            closeBookingModal();
        },
        onError: (err) => message.error(err.response?.data?.message || 'Đặt tour thất bại')
    });

    const handleBookingSubmit = (values) => {
        if (!selectedTour) return;
        bookingMutation.mutate({
            tourId: selectedTour._id,
            customerInfo: {
                fullName: values.fullName,
                email: values.email,
                phone: values.phone,
                address: values.address
            },
            headcount: values.headcount
        });
    };

    const handleSearch = (val) => { setSearchTerm(val); setPage(1); };
    const openBookingModal = (tour) => { setSelectedTour(tour); setIsBookingModalVisible(true); };
    const closeBookingModal = () => { setIsBookingModalVisible(false); setSelectedTour(null); };

    return {
        tours, total, isLoading, page, setPage,
        searchTerm, handleSearch,
        isBookingModalVisible, selectedTour,
        openBookingModal, closeBookingModal,
        handleBookingSubmit, isBookingLoading: bookingMutation.isPending
    };
};