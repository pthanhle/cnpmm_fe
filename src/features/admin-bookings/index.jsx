import React from 'react';
import { Card, Typography, Alert, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAdminBookings } from './hooks/useAdminBookings';
import BookingTable from './components/BookingTable';

const { Title } = Typography;

const AdminBookingsFeature = () => {
    const navigate = useNavigate();
    const {
        bookings, pagination, isLoading,
        handleStatusChange, filteredTourId
    } = useAdminBookings();

    return (
        <div className="p-6 bg-gray-50 dark:bg-[#141414] min-h-screen transition-colors">
            <div className="max-w-7xl mx-auto space-y-6">
                <Title level={2} className="!mb-0 !text-gray-800 dark:!text-white">Quản Lý Đơn Hàng</Title>

                {filteredTourId && (
                    <Alert
                        message="Đang xem danh sách khách của một Tour cụ thể"
                        description={`Mã Tour: ${filteredTourId}`}
                        type="info"
                        showIcon
                        action={
                            <Button size="small" type="primary" onClick={() => navigate('/admin/bookings')}>
                                Xem tất cả
                            </Button>
                        }
                        className="mb-4"
                    />
                )}

                <Card className="shadow-sm dark:bg-[#1f1f1f] dark:border-gray-700" bodyStyle={{ padding: '24px' }}>
                    <BookingTable
                        bookings={bookings}
                        loading={isLoading}
                        pagination={pagination}
                        onStatusChange={handleStatusChange}
                    />
                </Card>
            </div>
        </div>
    );
};

export default AdminBookingsFeature;