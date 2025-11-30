import React from 'react';
import { Card, Statistic, Row, Col, Empty } from 'antd';
import { TeamOutlined, ProjectOutlined } from '@ant-design/icons';

const ProjectStats = ({ stats }) => {
    if (!stats || stats.length === 0) {
        return null;
    }

    return (
        <div className="mb-6">
            <h3 className="text-lg font-bold mb-4 text-gray-700">
                <ProjectOutlined className="mr-2" /> Thống Kê Nhân Sự Dự Án
            </h3>
            <Row gutter={[16, 16]}>
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <Card hoverable className="border-blue-100 bg-white shadow-sm">
                            <Statistic
                                title={<span className="font-semibold text-gray-600 truncate">{stat.name}</span>}
                                value={stat.memberCount}
                                valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
                                prefix={<TeamOutlined />}
                                suffix="thành viên"
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProjectStats;