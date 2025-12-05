import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Card, Empty } from 'antd';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusPieChart = ({ paidCount, canceledCount }) => {
    const total = paidCount + canceledCount;

    const paidPercent = total > 0 ? Math.round((paidCount / total) * 100) : 0;

    const data = {
        labels: ['Hoàn thành', 'Đã hủy'],
        datasets: [
            {
                data: [paidCount, canceledCount],
                backgroundColor: [
                    '#52c41a',
                    '#ff4d4f',
                ],
                borderWidth: 0,
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#9ca3af',
                    usePointStyle: true,
                    padding: 20
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let value = context.parsed;
                        let percentage = total > 0 ? Math.round((value / total) * 100) + '%' : '0%';
                        return ` ${context.label}: ${value} (${percentage})`;
                    }
                }
            }
        }
    };

    return (
        <Card
            title={<span className="dark:text-white font-semibold">Tỷ Lệ Đơn Hàng</span>}
            className="dark:bg-[#1f1f1f] dark:border-gray-700 shadow-sm h-full border-gray-200"
            bodyStyle={{ height: '350px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
            {total > 0 ? (
                <>
                    <div className="relative h-[240px] w-full">
                        <Doughnut data={data} options={options} />

                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-gray-800 dark:text-white">
                                {paidPercent}%
                            </span>
                            <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                                Hoàn thành
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center gap-8 text-center">
                        <div>
                            <div className="text-xs text-gray-400">Tổng Đơn</div>
                            <div className="font-bold text-gray-700 dark:text-gray-200">{total}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400">Hủy</div>
                            <div className="font-bold text-red-500">{canceledCount}</div>
                        </div>
                    </div>
                </>
            ) : (
                <Empty description={<span className="dark:text-gray-500">Chưa có dữ liệu</span>} />
            )}
        </Card>
    );
};

export default StatusPieChart;