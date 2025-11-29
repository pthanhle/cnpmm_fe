import React from 'react';
import { DatePicker, Button, Space } from 'antd';
import { PlusOutlined, BarChartOutlined } from '@ant-design/icons';

const OrderFilter = ({ setStartDate, setEndDate, onReport, onOpenModal }) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Nhóm Lọc Ngày */}
            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded border border-gray-200">
                <span className="text-gray-500 font-medium">Thời gian:</span>
                <DatePicker
                    placeholder="Từ ngày"
                    onChange={(_, dateString) => setStartDate(dateString)}
                    format="YYYY-MM-DD"
                    style={{ width: 150 }}
                />
                <span className="text-gray-400">-</span>
                <DatePicker
                    placeholder="Đến ngày"
                    onChange={(_, dateString) => setEndDate(dateString)}
                    format="YYYY-MM-DD"
                    style={{ width: 150 }}
                />
                <Button type="default" icon={<BarChartOutlined />} onClick={onReport}>
                    Xem Báo Cáo
                </Button>
            </div>

            {/* Nút chức năng chính */}
            <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={onOpenModal}
                className="shadow-md"
            >
                Thêm Đơn Hàng Mới
            </Button>
        </div>
    );
};

export default OrderFilter;