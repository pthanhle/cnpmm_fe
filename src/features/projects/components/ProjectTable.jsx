import React from 'react';
import { Table, Button, Tooltip, Tag, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PROJECT_STATUS_COLOR, PROJECT_STATUS_LABEL } from '@/constants';

const ProjectTable = ({ projects, loading, onEdit, onDelete, pagination }) => {

    const getStatusTag = (status) => {
        const color = PROJECT_STATUS_COLOR[status] || 'default';
        const label = PROJECT_STATUS_LABEL[status] || status;
        return <Tag color={color}>{label}</Tag>;
    };

    const columns = [
        {
            title: 'Mã Dự Án',
            dataIndex: 'projectId',
            key: 'projectId',
            width: 120,
            render: (text) => <span className="font-semibold text-blue-600 dark:text-blue-400">{text}</span>
        },
        { title: 'Tên Dự Án', dataIndex: 'name', key: 'name', width: 200, className: 'dark:text-gray-200' },
        { title: 'Mô Tả', dataIndex: 'description', key: 'description', ellipsis: true, className: "dark:text-gray-400" },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            align: 'center',
            render: (status) => getStatusTag(status)
        },
        {
            title: 'Thành Viên',
            dataIndex: 'members',
            key: 'members',
            render: (members) => (
                <div className="flex flex-wrap gap-1">
                    {Array.isArray(members) && members.length > 0 ? (
                        members.map((member, index) => <Tag key={index}>{member}</Tag>)
                    ) : <span className="text-xs text-gray-400">Trống</span>}
                </div>
            )
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
            dataSource={projects}
            columns={columns}
            rowKey="_id"
            loading={loading}
            pagination={pagination}
            rowClassName="hover:bg-gray-50 dark:hover:bg-[#1f1f1f] cursor-pointer transition-colors"
        />
    );
};

export default ProjectTable;