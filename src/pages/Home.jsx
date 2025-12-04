import React from 'react';
import { Card, Typography, Row, Col, Button, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
    TeamOutlined,
    ProjectOutlined,
    ShoppingCartOutlined,
    IdcardOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home = () => {
    const navigate = useNavigate();

    const modules = [
        {
            id: 1,
            title: "Bài 1: Quản Lý Đơn Hàng",
            description: "Kiểm soát đơn hàng, tính toán tổng giá trị và báo cáo doanh thu.",
            path: "/bai1/orders",
            icon: <ShoppingCartOutlined />,
            color: "#52c41a",
            bgColor: "#f6ffed"
        },
        {
            id: 2,
            title: "Bài 2: Quản Lý Dự Án",
            description: "Theo dõi tiến độ dự án, trạng thái hoạt động và nhân sự tham gia.",
            path: "/bai2/projects",
            icon: <ProjectOutlined />,
            color: "#722ed1",
            bgColor: "#f9f0ff"
        }
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <Title level={2} style={{ color: '#1f2937', marginBottom: '0.5rem' }}>
                        Bài tập Công Nghệ Phần Mềm Mới
                    </Title>
                    <Paragraph type="secondary" style={{ fontSize: '1.1rem' }}>
                        Chọn một module bên dưới để bắt đầu
                    </Paragraph>
                </div>

                {/* Modules Grid */}
                <Row gutter={[24, 24]}>
                    {modules.map((module) => (
                        <Col xs={24} sm={12} lg={6} key={module.id}>
                            <Card
                                hoverable
                                className="h-full flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow duration-300 border-t-4"
                                style={{ borderTopColor: module.color }}
                                bodyStyle={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}
                            >
                                <div className="flex-grow">
                                    {/* Icon Area */}
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-3xl"
                                        style={{ backgroundColor: module.bgColor, color: module.color }}
                                    >
                                        {module.icon}
                                    </div>

                                    {/* Content Area */}
                                    <Title level={4} style={{ marginBottom: '12px' }}>
                                        {module.title}
                                    </Title>
                                    <Paragraph type="secondary" className="mb-6">
                                        {module.description}
                                    </Paragraph>
                                </div>

                                {/* Action Area */}
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <Button
                                        type="primary"
                                        ghost
                                        block
                                        icon={<ArrowRightOutlined />}
                                        style={{
                                            borderColor: module.color,
                                            color: module.color
                                        }}
                                        onClick={() => navigate(module.path)}
                                        className="hover:!bg-gray-50"
                                    >
                                        Truy Cập Ngay
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Home;