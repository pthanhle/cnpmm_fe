import React from 'react';
import { Card, Typography, Row, Col, Button, Tag, Statistic } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    CompassOutlined, GlobalOutlined, ScheduleOutlined,
    SafetyCertificateOutlined, ArrowRightOutlined, RocketOutlined, UserOutlined
} from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';

const { Title, Paragraph } = Typography;

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const features = [
        {
            id: 'explore',
            title: "Khám Phá Tour",
            desc: "Tìm kiếm và đặt các tour du lịch trong và ngoài nước với giá ưu đãi nhất.",
            path: "/tours",
            icon: <CompassOutlined />,
            color: "#1890ff", bgColor: "#e6f7ff", darkBg: "#111d2c",
            role: 'all'
        },
        {
            id: 'admin-tours',
            title: "Quản Lý Tour",
            desc: "Dành cho Admin: Thêm mới, cập nhật giá, lịch trình và quản lý trạng thái.",
            path: "/admin/tours",
            icon: <GlobalOutlined />,
            color: "#722ed1", bgColor: "#f9f0ff", darkBg: "#22075e",
            role: 'admin'
        },
        {
            id: 'admin-bookings',
            title: "Quản Lý Đơn Hàng",
            desc: "Dành cho Admin: Theo dõi booking, xác nhận thanh toán và báo cáo doanh thu.",
            path: "/admin/bookings",
            icon: <ScheduleOutlined />,
            color: "#52c41a", bgColor: "#f6ffed", darkBg: "#135200",
            role: 'admin'
        }
    ];

    const visibleFeatures = features.filter(f =>
        f.role === 'all' || (f.role === 'admin' && user?.role === 'admin')
    );

    return (
        <div className="p-8 bg-gray-50 dark:bg-[#141414] min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 pt-10">
                    <div className="inline-block mb-4">
                        <div className="mb-6">
                            {user ? (
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white m-0">
                                    Xin chào, <span className="text-blue-600">{user.name}</span>
                                </h1>
                            ) : (
                                <div className="inline-flex items-center justify-center px-8 py-3 rounded-full dark:bg-blue-900/20 mb-6 transition-colors">
                                    <span className="text-blue-600 dark:text-blue-400 text-6xl font-bold tracking-wide">
                                        Chào mừng đến với Travel App
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <Title className="!text-5xl !font-extrabold !text-gray-900 dark:!text-white mb-6">
                        Trải Nghiệm Du Lịch Đẳng Cấp
                    </Title>
                    <Paragraph className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Hệ thống quản lý và đặt tour trực tuyến hiện đại, nhanh chóng và an toàn.
                    </Paragraph>
                </div>

                <Row gutter={[32, 32]} className="mb-20">
                    {visibleFeatures.map((feature) => (
                        <Col xs={24} md={visibleFeatures.length === 1 ? 24 : 12} lg={visibleFeatures.length === 1 ? 24 : 8} key={feature.id}>
                            <Card
                                hoverable
                                className="h-full border-0 shadow-lg dark:bg-[#1f1f1f] transition-transform hover:-translate-y-1"
                                bodyStyle={{ padding: '32px', display: 'flex', flexDirection: 'column', height: '100%' }}
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl transition-colors"
                                    style={{ backgroundColor: feature.bgColor, color: feature.color }}
                                >
                                    <style>{`.dark .card-icon-${feature.id} { background-color: ${feature.darkBg} !important; }`}</style>
                                    <div className={`w-full h-full flex items-center justify-center rounded-2xl card-icon-${feature.id}`}>
                                        {feature.icon}
                                    </div>
                                </div>
                                <Title level={3} className="!mb-3 !text-gray-800 dark:!text-white">{feature.title}</Title>
                                <Paragraph className="text-gray-500 dark:text-gray-400 text-base mb-8 flex-grow">{feature.desc}</Paragraph>
                                <Button
                                    type="primary" ghost size="large"
                                    className="w-full mt-auto flex items-center justify-center gap-2 group"
                                    style={{ borderColor: feature.color, color: feature.color }}
                                    onClick={() => navigate(feature.path)}
                                >
                                    Truy Cập Ngay <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <div className="bg-white dark:bg-[#1f1f1f] rounded-3xl p-10 shadow-sm border border-gray-100 dark:border-gray-800">
                    <Row gutter={[48, 48]} justify="center">
                        <Col xs={24} md={8} className="text-center border-r border-gray-100 dark:border-gray-700 last:border-0">
                            <RocketOutlined className="text-4xl text-blue-500 mb-4" />
                            <Statistic title={<span className="text-gray-500 dark:text-gray-400 text-base">Điểm Đến</span>} value={50} suffix="+" valueStyle={{ fontWeight: 'bold', fontSize: '2.5rem' }} className="dark:text-white" />
                        </Col>
                        <Col xs={24} md={8} className="text-center border-r border-gray-100 dark:border-gray-700 last:border-0">
                            <UserOutlined className="text-4xl text-green-500 mb-4" />
                            <Statistic title={<span className="text-gray-500 dark:text-gray-400 text-base">Khách Hàng</span>} value={1200} suffix="+" valueStyle={{ fontWeight: 'bold', fontSize: '2.5rem' }} />
                        </Col>
                        <Col xs={24} md={8} className="text-center">
                            <SafetyCertificateOutlined className="text-4xl text-orange-500 mb-4" />
                            <Statistic title={<span className="text-gray-500 dark:text-gray-400 text-base">Đánh Giá</span>} value={4.9} suffix="/5" valueStyle={{ fontWeight: 'bold', fontSize: '2.5rem' }} />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default Home;