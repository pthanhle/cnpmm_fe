import React from 'react';
import { Table, Button, Space, Tag, Popconfirm, Image, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, TeamOutlined } from '@ant-design/icons';
import { formatCurrency, formatDate } from '@/utils/format';
import { TOUR_STATUS_COLOR, TOUR_STATUS_LABEL } from '@/constants';
import { useNavigate } from 'react-router-dom';

const TourTable = ({ tours, loading, onEdit, onDelete, pagination }) => {

    const navigate = useNavigate();
    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            width: 100,
            render: (src) => (
                <Image
                    src={src}
                    width={80}
                    height={50}
                    className="object-cover rounded border border-gray-200 dark:border-gray-600"
                    fallback="https://via.placeholder.com/80x50?text=No+Img"
                />
            )
        },
        {
            title: 'Tên Tour',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            render: (text) => <span className="font-medium dark:text-white line-clamp-2" title={text}>{text}</span>
        },
        {
            title: 'Địa Điểm',
            dataIndex: 'location',
            key: 'location',
            width: 150,
            className: "dark:text-gray-300"
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: 120,
            align: 'right',
            render: (val) => formatCurrency(val)
        },
        {
            title: 'Ngày đi',
            dataIndex: 'departureDate',
            key: 'departureDate',
            width: 120,
            align: 'center',
            render: (date) => formatDate(date)
        },
        {
            title: 'Số chỗ',
            key: 'capacity',
            width: 120,
            align: 'center',
            render: (_, record) => (
                <span className="dark:text-gray-300">
                    {record.currentParticipants}/{record.maxCapacity}
                </span>
            )
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            align: 'center',
            render: (status) => (
                <Tag color={TOUR_STATUS_COLOR[status]}>
                    {TOUR_STATUS_LABEL[status]}
                </Tag>
            )
        },
        {
            title: 'Hành Động',
            key: 'action',
            width: 100,
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Xem danh sách khách đặt">
                        <Button
                            type="default"
                            size="small"
                            icon={<TeamOutlined className="text-green-600" />}
                            onClick={() => navigate(`/admin/bookings?tour=${record._id}`)}
                        />
                    </Tooltip>

                    <Tooltip title="Sửa">
                        <Button type="primary" ghost size="small" icon={<EditOutlined />} onClick={() => onEdit(record)} />
                    </Tooltip>

                    <Popconfirm title="Xóa?" onConfirm={() => onDelete(record._id)}>
                        <Button danger size="small" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <Table
            dataSource={tours}
            columns={columns}
            rowKey="_id"
            loading={loading}
            pagination={pagination}
            scroll={{ x: 1000 }}
            rowClassName="dark:hover:bg-[#1f1f1f]"
        />
    );
};

export default TourTable;