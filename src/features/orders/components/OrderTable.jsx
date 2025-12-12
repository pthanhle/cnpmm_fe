import React from 'react';
import { Table, Button, Space, Popconfirm, Typography, Skeleton } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;

const OrderTable = ({ data, isLoading, pagination, onChange, onEdit, onDelete }) => {
    const columns = [
        { title: 'Mã ĐH', dataIndex: 'maDH', key: 'maDH', width: 100 },
        { title: 'Khách Hàng', dataIndex: 'khachHang', key: 'khachHang' },
        {
            title: 'Ngày Đặt',
            dataIndex: 'ngayDat',
            key: 'ngayDat',
            render: (d) => dayjs(d).format('DD/MM/YYYY HH:mm'),
            sorter: (a, b) => new Date(a.ngayDat) - new Date(b.ngayDat),
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'tongTien',
            key: 'tongTien',
            align: 'right',
            render: (val) => (
                <Text strong type="success">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)}
                </Text>
            )
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
                    <Popconfirm title="Xóa đơn hàng?" onConfirm={() => onDelete(record._id)}>
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    const expandedRowRender = (record) => {
        const productColumns = [
            { title: 'Sản Phẩm', dataIndex: 'tenSP', key: 'tenSP' },
            { title: 'Số Lượng', dataIndex: 'soLuong', key: 'soLuong' },
            {
                title: 'Đơn Giá',
                dataIndex: 'gia',
                key: 'gia',
                render: (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)
            },
            {
                title: 'Thành Tiền',
                key: 'total',
                render: (_, row) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.soLuong * row.gia)
            }
        ];
        return <Table columns={productColumns} dataSource={record.sanPham} pagination={false} size="small" />;
    };

    if (isLoading && !data) {
        return <Skeleton active paragraph={{ rows: 10 }} />;
    }

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="_id"
            expandable={{ expandedRowRender }}
            pagination={{
                ...pagination,
                showSizeChanger: true,
                showTotal: (total) => `Tổng ${total} đơn hàng`,
            }}
            loading={isLoading}
            onChange={onChange}
            className="dark:bg-[#1f1f1f]"
        />
    );
};

export default OrderTable;