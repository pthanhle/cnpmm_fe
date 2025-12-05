import React from 'react';
import { Button, Card, Spin, Tag, Typography, Row, Col, Divider, Image } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined, CalendarOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTourDetail } from '../hooks/useTourDetail';
import { formatCurrency, formatDate } from '@/utils/format';
import { TOUR_STATUS_COLOR, TOUR_STATUS_LABEL } from '@/constants';
import BookingModal from './BookingModal';

const { Title, Paragraph } = Typography;

const TourDetail = () => {
    const navigate = useNavigate();
    const {
        tour, isLoading,
        isBookingModalVisible, openBookingModal, closeBookingModal,
        handleBookingSubmit, isBookingLoading
    } = useTourDetail();

    if (isLoading) return <div className="h-screen flex justify-center items-center"><Spin size="large" /></div>;
    if (!tour) return <div className="text-center pt-20">Không tìm thấy tour</div>;

    const isFull = tour.status === 'full' || tour.currentParticipants >= tour.maxCapacity;

    return (
        <div className="p-6 bg-gray-50 dark:bg-[#141414] min-h-screen transition-colors">
            <div className="max-w-6xl mx-auto">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                    className="mb-4 dark:text-white"
                >
                    Quay lại
                </Button>

                <Card className="shadow-lg border-0 dark:bg-[#1f1f1f] dark:border-gray-700 overflow-hidden">
                    <Row gutter={[32, 32]}>
                        {/* Left: Image */}
                        <Col xs={24} md={12}>
                            <Image
                                src={tour.image}
                                alt={tour.name}
                                className="w-full h-96 object-cover rounded-lg shadow-sm"
                                fallback="https://via.placeholder.com/600x400"
                            />
                        </Col>

                        {/* Right: Info */}
                        <Col xs={24} md={12}>
                            <div className="flex flex-col h-full">
                                <div>
                                    <Tag color={TOUR_STATUS_COLOR[tour.status]} className="mb-2">
                                        {TOUR_STATUS_LABEL[tour.status]}
                                    </Tag>
                                    <Title level={2} className="!mb-4 !text-gray-800 dark:!text-white">
                                        {tour.name}
                                    </Title>

                                    <div className="space-y-3 text-lg text-gray-600 dark:text-gray-300 mb-6">
                                        <div className="flex items-center">
                                            <EnvironmentOutlined className="mr-3 text-blue-500" />
                                            {tour.location}
                                        </div>
                                        <div className="flex items-center">
                                            <ClockCircleOutlined className="mr-3 text-orange-500" />
                                            {tour.duration} ngày
                                        </div>
                                        <div className="flex items-center">
                                            <CalendarOutlined className="mr-3 text-green-500" />
                                            Khởi hành: {formatDate(tour.departureDate)}
                                        </div>
                                        <div className="flex items-center">
                                            <UserOutlined className="mr-3 text-purple-500" />
                                            Đã đặt: {tour.currentParticipants}/{tour.maxCapacity}
                                        </div>
                                    </div>

                                    <Title level={3} className="text-red-600 !mb-6">
                                        {formatCurrency(tour.price)} <span className="text-sm text-gray-400 font-normal">/ khách</span>
                                    </Title>
                                </div>

                                <div className="mt-auto">
                                    <Button
                                        type="primary"
                                        size="large"
                                        block
                                        onClick={openBookingModal}
                                        disabled={isFull || tour.status !== 'active'}
                                        className="h-12 text-lg font-bold"
                                    >
                                        {isFull ? 'Hết Chỗ' : 'Đặt Tour Ngay'}
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Divider className="dark:border-gray-700" />

                    <div>
                        <Title level={4} className="dark:!text-white">Mô Tả Chi Tiết</Title>
                        <Paragraph className="text-gray-600 dark:text-gray-400 text-base leading-relaxed whitespace-pre-line">
                            {tour.description}
                        </Paragraph>
                    </div>
                </Card>

                <BookingModal
                    visible={isBookingModalVisible}
                    onCancel={closeBookingModal}
                    onSubmit={handleBookingSubmit}
                    tour={tour}
                    loading={isBookingLoading}
                />
            </div>
        </div>
    );
};

export default TourDetail;