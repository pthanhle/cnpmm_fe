import React from 'react';
import { Card, Typography, Spin, DatePicker, Statistic, Row, Col, Divider } from 'antd';
import { DollarCircleOutlined, ShoppingCartOutlined, BarChartOutlined, AreaChartOutlined } from '@ant-design/icons';
import { useOrders } from './hooks/useOrders';
import { formatCurrency } from '../../utils/format';
import PageHeaderAction from '../../components/molecules/PageHeaderAction';
import { OrderTable, OrderModal, RevenueReport } from './components';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const OrderFeature = () => {
    const {
        orders, pagination, totalValue, revenueReport, loading,
        searchTerm, setSearchTerm,
        startDate, setStartDate, endDate, setEndDate,
        isModalVisible, editingOrder, openModal, closeModal,
        handleRevenueReport, handleDelete, handleFormSubmit
    } = useOrders();

    return (
        <div className="p-6 bg-gray-50 dark:bg-[#141414] min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <Title level={2} className="!mb-0 !text-gray-800 dark:!text-white">Quản Lý Đơn Hàng</Title>
                </div>

                <Row gutter={[24, 24]}>
                    <Col xs={24} md={8} lg={6}>
                        <Card hoverable className="h-full flex flex-col justify-center items-center bg-white border-blue-100 dark:border-gray-700 dark:bg-[#1f1f1f] shadow-sm">
                            <Statistic
                                title={<span className="text-gray-500 dark:text-gray-400 font-semibold">Tổng Doanh Thu</span>}
                                value={totalValue}
                                formatter={formatCurrency}
                                valueStyle={{ color: '#2563eb', fontWeight: 'bold', fontSize: '1.5rem' }}
                                prefix={<DollarCircleOutlined className="mr-2" />}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} md={16} lg={18}>
                        <Card className="h-full shadow-sm border-gray-200 dark:border-gray-700 dark:bg-[#1f1f1f]" bodyStyle={{ padding: '24px' }}>
                            <PageHeaderAction
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                onSearch={() => { }}
                                onAdd={() => openModal(null)}
                                placeholder="Tìm mã đơn hàng..."
                                btnLabel="Thêm Đơn Hàng"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500 font-medium hidden lg:inline dark:text-gray-400">Báo cáo:</span>
                                    <RangePicker
                                        placeholder={['Từ ngày', 'Đến ngày']}
                                        onChange={(_, [start, end]) => { setStartDate(start); setEndDate(end); }}
                                        style={{ width: 250 }}
                                    />
                                    <button
                                        onClick={handleRevenueReport}
                                        className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                    >
                                        Xem
                                    </button>
                                </div>
                            </PageHeaderAction>
                        </Card>
                    </Col>
                </Row>

                <Card className="shadow-sm mt-6 border-gray-200 dark:border-gray-700 dark:bg-[#1f1f1f]">
                    {loading ? <div className="p-10 text-center"><Spin size="large" /></div> :
                        <OrderTable
                            orders={orders}
                            loading={loading}
                            onEdit={openModal}
                            onDelete={handleDelete}
                            pagination={pagination} // [UPDATE]
                        />
                    }
                </Card>

                {revenueReport && revenueReport.length > 0 && (
                    <div className="mt-10">
                        <Divider orientation="left" className="!border-green-500 dark:!border-green-800">
                            <span className="text-green-600 font-bold text-lg"><AreaChartOutlined className="mr-2" /> Kết Quả Báo Cáo</span>
                        </Divider>
                        <Card className="shadow-md border-t-4 border-t-green-500 bg-green-50 dark:bg-[#0f1f0f] dark:border-gray-700">
                            <RevenueReport data={revenueReport} />
                        </Card>
                    </div>
                )}

                <OrderModal visible={isModalVisible} onCancel={closeModal} onSubmit={handleFormSubmit} editingOrder={editingOrder} />
            </div>
        </div>
    );
};

export default OrderFeature;