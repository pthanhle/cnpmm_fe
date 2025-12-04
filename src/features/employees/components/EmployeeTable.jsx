import React from 'react';
import { Table, Button, Tooltip, Tag, Space } from 'antd';
import { EditOutlined, DeleteOutlined, CalculatorOutlined } from '@ant-design/icons';
import { formatCurrency, formatDate } from '@/utils/format';

const EmployeeTable = ({ employees, loading, onEdit, onDelete, onGetSalary }) => {
    const columns = [
        {
            title: 'Mã NV', dataIndex: 'employeeId', key: 'employeeId', width: 100,
            render: (text) => <span className="font-semibold text-blue-600">{text}</span>
        },
        { title: 'Họ Tên', dataIndex: 'fullName', key: 'fullName', width: 200, render: (text) => <span className="font-medium">{text}</span> },
        { title: 'Vị Trí', dataIndex: 'position', key: 'position', width: 150 },
        { title: 'Phòng Ban', dataIndex: 'department', key: 'department', render: (text) => <Tag color="geekblue">{text}</Tag> },
        {
            title: 'Mức Lương', dataIndex: 'salary', key: 'salary', align: 'right',
            render: (val) => formatCurrency(val)
        },
        {
            title: 'Phụ Cấp', dataIndex: 'allowances', key: 'allowances', align: 'right',
            render: (val) => <span className="text-gray-500">{formatCurrency(val)}</span>
        },
        {
            title: 'Ngày Vào Làm', dataIndex: 'startDate', key: 'startDate', align: 'center',
            render: (text) => formatDate(text)
        },
        {
            title: 'Hành Động', key: 'action', width: 180, align: 'center',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Xem lương">
                        <Button icon={<CalculatorOutlined />} onClick={() => onGetSalary(record._id)} className="text-green-600 border-green-600 hover:text-white hover:bg-green-600" />
                    </Tooltip>
                    <Tooltip title="Sửa">
                        <Button type="primary" ghost icon={<EditOutlined />} onClick={() => onEdit(record)} />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(record._id)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Table dataSource={employees} columns={columns} rowKey="_id" loading={loading} pagination={{ pageSize: 8 }} rowClassName="hover:bg-gray-50 cursor-pointer" />
    );
};

export default EmployeeTable;