import React from 'react';
import { Table, Typography } from 'antd';
import { formatCurrency, formatDate } from '@/utils/format';

const RevenueReport = ({ data }) => {

    if (!data || data.length === 0) return null;

    const columns = [
        {
            title: 'Ngày Giao Dịch',
            dataIndex: '_id', // _id là ngày (YYYY-MM-DD) do group by của Mongo
            key: '_id',
            align: 'center',
            render: (text) => <span className="font-medium dark:text-gray-200">{text}</span>
        },
        {
            title: 'Doanh Thu Trong Ngày',
            dataIndex: 'dailyRevenue',
            key: 'dailyRevenue',
            align: 'right',
            render: (val) => (
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(val)}
                </span>
            )
        },
    ];

    return (
        <div className="w-full">
            <Typography.Text type="secondary" className="block mb-4 italic dark:text-gray-400">
                * Báo cáo chi tiết doanh thu được tổng hợp theo ngày.
            </Typography.Text>
            <Table
                dataSource={data} // Data là mảng [{_id: '2023-10-01', dailyRevenue: 500000}, ...]
                columns={columns}
                rowKey="_id"
                pagination={false}
                bordered
                size="middle"
                className="dark:bg-[#1f1f1f]" // Dark mode fix cho table background
            />
        </div>
    );
};

export default RevenueReport;