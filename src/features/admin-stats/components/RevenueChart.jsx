import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from 'antd';
import { formatCurrency } from '@/utils/format';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const RevenueChart = ({ labels, revenueData, bookingData }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#9ca3af'
                },
                onClick: (e, legendItem, legend) => {
                    const index = legendItem.datasetIndex;
                    const ci = legend.chart;

                    if (ci.isDatasetVisible(index)) {
                        ci.hide(index);
                        legendItem.hidden = true;

                        const scaleId = ci.data.datasets[index].yAxisID;
                        if (ci.options.scales[scaleId]) {
                            ci.options.scales[scaleId].display = false;
                        }
                    } else {
                        ci.show(index);
                        legendItem.hidden = false;

                        const scaleId = ci.data.datasets[index].yAxisID;
                        if (ci.options.scales[scaleId]) {
                            ci.options.scales[scaleId].display = true;
                        }
                    }
                    ci.update();
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.dataset.yAxisID === 'y') {
                            label += formatCurrency(context.parsed.y);
                        } else {
                            label += context.parsed.y + ' đơn';
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: { color: '#9ca3af' },
                grid: { display: false }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: '#9ca3af',
                    callback: (value) => {
                        if (value >= 1000000) return (value / 1000000) + 'M';
                        if (value >= 1000) return (value / 1000) + 'k';
                        return value;
                    }
                },
                title: {
                    display: true,
                    text: 'Doanh Thu (VNĐ)',
                    color: '#1677ff',
                    font: { weight: 'bold' }
                },
                grid: {
                    color: 'rgba(156, 163, 175, 0.1)'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: { drawOnChartArea: false },
                ticks: { color: '#9ca3af' },
                title: {
                    display: true,
                    text: 'Số Đơn Hàng',
                    color: '#52c41a',
                    font: { weight: 'bold' }
                }
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Doanh Thu',
                data: revenueData,
                backgroundColor: 'rgba(22, 119, 255, 0.6)',
                borderColor: 'rgba(22, 119, 255, 1)',
                borderWidth: 1,
                yAxisID: 'y',
                barPercentage: 0.6,
                categoryPercentage: 0.8
            },
            {
                label: 'Số Đơn Hàng',
                data: bookingData,
                backgroundColor: 'rgba(82, 196, 26, 0.6)',
                borderColor: 'rgba(82, 196, 26, 1)',
                borderWidth: 1,
                yAxisID: 'y1',
                barPercentage: 0.6,
                categoryPercentage: 0.8
            },
        ],
    };

    return (
        <Card
            title={<span className="dark:text-white">Biểu Đồ Tăng Trưởng</span>}
            className="dark:bg-[#1f1f1f] dark:border-gray-700 shadow-sm mt-6 border-gray-200"
        >
            <div className="h-[400px]">
                <Bar options={options} data={data} />
            </div>
        </Card>
    );
};

export default RevenueChart;