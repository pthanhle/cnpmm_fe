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

    const apiData = response?.data || {};
    const monthlyStats = apiData.monthlyStats || [];
    const statusStats = apiData.statusStats || [];

    const totalRevenue = monthlyStats.reduce((acc, curr) => acc + (curr.totalRevenue || 0), 0);
    const totalBookings = monthlyStats.reduce((acc, curr) => acc + (curr.numBookings || 0), 0);

    const chartData = Array.from({ length: 12 }, (_, index) => {
        const monthIndex = index + 1;
        const found = monthlyStats.find(item => item.month === monthIndex);
        return {
            month: `Tháng ${monthIndex}`,
            revenue: found ? found.totalRevenue : 0,
            bookings: found ? found.numBookings : 0
        };
    });

    const labels = chartData.map(d => d.month);
    const revenueDataset = chartData.map(d => d.revenue);
    const bookingDataset = chartData.map(d => d.bookings);

    const paidCount = statusStats.find(s => s._id === 'paid')?.count || 0;
    const canceledCount = statusStats.find(s => s._id === 'canceled')?.count || 0;

    return {
        year, setYear,
        totalRevenue,
        totalBookings,
        barChartData: { labels, revenueDataset, bookingDataset },
        pieChartData: { paidCount, canceledCount },
        isLoading
    };
};