import React from 'react';
import { Table, Typography } from 'antd';
import { formatCurrency } from '../../../utils/format';

const RevenueReport = ({ data }) => {
    if (!data || data.length === 0) return null;

    const columns = [
        { title: 'Ngày Giao Dịch', dataIndex: '_id', key: '_id', align: 'center' },
        {
            title: 'Doanh Thu Trong Ngày',
            dataIndex: 'dailyRevenue',
            key: 'dailyRevenue',
            align: 'right',
            render: (val) => (
                <span className="text-lg font-bold text-blue-600">
                    {formatCurrency(val)}
                </span>
            )
        },
    ];

    return (
        <div className="w-full">
            <Typography.Text type="secondary" className="block mb-4 italic">
                * Dữ liệu được tổng hợp dựa trên khoảng thời gian bạn đã chọn.
            </Typography.Text>
            <Table
                dataSource={data}
                columns={columns}
                rowKey="_id"
                pagination={false}
                bordered
                size="middle"
            />
        </div>
    );
};

export default RevenueReport;