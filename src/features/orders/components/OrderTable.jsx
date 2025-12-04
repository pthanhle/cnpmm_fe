import React from 'react';
import { Table, Button, Tooltip, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatCurrency } from '@/utils/format';

// [UPDATE] Nhận prop pagination
const OrderTable = ({ orders, loading, onEdit, onDelete, pagination }) => {
    const columns = [
        {
            title: 'Mã Đơn',
            dataIndex: 'orderId',
            key: 'orderId',
            width: 120,
            render: (text) => <span className="font-semibold text-blue-600 dark:text-blue-400">{text}</span>
        },
        { title: 'Sản Phẩm', dataIndex: 'productName', key: 'productName', className: 'dark:text-gray-200' },
        { title: 'Số Lượng', dataIndex: 'quantity', key: 'quantity', align: 'center', width: 100 },
        {
            title: 'Đơn Giá',
            dataIndex: 'price',
            key: 'price',
            align: 'right',
            render: (val) => formatCurrency(val)
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'total',
            key: 'total',
            align: 'right',
            render: (val) => <span className="font-bold text-green-600 dark:text-green-400">{formatCurrency(val)}</span>
        },
        {
            title: 'Hành Động',
            key: 'action',
            width: 120,
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Sửa"><Button type="primary" ghost icon={<EditOutlined />} onClick={() => onEdit(record)} /></Tooltip>
                    <Tooltip title="Xóa"><Button danger icon={<DeleteOutlined />} onClick={() => onDelete(record._id)} /></Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Table
            dataSource={orders}
            columns={columns}
            rowKey="_id"
            loading={loading}
            pagination={pagination}
            rowClassName="hover:bg-gray-50 dark:hover:bg-[#1f1f1f] cursor-pointer transition-colors"
        />
    );
};

export default OrderTable;