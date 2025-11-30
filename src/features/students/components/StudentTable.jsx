import React from 'react';
import { Table, Button, Tooltip, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatDate } from '../../../shared/utils/format';

const StudentTable = ({ students, loading, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'Mã SV',
            dataIndex: 'studentId',
            key: 'studentId',
            width: 120,
            render: (text) => <span className="font-semibold text-blue-600">{text}</span>
        },
        { title: 'Họ và Tên', dataIndex: 'fullName', key: 'fullName', width: 250 },
        {
            title: 'Ngày Sinh',
            dataIndex: 'birthDate',
            key: 'birthDate',
            align: 'center',
            render: (text) => formatDate(text)
        },
        {
            title: 'Điểm TB',
            dataIndex: 'gpa',
            key: 'gpa',
            align: 'center',
            render: (gpa) => {
                let color = gpa >= 8 ? 'green' : gpa >= 5 ? 'blue' : 'red';
                return <Tag color={color} className="font-bold">{gpa}</Tag>;
            }
        },
        { title: 'Chuyên Ngành', dataIndex: 'major', key: 'major' },
        {
            title: 'Hành Động',
            key: 'action',
            width: 150,
            align: 'center',
            render: (_, record) => (
                <div className="flex justify-center gap-3">
                    <Tooltip title="Sửa">
                        <Button type="primary" ghost icon={<EditOutlined />} onClick={() => onEdit(record)} />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(record._id)} />
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <Table
            dataSource={students}
            columns={columns}
            rowKey="_id"
            loading={loading}
            pagination={{ pageSize: 8, showTotal: (total) => `Tổng ${total} sinh viên` }}
            rowClassName="hover:bg-gray-50 cursor-pointer"
        />
    );
};

export default StudentTable;