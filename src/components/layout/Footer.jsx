import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import {
    FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined,
    EnvironmentOutlined, PhoneOutlined, MailOutlined, AppstoreOutlined,
    SendOutlined
} from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
    return (
        <AntFooter className="bg-white dark:bg-[#001529] border-t border-gray-200 dark:border-gray-800 px-8 py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={8}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
                                <AppstoreOutlined />
                            </div>
                            <span className="text-xl font-bold text-gray-800 dark:text-white">Travel App</span>
                        </div>
                        <Paragraph className="text-gray-500 dark:text-gray-400 mb-6">
                            Nền tảng đặt tour du lịch hàng đầu Việt Nam. Chúng tôi cam kết mang đến những trải nghiệm du lịch tuyệt vời, an toàn và đáng nhớ nhất cho bạn và gia đình.
                        </Paragraph>
                        <Space size="large">
                            <Link href="#" className="text-gray-400 hover:text-blue-500 text-2xl transition"><FacebookOutlined /></Link>
                            <Link href="#" className="text-gray-400 hover:text-pink-500 text-2xl transition"><InstagramOutlined /></Link>
                            <Link href="#" className="text-gray-400 hover:text-blue-400 text-2xl transition"><TwitterOutlined /></Link>
                            <Link href="#" className="text-gray-400 hover:text-red-600 text-2xl transition"><YoutubeOutlined /></Link>
                        </Space>
                    </Col>

                    <Col xs={24} sm={12} md={5}>
                        <Title level={5} className="!text-gray-800 dark:!text-white mb-6">Về Chúng Tôi</Title>
                        <Space direction="vertical" size="middle" className="text-gray-500 dark:text-gray-400">
                            <Link href="#" className="!text-gray-500 dark:!text-gray-400 hover:!text-blue-500 transition">Giới thiệu</Link>
                            <Link href="#" className="!text-gray-500 dark:!text-gray-400 hover:!text-blue-500 transition">Tuyển dụng</Link>
                            <Link href="#" className="!text-gray-500 dark:!text-gray-400 hover:!text-blue-500 transition">Tin tức & Blog</Link>
                            <Link href="#" className="!text-gray-500 dark:!text-gray-400 hover:!text-blue-500 transition">Chính sách bảo mật</Link>
                            <Link href="#" className="!text-gray-500 dark:!text-gray-400 hover:!text-blue-500 transition">Điều khoản sử dụng</Link>
                        </Space>
                    </Col>

                    <Col xs={24} sm={12} md={5}>
                        <Title level={5} className="!text-gray-800 dark:!text-white mb-6">Hỗ Trợ</Title>
                        <Space direction="vertical" size="middle" className="text-gray-500 dark:text-gray-400">
                            <Link href="#" className="!text-gray-500 dark:!text-gray-400 hover:!text-blue-500 transition">Trung tâm trợ giúp</Link>
                            <Link href="#" className="!text-gray-500 dark:!text-gray-400 hover:!text-blue-500 transition">Hướng dẫn đặt tour</Link>
                            <Link href="#" className="!text-gray-500 dark:!text-gray-400 hover:!text-blue-500 transition">Chính sách hoàn tiền</Link>
                            <Link href="#" className="!text-gray-500 dark:!text-gray-400 hover:!text-blue-500 transition">Câu hỏi thường gặp</Link>
                            <Link href="#" className="!text-gray-500 dark:!text-gray-400 hover:!text-blue-500 transition">Liên hệ</Link>
                        </Space>
                    </Col>

                    <Col xs={24} md={6}>
                        <Title level={5} className="!text-gray-800 dark:!text-white mb-6">Liên Hệ</Title>
                        <Space direction="vertical" size="middle">
                            <div className="flex items-start gap-3 text-gray-500 dark:text-gray-400">
                                <EnvironmentOutlined className="mt-1 text-blue-500" />
                                <span>Tầng 1, Tòa A, Phòng 224, TP. Hồ Chí Minh</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                                <PhoneOutlined className="text-green-500" />
                                <span>0768513038</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                                <MailOutlined className="text-orange-500" />
                                <span>support@travelapp.com</span>
                            </div>
                        </Space>
                    </Col>
                </Row>

                <Divider className="dark:border-gray-700 my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Text className="text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Travel App. Tất cả các quyền được bảo lưu.
                    </Text>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="!text-gray-500 dark:!text-gray-400 hover:!text-blue-500">Quyền riêng tư</Link>
                        <Link href="#" className="!text-gray-500 dark:!text-gray-400 hover:!text-blue-500">Cookies</Link>
                    </div>
                </div>
            </div>
        </AntFooter>
    );
};

const { Paragraph } = Typography;

export default Footer;