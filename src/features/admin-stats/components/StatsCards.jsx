import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { DollarCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { formatCurrency } from '@/utils/format';

const StatsCards = ({ totalRevenue, totalBookings }) => {
    return (
        <Row gutter={16}>
            <Col span={12} md={8}>
                <Card className="dark:bg-[#1f1f1f] dark:border-gray-700 shadow-sm border-gray-200">
                    <Statistic
                        title={<span className="dark:text-gray-400">Tổng Doanh Thu</span>}
                        value={totalRevenue}
                        formatter={formatCurrency}
                        prefix={<DollarCircleOutlined className="text-green-500 mr-2" />}
                        valueStyle={{ color: '#3f8600', fontWeight: 'bold' }}
                    />
                </Card>
            </Col>
            <Col span={12} md={8}>
                <Card className="dark:bg-[#1f1f1f] dark:border-gray-700 shadow-sm border-gray-200">
                    <Statistic
                        title={<span className="dark:text-gray-400">Tổng Đơn Hàng Hoàn Thành</span>}
                        value={totalBookings}
                        prefix={<ShoppingCartOutlined className="text-blue-500 mr-2" />}
                        valueStyle={{ color: '#1677ff', fontWeight: 'bold' }}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default StatsCards;