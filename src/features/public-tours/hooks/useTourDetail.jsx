import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useState } from 'react';
import { getTourById } from '@/api/tours';
import { createBooking } from '@/api/bookings';

export const useTourDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);

    // 1. Get Tour Detail
    const { data: responseData, isLoading } = useQuery({
        queryKey: ['tour-detail', id],
        queryFn: () => getTourById(id),
        enabled: !!id
    });

    const tour = responseData?.data || null;

    // 2. Booking Logic (Tái sử dụng)
    const bookingMutation = useMutation({
        mutationFn: createBooking,
        onSuccess: () => {
            message.success('Đặt tour thành công! Kiểm tra email của bạn.');
            setIsBookingModalVisible(false);
        },
        onError: (err) => message.error(err.response?.data?.message || 'Lỗi đặt tour')
    });

    const handleBookingSubmit = (values) => {
        if (!tour) return;
        const payload = {
            tourId: tour._id,
            customerInfo: {
                fullName: values.fullName,
                email: values.email,
                phone: values.phone,
                address: values.address
            },
            headcount: values.headcount
        };
        bookingMutation.mutate(payload);
    };

    return {
        tour,
        isLoading,
        isBookingModalVisible,
        openBookingModal: () => setIsBookingModalVisible(true),
        closeBookingModal: () => setIsBookingModalVisible(false),
        handleBookingSubmit,
        isBookingLoading: bookingMutation.isPending
    };
};