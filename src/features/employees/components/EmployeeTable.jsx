import React from 'react';
import { Table, Button, Space, Tag, Popconfirm, Skeleton } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const EmployeeTable = ({ data, isLoading, pagination, onChange, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'Mã NV',
            dataIndex: 'maNV',
            key: 'maNV',
            width: 100,
            fixed: 'left',
        },
        {
            title: 'Họ Tên',
            dataIndex: 'hoTen',
            key: 'hoTen',
        },
        {
            title: 'Chức Vụ',
            dataIndex: 'chucVu',
            key: 'chucVu',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'Lương',
            dataIndex: 'luong',
            key: 'luong',
            render: (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val),
            align: 'right',
        },
        {
            title: 'Ngày Vào',
            dataIndex: 'ngayVaoLam',
            key: 'ngayVaoLam',
            render: (date) => dayjs(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 120,
            fixed: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="primary"
                        ghost
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => onEdit(record)}
                    />
                    <Popconfirm
                        title="Xóa nhân viên"
                        description="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => onDelete(record._id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // UX: Hiển thị Skeleton khi data chưa có (lần đầu)
    if (isLoading && !data) {
        return <Skeleton active paragraph={{ rows: 10 }} />;
    }

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="_id"
            pagination={{
                ...pagination,
                showSizeChanger: true,
                showTotal: (total) => `Tổng ${total} nhân viên`,
            }}
            loading={isLoading}
            onChange={onChange}
            scroll={{ x: 800 }}
            className="dark:bg-[#1f1f1f]" // Tailwind support for dark mode container
        />
    );
};

export default EmployeeTable;