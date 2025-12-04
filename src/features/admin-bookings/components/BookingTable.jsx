import React from 'react';
import { Table, Tag, Select, Tooltip } from 'antd';
import { formatCurrency, formatDate } from '@/utils/format';
import { BOOKING_STATUS, BOOKING_STATUS_COLOR, BOOKING_STATUS_LABEL } from '@/constants';

const { Option } = Select;

const BookingTable = ({ bookings, loading, pagination, onStatusChange }) => {
    const columns = [
        {
            title: 'Khách Hàng',
            key: 'customer',
            width: 220,
            render: (_, r) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 dark:text-white">
                        {r.customerInfo?.fullName || 'N/A'}
                    </span>
                    <span className="text-xs text-gray-500">{r.customerInfo?.phone}</span>
                    <span className="text-xs text-blue-500">{r.customerInfo?.email}</span>
                </div>
            )
        },
        {
            title: 'Tour Đặt',
            key: 'tourName',
            width: 250,
            render: (_, r) => (
                <Tooltip title={r.tour?.name}>
                    <span className="dark:text-gray-200 line-clamp-2">
                        {r.tour?.name || <i className="text-red-400">Tour đã bị xóa</i>}
                    </span>
                </Tooltip>
            )
        },
        {
            title: 'SL',
            dataIndex: 'headcount',
            key: 'headcount',
            align: 'center',
            width: 80,
            render: (v) => <span className="dark:text-gray-300 font-medium">{v}</span>
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'right',
            width: 140,
            render: (val) => <span className="font-bold text-green-600">{formatCurrency(val)}</span>
        },
        {
            title: 'Ngày Đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            width: 120,
            render: (d) => <span className="text-gray-500 dark:text-gray-400">{formatDate(d)}</span>
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 160,
            render: (status, r) => (
                <Select
                    value={status}
                    style={{ width: '100%' }}
                    onChange={(val) => onStatusChange(r._id, val)}
                    variant="filled"
                    className="text-left"
                >
                    {Object.values(BOOKING_STATUS).map(s => (
                        <Option key={s} value={s}>
                            <Tag color={BOOKING_STATUS_COLOR[s]} bordered={false}>
                                {BOOKING_STATUS_LABEL[s]}
                            </Tag>
                        </Option>
                    ))}
                </Select>
            )
        }
    ];

    return (
        <Table
            dataSource={bookings}
            columns={columns}
            rowKey="_id"
            loading={loading}
            pagination={pagination}
            rowClassName="dark:hover:bg-[#1f1f1f]"
            scroll={{ x: 1000 }}
        />
    );
};

export default BookingTable;