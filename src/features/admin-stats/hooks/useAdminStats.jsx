import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBookingStats } from '@/api/bookings';

export const useAdminStats = () => {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);

    const { data: response, isLoading } = useQuery({
        queryKey: ['booking-stats', year],
        queryFn: () => getBookingStats(year),
        keepPreviousData: true
    });

    const statsData = response?.data || [];

    const totalRevenue = statsData.reduce((acc, curr) => acc + (curr.totalRevenue || 0), 0);
    const totalBookings = statsData.reduce((acc, curr) => acc + (curr.numBookings || 0), 0);

    const monthlyData = Array.from({ length: 12 }, (_, index) => {
        const monthIndex = index + 1;
        const found = statsData.find(item => item.month === monthIndex);
        return {
            month: `Tháng ${monthIndex}`,
            revenue: found ? found.totalRevenue : 0,
            bookings: found ? found.numBookings : 0
        };
    });

    const labels = monthlyData.map(d => d.month);
    const revenueDataset = monthlyData.map(d => d.revenue);
    const bookingDataset = monthlyData.map(d => d.bookings);

    return {
        year, setYear,
        totalRevenue,
        totalBookings,
        chartData: {
            labels,
            revenueDataset,
            bookingDataset
        },
        isLoading
    };
};