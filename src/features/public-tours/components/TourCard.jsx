import React from 'react';
import { Card, Button, Badge } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatDate } from '@/utils/format';

const { Meta } = Card;

const TourCard = ({ tour, onBook }) => {
    const navigate = useNavigate();

    // Kiểm tra trạng thái full
    const isFull = tour.status === 'full' || tour.currentParticipants >= tour.maxCapacity;

    // Hàm chuyển hướng sang trang chi tiết
    const goToDetail = () => {
        navigate(`/tours/${tour._id}`);
    };

    // Hàm xử lý khi bấm nút Đặt (Ngăn chặn nổi bọt sự kiện để không kích hoạt goToDetail)
    const handleBookClick = (e) => {
        e.stopPropagation(); // Quan trọng: Chặn click xuyên qua card
        onBook(tour);
    };

    return (
        <Badge.Ribbon
            text={isFull ? 'Hết chỗ' : 'Đang mở'}
            color={isFull ? 'red' : 'green'}
        >
            <Card
                hoverable
                className="dark:bg-[#1f1f1f] dark:border-gray-700 h-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}

                // Click vào bất cứ đâu trên Card thì sang trang chi tiết
                onClick={goToDetail}

                cover={
                    <div className="h-48 overflow-hidden relative group">
                        <img
                            alt={tour.name}
                            src={tour.image}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                            }}
                        />
                        {/* Overlay hiệu ứng khi hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                }
            >
                <Meta
                    title={
                        <span
                            className="dark:text-white text-lg font-bold line-clamp-2 h-14 leading-snug"
                            title={tour.name}
                        >
                            {tour.name}
                        </span>
                    }
                    description={
                        <div className="mt-4 space-y-2 text-sm">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <EnvironmentOutlined className="mr-2 text-blue-500" />
                                <span className="truncate">{tour.location}</span>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <ClockCircleOutlined className="mr-2 text-orange-500" />
                                    {tour.duration} ngày
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <UserOutlined className="mr-2 text-purple-500" />
                                    {tour.currentParticipants}/{tour.maxCapacity}
                                </div>
                            </div>

                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <CalendarOutlined className="mr-2 text-green-500" />
                                {formatDate(tour.departureDate)}
                            </div>
                        </div>
                    }
                />

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <span className="text-lg font-bold text-red-600">
                        {formatCurrency(tour.price)}
                    </span>

                    <Button
                        type="primary"
                        onClick={handleBookClick}
                        disabled={isFull || tour.status !== 'active'}
                        className="font-semibold shadow-sm"
                    >
                        {isFull ? 'Hết' : 'Đặt Ngay'}
                    </Button>
                </div>
            </Card>
        </Badge.Ribbon>
    );
};

export default TourCard;