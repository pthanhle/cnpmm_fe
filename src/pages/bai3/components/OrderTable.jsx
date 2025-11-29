import React from 'react';
import { Table, Button, Tooltip, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const OrderTable = ({ orders, loading, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'Mã Đơn',
            dataIndex: 'orderId',
            key: 'orderId',
            width: 120,
            render: (text) => <span className="font-semibold text-blue-600">{text}</span>
        },
        {
            title: 'Sản Phẩm',
            dataIndex: 'productName',
            key: 'productName',
            width: 250,
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            width: 120,
        },
        {
            title: 'Đơn Giá',
            dataIndex: 'price',
            key: 'price',
            align: 'right',
            render: (val) => val ? val.toLocaleString('vi-VN') : 0
        },
        {
            title: 'Tổng Tiền (VNĐ)',
            dataIndex: 'total',
            key: 'total',
            align: 'right',
            render: (val) => (
                <span className="font-bold text-green-600">
                    {val ? val.toLocaleString('vi-VN') : 0}
                </span>
            )
        },
        {
            title: 'Hành Động',
            key: 'action',
            width: 150,
            align: 'center',
            render: (_, record) => (
                <div className="flex justify-center gap-3">
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            type="primary"
                            ghost
                            icon={<EditOutlined />}
                            onClick={() => onEdit(record)}
                        />
                    </Tooltip>

                    <Tooltip title="Xóa đơn hàng">
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => onDelete(record._id)}
                        />
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <Table
            dataSource={orders}
            columns={columns}
            rowKey="_id"
            loading={loading}
            pagination={{
                pageSize: 8,
                showTotal: (total) => `Tổng ${total} đơn hàng`,
                className: "p-4"
            }}
            rowClassName="hover:bg-gray-50 cursor-pointer"
        />
    );
};

export default OrderTable;