import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { TrophyOutlined, FallOutlined, UserOutlined } from '@ant-design/icons';

const StudentStats = ({ stats }) => {
    return (
        <Row gutter={[24, 24]} className="mb-6">
            {/* Card GPA Cao Nhất */}
            <Col xs={24} md={12}>
                <Card hoverable className="bg-green-50 border-green-200">
                    <Statistic
                        title={<span className="text-green-700 font-semibold">GPA Cao Nhất</span>}
                        value={stats.max?.gpa || 0}
                        precision={2}
                        valueStyle={{ color: '#3f8600', fontWeight: 'bold' }}
                        prefix={<TrophyOutlined />}
                        suffix={`- ${stats.max?.fullName || 'N/A'}`}
                    />
                </Card>
            </Col>

            {/* Card GPA Thấp Nhất */}
            <Col xs={24} md={12}>
                <Card hoverable className="bg-red-50 border-red-200">
                    <Statistic
                        title={<span className="text-red-700 font-semibold">GPA Thấp Nhất</span>}
                        value={stats.min?.gpa || 0}
                        precision={2}
                        valueStyle={{ color: '#cf1322', fontWeight: 'bold' }}
                        prefix={<FallOutlined />}
                        suffix={`- ${stats.min?.fullName || 'N/A'}`}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default StudentStats;