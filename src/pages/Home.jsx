import React from 'react';
import { Card, Typography, Row, Col, Button, Statistic } from 'antd';
import { ShoppingCartOutlined, UserOutlined, ArrowRightOutlined, RocketOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="p-8 min-h-[80vh] flex flex-col items-center justify-center">
            {/* Hero Section */}
            <div className="text-center mb-12 max-w-2xl">
                <div className="mb-4 inline-block p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                    <RocketOutlined style={{ fontSize: '32px' }} />
                </div>
                <Title level={1} className="dark:text-white !mb-4">
                    Hệ Thống Quản Lý Nội Bộ
                </Title>
                <Paragraph className="text-gray-500 dark:text-gray-400 text-lg">
                    Chào mừng bạn đến với trang quản trị. Vui lòng chọn một trong các chức năng dưới đây để bắt đầu làm việc.
                </Paragraph>
            </div>

            {/* Quick Access Cards */}
            <Row gutter={[24, 24]} className="w-full max-w-4xl">
                {/* Module Đơn Hàng */}
                <Col xs={24} md={12}>
                    <Card
                        hoverable
                        className="h-full shadow-md dark:bg-[#141414] dark:border-gray-700 transition-transform duration-300 hover:-translate-y-1"
                        bordered={false}
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                                    <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                                </div>
                                <div>
                                    <Title level={4} className="!m-0 dark:text-gray-200">Quản Lý Đơn Hàng</Title>
                                    <span className="text-gray-400 text-sm">Bài tập 1</span>
                                </div>
                            </div>

                            <Paragraph className="text-gray-500 dark:text-gray-400 flex-1">
                                Theo dõi danh sách đơn hàng, tìm kiếm khách hàng, xem chi tiết sản phẩm và tổng doanh thu theo thời gian thực.
                            </Paragraph>

                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Button
                                    type="primary"
                                    block
                                    size="large"
                                    icon={<ArrowRightOutlined />}
                                    iconPosition="end"
                                    onClick={() => navigate('/bai1/orders')}
                                    className="bg-green-600 hover:bg-green-500"
                                >
                                    Truy cập Đơn Hàng
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Col>

                {/* Module Nhân Viên */}
                <Col xs={24} md={12}>
                    <Card
                        hoverable
                        className="h-full shadow-md dark:bg-[#141414] dark:border-gray-700 transition-transform duration-300 hover:-translate-y-1"
                        bordered={false}
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                                    <UserOutlined style={{ fontSize: '24px' }} />
                                </div>
                                <div>
                                    <Title level={4} className="!m-0 dark:text-gray-200">Quản Lý Nhân Viên</Title>
                                    <span className="text-gray-400 text-sm">Bài tập 2</span>
                                </div>
                            </div>

                            <Paragraph className="text-gray-500 dark:text-gray-400 flex-1">
                                Quản lý hồ sơ nhân viên, tra cứu chức vụ, mức lương và thực hiện các thao tác thêm/sửa/xóa nhân sự.
                            </Paragraph>

                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Button
                                    type="primary"
                                    block
                                    size="large"
                                    icon={<ArrowRightOutlined />}
                                    iconPosition="end"
                                    onClick={() => navigate('/bai2/employees')}
                                >
                                    Truy cập Nhân Viên
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Home;