import React from 'react';
import { Card, Typography, Row, Col, Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    GlobalOutlined,
    RocketOutlined,
    ArrowRightOutlined,
    CheckCircleFilled
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home = () => {
    const navigate = useNavigate();

    // Chỉ giữ lại Module liên quan đến dự án hiện tại
    const modules = [
        {
            id: 'internet',
            title: "Hệ thống Quản lý Internet",
            description: "Giải pháp toàn diện quản lý gói cước, đăng ký hợp đồng, theo dõi thanh toán và chăm sóc khách hàng.",
            path: "/internet-manager",
            icon: <GlobalOutlined />,
            color: "#0ea5e9", // Sky-500
            bgColor: "#e0f2fe", // Sky-100
            features: ['Quản lý Gói cước', 'Hợp đồng điện tử', 'Nhắc nợ tự động']
        }
        // Bạn có thể thêm các module khác trong tương lai tại đây
    ];

    return (
        <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12 mt-4">
                    <div className="inline-block p-4 rounded-full bg-sky-100 dark:bg-sky-900/30 mb-4">
                        <RocketOutlined className="text-4xl text-sky-600 dark:text-sky-400" />
                    </div>
                    <Title level={1} className="!text-gray-800 dark:!text-white !mb-4">
                        ISP Management System
                    </Title>
                    <Paragraph className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Hệ thống quản lý dịch vụ viễn thông tập trung. Tối ưu hóa quy trình vận hành và nâng cao trải nghiệm khách hàng.
                    </Paragraph>
                </div>

                <Row gutter={[32, 32]} justify="center">
                    {modules.map((module) => (
                        <Col xs={24} md={12} lg={10} key={module.id}>
                            <Card
                                hoverable
                                className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden dark:bg-gray-800"
                                bodyStyle={{ padding: '32px', display: 'flex', flexDirection: 'column', height: '100%' }}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm"
                                        style={{ backgroundColor: module.bgColor, color: module.color }}
                                    >
                                        {module.icon}
                                    </div>
                                    <Tag color="blue" className="mr-0 px-3 py-1 text-sm rounded-full bg-sky-100 text-sky-700 border-sky-200">
                                        Phiên bản 1.0
                                    </Tag>
                                </div>

                                <Title level={3} className="!mb-3 dark:!text-white">
                                    {module.title}
                                </Title>

                                <Paragraph type="secondary" className="mb-8 text-base dark:text-gray-400 flex-grow">
                                    {module.description}
                                </Paragraph>

                                <div className="space-y-3 mb-8">
                                    {module.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                                            <CheckCircleFilled className="text-sky-500 mr-2" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    type="primary"
                                    size="large"
                                    block
                                    icon={<ArrowRightOutlined />}
                                    className="h-12 text-lg font-medium rounded-xl bg-sky-600 hover:!bg-sky-500 shadow-sky-200 shadow-lg border-none"
                                    onClick={() => navigate(module.path)}
                                >
                                    Truy cập Hệ thống
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Home;