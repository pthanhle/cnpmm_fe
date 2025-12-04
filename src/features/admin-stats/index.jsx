import React from 'react';
import { Typography, Select, Spin } from 'antd';
import { useAdminStats } from './hooks/useAdminStats';
import StatsCards from './components/StatsCards';
import RevenueChart from './components/RevenueChart';

const { Title } = Typography;
const { Option } = Select;

const AdminStatsFeature = () => {
    const {
        year, setYear,
        totalRevenue, totalBookings,
        chartData, isLoading
    } = useAdminStats();

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    return (
        <div className="p-6 bg-gray-50 dark:bg-[#141414] min-h-screen transition-colors">
            <div className="max-w-7xl mx-auto space-y-6">

                <div className="flex justify-between items-center">
                    <Title level={2} className="!mb-0 !text-gray-800 dark:!text-white">
                        Thống Kê Doanh Thu
                    </Title>

                    <Select
                        value={year}
                        onChange={setYear}
                        style={{ width: 120 }}
                        className="shadow-sm"
                    >
                        {years.map(y => (
                            <Option key={y} value={y}>Năm {y}</Option>
                        ))}
                    </Select>
                </div>

                {isLoading ? (
                    <div className="text-center p-20"><Spin size="large" /></div>
                ) : (
                    <>
                        <StatsCards totalRevenue={totalRevenue} totalBookings={totalBookings} />

                        <RevenueChart
                            labels={chartData.labels}
                            revenueData={chartData.revenueDataset}
                            bookingData={chartData.bookingDataset}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminStatsFeature;