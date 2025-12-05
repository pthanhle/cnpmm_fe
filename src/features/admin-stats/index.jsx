import React from 'react';
import { Typography, Select, Spin, Row, Col } from 'antd';
import { useAdminStats } from './hooks/useAdminStats';
import { StatsCards, RevenueChart, StatusPieChart } from './components';

const { Title } = Typography;
const { Option } = Select;

const AdminStatsFeature = () => {
    const {
        year, setYear,
        totalRevenue, totalBookings,
        barChartData, pieChartData,
        isLoading
    } = useAdminStats();

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    return (
        <div className="p-6 bg-gray-50 dark:bg-[#141414] min-h-screen transition-colors">
            <div className="max-w-7xl mx-auto space-y-6">

                <div className="flex justify-between items-center">
                    <Title level={2} className="!mb-0 !text-gray-800 dark:!text-white">
                        Dashboard Thống Kê
                    </Title>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400 hidden sm:inline">Năm tài chính:</span>
                        <Select
                            value={year}
                            onChange={setYear}
                            style={{ width: 120 }}
                            className="shadow-sm"
                        >
                            {years.map(y => <Option key={y} value={y}>{y}</Option>)}
                        </Select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="text-center p-20"><Spin size="large" /></div>
                ) : (
                    <>
                        <StatsCards totalRevenue={totalRevenue} totalBookings={totalBookings} />

                        <Row gutter={[24, 24]} className="mt-2" align="stretch">
                            <Col xs={24} lg={16} style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="flex-1">
                                    <RevenueChart
                                        labels={barChartData.labels}
                                        revenueData={barChartData.revenueDataset}
                                        bookingData={barChartData.bookingDataset}
                                    />
                                </div>
                            </Col>

                            <Col xs={24} lg={8} style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="flex-1">
                                    <StatusPieChart
                                        paidCount={pieChartData.paidCount}
                                        canceledCount={pieChartData.canceledCount}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminStatsFeature;