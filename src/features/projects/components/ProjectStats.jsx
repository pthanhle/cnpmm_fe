import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { TeamOutlined, ProjectOutlined } from '@ant-design/icons';

const ProjectStats = ({ stats }) => {
    if (!stats || stats.length === 0) return null;

    return (
        <div className="mb-6">
            <h3 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-300 flex items-center">
                <ProjectOutlined className="mr-2" /> Thống Kê Nhân Sự
            </h3>
            <Row gutter={[16, 16]}>
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <Card
                            hoverable
                            className="border-blue-100 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] shadow-sm"
                        >
                            <Statistic
                                title={
                                    <span className="font-semibold text-gray-600 dark:text-gray-400 truncate block">
                                        {stat.name}
                                    </span>
                                }
                                value={stat.memberCount}
                                valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
                                prefix={<TeamOutlined />}
                                suffix={<span className="text-xs text-gray-400 ml-1">thành viên</span>}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProjectStats;