import React from 'react';
import { Card, Typography, Spin, Statistic, Row, Col, Divider, DatePicker, Button } from 'antd';
import { DollarCircleOutlined, AreaChartOutlined, BarChartOutlined } from '@ant-design/icons';
import { useOrders } from './hooks/useOrders';
import { formatCurrency } from '../../shared/utils/format';
import PageHeaderAction from '../../components/molecules/PageHeaderAction';
import { OrderTable, RevenueReport, OrderModal } from './components';

const { Title } = Typography;

const OrderFeature = () => {
    const {
        orders, totalValue, revenueReport, loading,
        setStartDate, setEndDate,
        isModalVisible, editingOrder, openModal, closeModal,
        handleRevenueReport, handleDelete, handleFormSubmit
    } = useOrders();

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <Title level={2} style={{ margin: 0, color: '#1f2937' }}>Quản Lý Đơn Hàng</Title>
                </div>

                <Row gutter={[24, 24]}>
                    <Col xs={24} md={8} lg={6}>
                        <Card hoverable className="h-full flex flex-col justify-center items-center bg-white border-blue-100 shadow-sm">
                            <Statistic
                                title={<span className="text-gray-500 font-semibold">Tổng Doanh Thu</span>}
                                value={totalValue}
                                formatter={val => formatCurrency(val)} // Dùng formatter của Statistic hoặc utils
                                valueStyle={{ color: '#2563eb', fontWeight: 'bold', fontSize: '1.5rem' }}
                                prefix={<DollarCircleOutlined className="mr-2" />}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} md={16} lg={18}>
                        <Card className="h-full shadow-sm" bodyStyle={{ padding: '24px' }}>
                            <PageHeaderAction
                                searchTerm=""
                                setSearchTerm={() => { }}
                                onSearch={() => { }}
                                placeholder="Tính năng tìm kiếm (Coming soon)"
                                onAdd={() => openModal(null)}
                                btnLabel="Thêm Đơn Hàng"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500 font-medium hidden lg:inline">Báo cáo:</span>
                                    <DatePicker
                                        placeholder="Từ ngày"
                                        onChange={(_, dateString) => setStartDate(dateString)}
                                        format="YYYY-MM-DD" style={{ width: 140 }}
                                    />
                                    <span className="text-gray-400">-</span>
                                    <DatePicker
                                        placeholder="Đến ngày"
                                        onChange={(_, dateString) => setEndDate(dateString)}
                                        format="YYYY-MM-DD" style={{ width: 140 }}
                                    />
                                    <Button icon={<BarChartOutlined />} onClick={handleRevenueReport}>Xem</Button>
                                </div>
                            </PageHeaderAction>
                        </Card>
                    </Col>
                </Row>

                <Card title="Danh Sách Đơn Hàng" className="shadow-sm mt-6">
                    {loading ? <div className="p-10 text-center"><Spin size="large" /></div> :
                        <OrderTable orders={orders} loading={loading} onEdit={openModal} onDelete={handleDelete} />
                    }
                </Card>

                {revenueReport.length > 0 && (
                    <div className="mt-10">
                        <Divider orientation="left" style={{ borderColor: '#10b981' }}>
                            <span className="text-green-600 font-bold text-lg"><AreaChartOutlined className="mr-2" /> Kết Quả Báo Cáo</span>
                        </Divider>
                        <Card className="shadow-md border-t-4 border-t-green-500 bg-green-50">
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